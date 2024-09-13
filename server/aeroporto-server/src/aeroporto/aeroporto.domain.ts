import { IsDate, IsISO8601, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { LocationDto } from 'src/local/local.domain';

export class CreateFlightDto {
    @IsString()
    @IsNotEmpty()
    flightCode: string; // Código do voo

    @IsISO8601()
    @IsNotEmpty()
    date: Date; // Data do voo

    @IsNotEmpty()
    @IsObject()
    origin: LocationDto; // Local de origem
    
    @IsObject()
    @IsNotEmpty()
    destination: LocationDto; // Local de destino
}
