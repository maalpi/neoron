import { Controller, Get, Post, Body } from '@nestjs/common';
import { LocalService } from './local.service';
import { LocationDto } from './local.domain';
import { Location } from './local.entity';

@Controller('locations')
export class LocalController {
  constructor(private readonly locationService: LocalService) {}

  @Post('findOrCreate')
  async findOrCreate(@Body() locationDto: LocationDto): Promise<Location> {
    return this.locationService.findOrCreateLocation(locationDto);
  }
}
