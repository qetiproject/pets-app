import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetCategoryEntity } from './entities/pet_category.entity';
import { AddPetCategoryRequeseDto, PetCategoryResponseDto } from './dto';
import { Repository } from 'typeorm';
import { DeleteResponseDto } from '@common/dto';

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

  getPetCategoryAllService(): Promise<PetCategoryResponseDto[]> {
    return this.petCategoryRepository.find();
  }

  async getPetCategoryDetailsService(
    id: string,
  ): Promise<PetCategoryResponseDto> {
    try {
      return await this.petCategoryRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { error: `Pet category with id: ${id} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deletePetCategoryService(id: string): Promise<DeleteResponseDto> {
    try {
      return await this.petCategoryRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        { error: `Pet category with id: ${id} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
