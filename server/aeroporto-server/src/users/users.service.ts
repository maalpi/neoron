import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { Users } from './user.entity';
import { UsersDto } from './users.dto';
import { UserDomain } from './user.domain';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ) { }

    async findAllUsers(): Promise<Users[]> {
        const users = await this.usersRepository.find();

        if(users.length === 0) throw new HttpException('Users not found!', HttpStatus.NOT_FOUND)

        return users;
    }

    // Busca um usuário pelo e-mail
    async findUserByEmail(email: string): Promise<Users> {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
        return user;
    }
    
    async createUser(user: UserDomain): Promise<UserDomain> {
        const createdUser = await this.usersRepository.save(user);
        return createdUser;
    }

    async deleteUserByEmail(email: string): Promise<void> {
        const user = await this.usersRepository.findOne({ where: { email } });
    
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    
        await this.usersRepository.delete({ email });
    }
}
