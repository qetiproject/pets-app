import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PetBreedEntity } from './entities/pet_breed.entity';
import { PetBreedController } from './pet_breed.controller';
import { PetBreedService } from './pet_breed.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetBreedEntity])],
  controllers: [PetBreedController],
  providers: [PetBreedService],
})
export class PetBreedModule {}
