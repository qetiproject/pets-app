import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PetCategoryEntity } from './entities/pet_category.entity';
import { PetCategoryController } from './pet_category.controller';
import { PetCategoryService } from './pet_category.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetCategoryEntity])],
  controllers: [PetCategoryController],
  providers: [PetCategoryService],
})
export class PetCategoryModule {}
