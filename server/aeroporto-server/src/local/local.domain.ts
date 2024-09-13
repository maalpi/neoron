import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class LocationDto {
    @IsString({ message: 'ID precisa ser uma string' })
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    postalCode: string; // CEP

    @IsString()
    @IsNotEmpty()
    country: string; // País

    @IsString()
    @IsNotEmpty()
    city: string; // Cidade

    @IsString()
    @IsNotEmpty()
    state: string; // Estado
}
