import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Flight } from './aeroporto.entity';
import { Location } from 'src/local/local.entity';
import { CreateFlightDto } from './aeroporto.domain';

@Injectable()
export class AeroportoService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

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

  // Verificar se existe um voo com o mesmo código
  private async checkExistingFlightCode(flightCode: string): Promise<void> {
    const existingFlight = await this.flightRepository.findOne({ where: { flightCode } });

    if (existingFlight) {
      throw new HttpException('Já existe um voo com o mesmo código.', HttpStatus.CONFLICT);
    }
  }

  // Verificar se já existe um voo para o mesmo destino no mesmo dia
  private async checkSameDayFlight(destination: Location, flightDate: Date): Promise<void> {
    const flightDateOBJ = new Date(flightDate);

    const startOfDay = new Date(flightDateOBJ.setHours(0, 0, 0));
    const endOfDay = new Date(flightDateOBJ.setHours(23, 59, 59));

    const sameDayFlight = await this.flightRepository.findOne({
      where: { destination, date: Between(startOfDay, endOfDay) },
    });

    if (sameDayFlight) {
      throw new HttpException('Já existe um voo para este destino no mesmo dia.', HttpStatus.CONFLICT);
    }
  }

  // Verificar se já existe um voo com menos de 30 minutos de diferença
  private async checkTimeProximity(flightDate: Date): Promise<void> {
    const flightDateOBJ = new Date(flightDate);

    // Criar o intervalo de 30 minutos antes e depois da data do voo
    const timeRangeStart = new Date(flightDateOBJ.getTime() - 30 * 60 * 1000); // 30 minutos antes
    const timeRangeEnd = new Date(flightDateOBJ.getTime() + 30 * 60 * 1000);   // 30 minutos depois

    // Buscar voos no intervalo de 30 minutos
    const flightNearby = await this.flightRepository.findOne({
      where: {
        date: Between(timeRangeStart, timeRangeEnd),
      },
    });

    if (flightNearby) {
      throw new HttpException('Já existe um voo com menos de 30 minutos de diferença.', HttpStatus.CONFLICT);
    }
  }

  // Criar um novo voo
  async createFlight(flightDto: CreateFlightDto): Promise<Flight> {
    // Verificações das Regras Criticas
    await this.checkExistingFlightCode(flightDto.flightCode);
    await this.checkSameDayFlight(flightDto.destination, flightDto.date);
    await this.checkTimeProximity(flightDto.date);

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
}
