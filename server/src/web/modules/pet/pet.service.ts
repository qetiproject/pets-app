import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DeleteResponseDto } from '@common/dto';
import { AddPetRequestDto, PetResponseDto, UpdatePetRequestDto } from './dto';
import { PetEntity } from './entities';
import { PetEnum, PetTypeEnum } from './enums';
import { PetResponseMapper } from './mappers';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(PetEntity)
    private readonly petRepository: Repository<PetEntity>,
    private readonly responseMappers: PetResponseMapper,
  ) {}

  addPet(addPetDto: AddPetRequestDto): Promise<PetResponseDto> {
    try {
      return this.petRepository.save<PetEntity>(addPetDto);
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to add pet' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPets(
    page: number,
    skip: number,
    filters?: {
      name?: string;
      age?: number;
      type?: PetTypeEnum;
      animal?: PetEnum;
    },
  ): Promise<PetResponseDto[]> {
    const queryBuilder = this.petRepository
      .createQueryBuilder('pet')
      .leftJoinAndSelect('pet.owner', 'owner')
      .leftJoinAndSelect('pet.petShop', 'petShop')
      .leftJoinAndSelect('pet.breed', 'breed')
      .orderBy('pet.name', 'ASC');

    if (filters) {
      if (filters.name) {
        queryBuilder.andWhere('pet.name LIKE :name', {
          name: `%${filters.name}%`,
        });
      }
      if (filters.age) {
        queryBuilder.andWhere('pet.age = :age', { age: filters.age });
      }
      if (filters.type) {
        queryBuilder.andWhere('pet.type = :type', { type: filters.type });
      }
      if (filters.animal) {
        queryBuilder.andWhere('pet.animal = :animal', {
          animal: filters.animal,
        });
      }
    }

    queryBuilder.skip(skip).take(page);
    const pets = await queryBuilder.getMany();
    return pets.map((pet) => this.responseMappers.mapPetToResponseDto(pet));
  }

  getPetDetails(id: string): Promise<PetResponseDto> {
    try {
      return this.petRepository.findOneOrFail({
        where: { id },
        relations: ['owner', 'petShop', 'breed'],
      });
    } catch (error) {
      throw new HttpException(
        { error: `Pet with id: ${id} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updatePetService(
    id: string,
    updatePetDto: UpdatePetRequestDto,
  ): Promise<PetResponseDto> {
    try {
      const pet = await this.getPetDetails(id);
      Object.assign(pet, updatePetDto);
      const updatedPet = await this.petRepository.save<PetEntity>(pet);
      return updatedPet;
    } catch (error) {
      throw new HttpException(
        {
          error: `Pet with id: ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deletePet(id: string): Promise<DeleteResponseDto> {
    try {
      return await this.petRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        { error: `Pet with id: ${id} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
