import { Controller, Post, Body, Res, Get, Delete, Query, Patch } from '@nestjs/common';
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

  // Metodo GET para encontrar todos os voos
  @Get()
    async findAllFlight(@Res() response: Response){
        const flights = await this.aeroportoService.findAllFlights();
        return response.status(200).json(flights);
  }

  // Metodo GET para encontrar apenas um voo
  @Get('search/flightcode')
  async findFlightByFlightCode(@Res() response: Response, @Query('flightCode') flightCode: string) {
    const flight = await this.aeroportoService.findFlightByFlightCode(flightCode);
    return response.status(200).json(flight);
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

  @Patch('update')
  async updateFlight(  @Res() response: Response, @Query('flightCode') flightCode: string, @Body() updateData: Partial<CreateFlightDto>) {
    try {
        const updatedFlight = await this.aeroportoService.updateFlightByCode(flightCode, updateData);
        return response.status(200).json(updatedFlight);
    } catch (error) {
        return response.status(error.status).json({ message: error.message });
    }
}
}
