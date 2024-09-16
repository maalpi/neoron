import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Flight } from './aeroporto.entity';
import { Location } from 'src/local/local.entity';
import { CreateFlightDto } from './aeroporto.domain';
import { FlightRules } from './aeroportoRules.utils';

@Injectable()
export class AeroportoService {
  private readonly flightRules: FlightRules;

  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {
    this.flightRules = new FlightRules(this.flightRepository);
  }

  // Mostrar todos os voos
  async findAllFlights(): Promise<Flight[]> {
    const flights = await this.flightRepository.find();

    if(flights.length === 0) throw new HttpException('Voos not found!', HttpStatus.NOT_FOUND)

    return flights;
  }

  // Buscar um voo a partir do codigo
  async findFlightByFlightCode(flightCode: string): Promise<Flight> {
    const flight = await this.flightRepository.findOne({ where: { flightCode } });
    if (!flight) throw new HttpException('Voo não encontrado!', HttpStatus.NOT_FOUND);
    return flight;
}

  // Buscar ou criar uma nova localização
  async findOrCreateLocation(locationDto: Partial<Location>): Promise<Location> {
    const location = await this.locationRepository.findOne({
      where: {
        postalCode: locationDto.postalCode,
        country: locationDto.country,
        city: locationDto.city,
        state: locationDto.state,
      },
    });

    if (location) return location;

    const newLocation = this.locationRepository.create(locationDto);
    return this.locationRepository.save(newLocation);
  }

  // Criar um novo voo
  async createFlight(flightDto: CreateFlightDto): Promise<Flight> {
    // Verificações das Regras Criticas
    await this.flightRules.checkExistingFlightCode(flightDto.flightCode);
    await this.flightRules.checkSameDayFlight(flightDto.destination, flightDto.date);
    await this.flightRules.checkTimeProximity(flightDto.date);

    const origin = await this.findOrCreateLocation(flightDto.origin);
    const destination = await this.findOrCreateLocation(flightDto.destination);

    const flight = this.flightRepository.create({
      flightCode: flightDto.flightCode,
      date: flightDto.date, // Corrigir para garantir que a data seja a correta
      origin,
      destination,
    });

    return this.flightRepository.save(flight);
  }

  // Deletar um voo a partir do codigo de voo
  async deleteFlightByCode(flightCode: string): Promise<void> {
    const user = await this.flightRepository.findOne({ where: { flightCode } });

    if (!user) {
      throw new HttpException('Voo não encontrado', HttpStatus.NOT_FOUND);
    }

    await this.flightRepository.delete({ flightCode });
}

  // Atualizar um voo a partir do seu codigo
  async updateFlight(flightCode: string, updateData: Partial<CreateFlightDto>): Promise<Flight> {
    // Backup
    const flight = await this.flightRepository.findOne({
      where: { flightCode },
      relations: ['origin', 'destination'], 
    });

    // Copia
    const backupFlight = { ...flight };

    await this.deleteFlightByCode(flightCode);
    
    try {
      if (updateData.flightCode && updateData.flightCode !== flight.flightCode) {
        await this.flightRules.checkExistingFlightCode(updateData.flightCode);
      }

      if (updateData.date && updateData.date !== flight.date) {
        await this.flightRules.checkTimeProximity(updateData.date);
      }
    
      // Agora verifica se o destino foi alterado
      if (updateData.destination && updateData.destination.id !== flight.destination.id) {
        await this.flightRules.checkSameDayFlight(updateData.destination, updateData.date || flight.date);
      }
    
      if (!flight) {
        throw new NotFoundException('Flight not found');
      }
    

      if (updateData.origin) {
        flight.origin = await this.locationRepository.save({
          ...flight.origin, 
          ...updateData.origin, 
        });
      }
    
      // Atualiza o destino, se fornecido
      if (updateData.destination) {
        flight.destination = await this.locationRepository.save({
          ...flight.destination, // Mantém os dados antigos
          ...updateData.destination, // Sobrescreve com os novos
        });
      }
    
      // Atualiza outros campos do voo, se fornecidos
      flight.flightCode = updateData.flightCode;
      flight.date = updateData.date;
      
    
      // Salva o voo atualizado
      await this.flightRepository.save(flight);
    
      // Retorna o voo atualizado com as relações
      return await this.flightRepository.findOne({
        where: { flightCode },
        relations: ['origin', 'destination'],
      });
  } catch (error) {
      // 5. Restaurar o Voo a partir do Backup em caso de erro
      await this.flightRepository.save(backupFlight);

      // Lançar o erro novamente após restaurar o voo
      throw error;
    }
  }

}
