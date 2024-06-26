import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './pet.entity';
import { OwnerEntity } from '../owner/owner.entity';
// import { PetService } from './pet.service';
// import { PetController } from './pet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity, OwnerEntity])],
  // providers: [PetService],
  // controllers: [PetController],
})
export class PetModule {}
