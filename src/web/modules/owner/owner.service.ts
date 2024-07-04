import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OwnerDto } from './dto/owner.dto';
import { OwnerEntity } from './owner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@modules/user/entities';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly ownerRepository: Repository<OwnerEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async addOwner(owner: any): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username: owner.username },
    });

    if (!user) {
      throw new HttpException(
        { error: `User with username: ${owner.username} not found` },
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      return await this.ownerRepository.save(owner);
    } catch (error) {
      console.log(error, 'error');
      throw new HttpException(
        { error: 'Failed to add owner' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getOwners(): Promise<OwnerDto[]> {
    return this.ownerRepository.find({ relations: ['pets'] });
  }

  getOwnerDetails(username: string): Promise<OwnerDto> {
    try {
      return this.ownerRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      throw new HttpException(
        { error: `Owner with username: ${username} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteOwner(username: string): Promise<unknown> {
    try {
      return await this.ownerRepository.delete(username);
    } catch (error) {
      throw new HttpException(
        { error: `Owner with username: ${username} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
