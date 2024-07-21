import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetEntity } from './entities/pet.entity';
import { Repository } from 'typeorm';

import { DeleteResponseDto } from '@common/dto';
import { AddPetRequestDto, PetResponseDto, UpdatePetRequestDto } from './dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(PetEntity)
    private readonly petRepository: Repository<PetEntity>,
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

  getPets(): Promise<PetResponseDto[]> {
    return this.petRepository.find({
      relations: ['owner', 'petShop', 'breed'],
    });
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
