import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
  ) {}

  // Mostrar todos os voos
  async findAllFlights(): Promise<Flight[]> {
    const flights = await this.flightRepository.find();

    if(flights.length === 0) throw new HttpException('Voos not found!', HttpStatus.NOT_FOUND)

    return flights;
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
}
