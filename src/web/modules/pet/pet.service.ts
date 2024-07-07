import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetEntity } from './entities/pet.entity';
import { Repository } from 'typeorm';

import { DeleteResponseDto } from '@common/dto';
import { AddPetRequestDto, UpdatePetWithOwnerOrAddRequestDto } from './dto';
import { PetResponseDto } from './dto/index';

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
    return this.petRepository.find({ relations: ['owner'] });
  }

  getPetDetails(id: string): Promise<PetResponseDto> {
    try {
      return this.petRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { error: `Pet with id: ${id} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updatePetWithOwnerOrAddService(
    id: string,
    updatePetWithOwnerOrAddRequestDto: UpdatePetWithOwnerOrAddRequestDto,
  ): Promise<any> {
    try {
      const pet = this.getPetDetails(id);
      console.log(pet, 'pet');
      console.log(updatePetWithOwnerOrAddRequestDto);
    } catch (error) {}
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
