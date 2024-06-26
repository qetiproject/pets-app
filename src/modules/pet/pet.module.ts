import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './entities/pet.entity';
import { OwnerEntity } from '../owner/entities';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity, OwnerEntity]), AuthModule],
  providers: [PetService],
  controllers: [PetController],
})
export class PetModule {}
