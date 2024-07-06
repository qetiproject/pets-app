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

  async addOwner(ownerDto: CreateOwnerRequestDto): Promise<OwnerResponseDto> {
    // const user = await this.userRepository.findOne({
    //   where: { username: owner.username },
    // });

    // if (!user) {
    //   throw new HttpException(
    //     { error: `User with username: ${owner.username} not found` },
    //     HttpStatus.NOT_FOUND,
    //   );
    // }

    // const ownerFromDB = await this.ownerRepository.findOne({
    //   where: { username: owner.username },
    // });

    // if (ownerFromDB) {
    //   throw new HttpException(
    //     { errorMessage: 'Username already exists' },
    //     HttpStatus.CONFLICT,
    //   );
    // }

    // const newOwner = this.ownerRepository.create(owner);
    // try {
    //   return await this.ownerRepository.save<any>(newOwner);
    // } catch (error) {
    //   console.log(error);
    //   throw new HttpException(
    //     { error: 'Failed to add owner' },
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
    const newOwner = new OwnerEntity();
    newOwner.username = ownerDto.username; // Make sure you set the username
    newOwner.firstName = ownerDto.firstName;
    newOwner.lastName = ownerDto.lastName;
    newOwner.age = ownerDto.age;
    newOwner.balance = ownerDto.balance;

    // Save the newOwner instance to the database
    return await this.ownerRepository.save(newOwner);
  }

  async getOwners(): Promise<OwnerResponseDto[]> {
    return await this.ownerRepository.find();
    // return this.ownerRepository.find({ relations: ['pets'] });
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
