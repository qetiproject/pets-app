import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity]), AuthModule],
  providers: [PetService],
  controllers: [PetController],
})
export class PetModule {}
