import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PetDto } from './dto/pet.dto';
import { PetEnum } from './enums/pet';

@Injectable()
export class PetService {
  addPet(pet: PetDto): string {
    console.log('add pet', pet);
 
    return 'OK';
  }

  getPets(): PetDto[] {
    console.log('Get all pets');
    return [
      {
        id: 1,
        name: 'Ada',
        age: 3,
        animal: PetEnum.DOG,
        ownerId: 1,
      },
      {
        id: 2,
        name: 'Dingo',
        age: 7,
        animal: PetEnum.DOG,
        ownerId: 2,
      },
      {
        id: 3,
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
      id,
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
