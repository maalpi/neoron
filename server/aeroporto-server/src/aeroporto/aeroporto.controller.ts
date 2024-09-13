import { Controller, Post, Body, Res, Get, Delete, Query } from '@nestjs/common';
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

  @Get()
    async findAllFlight(@Res() response: Response){
        const users = await this.aeroportoService.findAllFlights();
        return response.status(200).json(users);
  }

  @Delete('delete')
        async deleteUser(@Res() response: Response, @Query('flightCode') flightCode: string) {
            try {
                await this.aeroportoService.deleteFlightByCode(flightCode);
                return response.status(200).json({ message: 'Flight deleted successfully' });
            } catch (error) {
                return response.status(error.status).json({ message: error.message });
            }
  }
}
