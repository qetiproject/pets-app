import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetEntity } from './pet.entity';
import { Repository } from 'typeorm';
import { OwnerEntity } from '../owner/owner.entity';
import { PetDto, PetOwnerDto } from './dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(PetEntity)
    private readonly petRepository: Repository<PetEntity>,
    @InjectRepository(OwnerEntity)
    private readonly ownerRepository: Repository<OwnerEntity>,
  ) {}

  addPet(body: PetDto): Promise<PetDto> {
    return this.petRepository.save<PetDto>(body);
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

  async petWithOwner(petOwnerDto: PetOwnerDto): Promise<PetDto> {
    const ownerFromDb = await this.ownerRepository.findOneByOrFail({
      username: petOwnerDto.username,
    });

    const petFromDb = await this.petRepository.findOneByOrFail({
      id: petOwnerDto.petId,
    });

    return this.petRepository.save({ ...petFromDb, owner: ownerFromDb });
  }
}
