import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UserDomain {
    @IsOptional()
    @IsString({ message: 'ID precisa ser uma string' })
    readonly id?: string;

    @IsString({ message: 'Nome precisa ser uma string' })
    @IsNotEmpty({ message: 'Nome não pode ser vazio' })
    @MinLength(3, { message: 'Nome precisa ter no minimo 3 caracteres' })
    @MaxLength(100, { message: 'Nome não pode exceder 100 caracteres' })
    readonly name: string;

    @IsString({ message: 'Email precisa ser uma string' })
    @IsNotEmpty({ message: 'Email não pode ser vazio' })
    @IsEmail({},{ message: 'Formato errado de email'})
    readonly email: string;

    @IsString({ message: 'Senha precisa ser uma string' })
    @IsNotEmpty({ message: 'Senha não pode ser vazio' })
    @MinLength(3, { message: 'Senha precisa ter no minimo 3 caracteres' })
    @MaxLength(100, { message: 'Senha não pode exceder 100 caracteres' })
    readonly password: string;

    @IsOptional()
    @IsDate({ message: 'Data em formato invalido' })
    readonly created_at?: Date;
}