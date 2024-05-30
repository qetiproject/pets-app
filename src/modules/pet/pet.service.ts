import { Injectable } from '@nestjs/common';
import { PetDto } from './dto/pet.dto';

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
        animal: 'dog',
        ownerId: 1,
      },
      {
        id: 2,
        name: 'Dingo',
        age: 7,
        animal: 'dog',
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
      animal: 'dog',
      ownerId: 1,
    };
  }

  deletePet(id: number): string {
    console.log(`Deleted pet with id: ${id}`);

    return 'OK';
  }
}
