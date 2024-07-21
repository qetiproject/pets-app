import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResponseDto } from '@common/dto';
import { PetBreedEntity } from './entities/pet_breed.entity';
import { AddPetBreedRequeseDto, PetBreedResponseDto } from './dto';

@Injectable()
export class PetBreedService {
  constructor(
    @InjectRepository(PetBreedEntity)
    private readonly petBreedRepository: Repository<PetBreedEntity>,
  ) {}

  addPetBreedService(
    addPetBreedDto: AddPetBreedRequeseDto,
  ): Promise<PetBreedResponseDto> {
    try {
      const petBreed = this.petBreedRepository.create({
        name: addPetBreedDto.name,
      });
      return this.petBreedRepository.save<PetBreedEntity>(petBreed);
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to add pet Breed' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getPetBreedAllService(): Promise<PetBreedResponseDto[]> {
    return this.petBreedRepository.find();
  }

  async getPetBreedDetailsService(id: string): Promise<PetBreedResponseDto> {
    try {
      return await this.petBreedRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { error: `Pet Breed with id: ${id} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deletePetBreedService(id: string): Promise<DeleteResponseDto> {
    try {
      return await this.petBreedRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        { error: `Pet Breed with id: ${id} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
