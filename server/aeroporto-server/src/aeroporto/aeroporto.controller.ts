import { Controller, Post, Body, Res } from '@nestjs/common';
import { AeroportoService } from './aeroporto.service';
import { CreateFlightDto } from './aeroporto.domain';
import { Response } from 'express';

@Controller('aeroporto')
export class AeroportoController {
    constructor(
        private readonly aeroportoService: AeroportoService
    ) {}

  @Post()
  async createFlight(@Res() response: Response, @Body() createFlightDto: CreateFlightDto) {
    const flightDate = new Date(createFlightDto.date);
     // Crie um novo DTO para passar para o serviço com a data convertida
     const flightData = {
        ...createFlightDto,
        date: flightDate
      };
    const flightCreated = await this.aeroportoService.createFlight(createFlightDto);
    return response.status(201).json(flightCreated);
  }
}
