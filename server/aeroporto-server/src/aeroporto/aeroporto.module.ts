import { Module } from '@nestjs/common';
import { AeroportoController } from './aeroporto.controller';
import { AeroportoService } from './aeroporto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './aeroporto.entity';
import { Location } from 'src/local/local.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flight, Location])],
  controllers: [AeroportoController],
  providers: [AeroportoService]
})
export class AeroportoModule {}
