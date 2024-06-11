import { Injectable } from '@nestjs/common';
import { OwnerDto } from './dto/owner.dto';
import { OwnerEntity } from './owner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly ownerRepository: Repository<OwnerEntity>,
  ) {}
  addOwner(owner: OwnerDto): Promise<OwnerDto> {
    return this.ownerRepository.save<OwnerDto>(owner);
  }

  getOwners(): Promise<OwnerDto[]> {
    return this.ownerRepository.find({ relations: ['pets'] });
  }

  getOwnerDetails(id: number): OwnerDto {
    console.log('Owner details with id: ', id);

    return {
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
