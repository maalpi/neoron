import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './local.entity';
import { LocationDto } from './local.domain';

@Injectable()
export class LocalService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  // Encontra ou cria uma localização
  async findOrCreateLocation(locationDto: LocationDto): Promise<Location> {
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
}
