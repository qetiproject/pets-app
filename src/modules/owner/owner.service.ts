import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  getOwnerDetails(id: string): Promise<OwnerDto> {
    try {
      return this.ownerRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { error: `Owner with id: ${id} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteOwner(id: string): Promise<unknown> {
    try {
      return await this.ownerRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        { error: `Owner with id: ${id} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
