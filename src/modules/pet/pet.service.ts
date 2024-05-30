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
        category: 'dog',
      },
      {
        id: 2,
        name: 'Dingo',
        category: 'dog',
      },
    ];
  }

  getPetDetails(id: number): PetDto {
    console.log('Pet details with id: ', id);

    return {
      id,
      name: 'Dingo',
      category: 'dog',
    };
  }

  deletePet(id: number): string {
    console.log(`Deleted pet with id: ${id}`);

    return 'OK';
  }
}
