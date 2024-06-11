import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PetDto } from './dto/pet.dto';
import { PetEnum } from './enums/pet';
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

  getPets(): PetDto[] {
    console.log('Get all pets');
    return [
      {
        name: 'Ada',
        age: 3,
        animal: PetEnum.DOG,
        ownerId: 1,
      },
      {
        name: 'Dingo',
        age: 7,
        animal: PetEnum.DOG,
        ownerId: 2,
      },
      {
        name: 'Taso',
        age: 4,
        animal: PetEnum.CAT,
        ownerId: 2,
      },
    ];
  }

  getPetDetails(id: number): PetDto {
    console.log('Pet details with id: ', id);

    return {
      name: 'Dingo',
      age: 3,
      animal: PetEnum.DOG,
      ownerId: 1,
    };
  }

  deletePet(id: number): string {
    console.log(`Deleted pet with id: ${id}`);
    return 'OK';
    throw new HttpException(
      { errorMessage: 'Not Found', errorStatus: HttpStatus.NOT_FOUND },
      HttpStatus.NOT_FOUND,
    );
  }
}
