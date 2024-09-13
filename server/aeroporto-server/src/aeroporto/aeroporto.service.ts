import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  // Lógica para encontrar ou criar uma localização
  async findOrCreateLocation(locationDto: Partial<Location>): Promise<Location> {
    const location = await this.locationRepository.findOne({
      where: {
        postalCode: locationDto.postalCode,
        country: locationDto.country,
        city: locationDto.city,
        state: locationDto.state,
      },
    });

    if (location) {
      return location;
    }

    const newLocation = this.locationRepository.create(locationDto);
    return this.locationRepository.save(newLocation);
  }

  // Lógica para criar um novo voo
  async createFlight(flightDto: CreateFlightDto): Promise<Flight> {
    // Verifica se já existe um voo com o mesmo flightCode ou date
    const existingFlight = await this.flightRepository.findOne({
      where: [{ flightCode: flightDto.flightCode }, { date: flightDto.date }],
    });

    if (existingFlight) {
      throw new HttpException(
        'Já existe um voo com o mesmo código ou data.',
        HttpStatus.CONFLICT,
      );
    }
    
    const origin = await this.findOrCreateLocation(flightDto.origin);
    const destination = await this.findOrCreateLocation(flightDto.destination);

    const flight = this.flightRepository.create({
      flightCode: flightDto.flightCode,
      date: flightDto.date, // Certifique-se de que `date` é um `Date` aqui
      origin,
      destination,
    });

    return this.flightRepository.save(flight);
  }
}
