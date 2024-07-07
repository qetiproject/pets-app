import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetEntity } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { OwnerEntity } from '../owner/entities/owner.entity';
import { AddPetRequestDto, PetOwnerDto, PetResponseDto } from './dto';
import { OwnerResponseDto } from '@modules/owner/dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(PetEntity)
    private readonly petRepository: Repository<PetEntity>,
    @InjectRepository(OwnerEntity)
    private readonly ownerRepository: Repository<OwnerEntity>,
  ) {}

  private getOwnerDetails(username: string): Promise<OwnerResponseDto> {
    try {
      return this.ownerRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      throw new HttpException(
        { error: `Owner with username: ${username} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  addPet(addPetDto: AddPetRequestDto): Promise<PetResponseDto> {
    return this.petRepository.save<any>({ ...addPetDto });
  }

  getPets(): Promise<PetEntity[]> {
    return this.petRepository.find({ relations: ['owner'] });
  }

  getPetDetails(id: string): Promise<PetEntity> {
    try {
      return this.petRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { error: `Pet with id: ${id} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async deletePet(id: string): Promise<unknown> {
    try {
      return await this.petRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        { error: `Pet with id: ${id} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async petWithOwner(petOwnerDto: PetOwnerDto): Promise<any> {
    const ownerFromDb = await this.ownerRepository.findOneByOrFail({
      username: petOwnerDto.username,
    });

    const petFromDb = await this.petRepository.findOneByOrFail({
      id: petOwnerDto.petId,
    });

    return this.petRepository.save({ ...petFromDb, owner: ownerFromDb });
  }
}
