import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AeroportoModule } from './aeroporto/aeroporto.module';
import { LocalModule } from './local/local.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      logging: false,
      migrations: [__dirname + '/database/migrations/*{.js,.ts}'],
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    }),
    UsersModule,
    AeroportoModule,
    LocalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
