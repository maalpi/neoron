import { Controller, Get, Res, Param, Post, Body, Query, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UsersDto } from './users.dto';
import { UserDomain } from './user.domain';

// retornos, status e rotas
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    // Buscar usuário por e-mail (usando Query Params)
    @Get('search/email')
    async findUserByEmail(@Res() response: Response, @Query('email') email: string) {
        const user = await this.usersService.findUserByEmail(email);
        return response.status(200).json(user);
    }

    @Get()
    async findAllUsers(@Res() response: Response){
        const users = await this.usersService.findAllUsers();
        return response.status(200).json(users);
    }

    @Post()
    async createUser(@Res() response: Response, @Body() user: UserDomain){
        const userCreated = await this.usersService.createUser(user);
        return response.status(201).json(userCreated);
    }

    // Endpoint para deletar o usuário por email
    @Delete('delete')
        async deleteUser(@Res() response: Response, @Query('email') email: string) {
            try {
                await this.usersService.deleteUserByEmail(email);
                return response.status(200).json({ message: 'User deleted successfully' });
            } catch (error) {
                return response.status(error.status).json({ message: error.message });
            }
    }
}
