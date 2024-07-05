import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '@modules/user/entities';
import { OwnerResponseDto } from './dto/owner-response.dto';
import { OwnerEntity } from './entities/owner.entity';
import { CreateOwnerRequestDto } from './dto';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly ownerRepository: Repository<OwnerEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async addOwner(owner: CreateOwnerRequestDto): Promise<OwnerResponseDto> {
    // Check if the user exists
    const user = await this.userRepository.findOne({
      where: { username: owner.username },
    });

    // If user does not exist, throw an HTTP exception with status 404
    if (!user) {
      throw new HttpException(
        { error: `User with username: ${owner.username} not found` },
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      // Save the owner to the repository and return the result
      return await this.ownerRepository.save(owner);
    } catch (error) {
      // If there is an error while saving, log the error and throw an HTTP exception with status 500
      console.log(error, 'error');
      throw new HttpException(
        { error: 'Failed to add owner' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getOwners(): Promise<OwnerResponseDto[]> {
    return this.ownerRepository.find({ relations: ['pets'] });
  }

  getOwnerDetails(username: string): Promise<OwnerResponseDto> {
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
