import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OwnerEntity } from '@modules/owner/entities/owner.entity';
import { PetEntity } from './entities';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { PetResponseMapper } from './mappers';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity, OwnerEntity])],
  providers: [PetService, PetResponseMapper],
  controllers: [PetController],
})
export class PetModule {}
