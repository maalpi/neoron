import { HttpException, HttpStatus } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { Flight } from './aeroporto.entity';
import { Location } from 'src/local/local.entity';

export class FlightRules {
  constructor(private readonly flightRepository: Repository<Flight>) {}


    // Verificar se existe um voo com o mesmo código
    async checkExistingFlightCode(flightCode: string): Promise<void> {
        const existingFlight = await this.flightRepository.findOne({ where: { flightCode } });

        if (existingFlight) {
            throw new HttpException('Já existe um voo com o mesmo código.', HttpStatus.CONFLICT);
        }
    }

    // Verificar se já existe um voo com menos de 30 minutos de diferença
    async checkTimeProximity(flightDate: Date): Promise<void> {
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

  // Verificar se já existe um voo para o mesmo destino no mesmo dia
    async checkSameDayFlight(destination: Location, flightDate: Date): Promise<void> {
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
}
