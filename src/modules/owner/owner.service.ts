import { Injectable } from '@nestjs/common';
import { OwnerDto } from './dto/owner.dto';

@Injectable()
export class OwnerService {
  addOwner(owner: OwnerDto): string {
    console.log('add owner', owner);
    return 'OK';
  }

  getOwners(): OwnerDto[] {
    console.log('Get all owner');
    return [
      {
        id: 1,
        firstName: 'Keti',
        lastName: 'Khetsuriani',
        age: 27,
      },
      {
        id: 2,
        firstName: 'Khatia',
        lastName: 'Khetsuriani',
        age: 30,
      },
    ];
  }

  getOwnerDetails(id: number): OwnerDto {
    console.log('Owner details with id: ', id);

    return {
      id,
      firstName: 'Keti',
      lastName: 'Khetsuriani',
      age: 27,
    };
  }

  deleteOwner(id: number): string {
    console.log(`Deleted owner with id: ${id}`);

    return 'OK';
  }
}
