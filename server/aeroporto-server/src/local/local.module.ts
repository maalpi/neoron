import { Module } from '@nestjs/common';
import { LocalController } from './local.controller';
import { LocalService } from './local.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './local.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [LocalController],
  providers: [LocalService]
})
export class LocalModule {}
