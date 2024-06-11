import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PetDto } from './dto/pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PetEntity } from './pet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(PetEntity)
    private readonly petRepository: Repository<PetEntity>,
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
  async deletePet(id: string): Promise<any> {
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
