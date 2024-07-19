import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetCategoryEntity } from './entities/pet_category.entity';
import { AddPetCategoryRequeseDto, PetCategoryResponseDto } from './dto';
import { Repository } from 'typeorm';

@Injectable()
export class PetCategoryService {
  constructor(
    @InjectRepository(PetCategoryEntity)
    private readonly petCategoryRepository: Repository<PetCategoryEntity>,
  ) {}

  addPetCategoryService(
    addPetCategoryDto: AddPetCategoryRequeseDto,
  ): Promise<PetCategoryResponseDto> {
    try {
      const petCategory = this.petCategoryRepository.create({
        name: addPetCategoryDto.name,
      });
      return this.petCategoryRepository.save<PetCategoryEntity>(petCategory);
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to add pet category' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
