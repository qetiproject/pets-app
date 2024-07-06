import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '@modules/user/entities';
import { OwnerResponseDto } from './dto/owner-response.dto';
import { OwnerEntity } from './entities/owner.entity';
import { CreateOwnerRequestDto } from './dto';
import { ResponseMapper } from '@modules/user/mappers';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly ownerRepository: Repository<OwnerEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly responseMappers: ResponseMapper,
  ) {}

  private async getUserByUsernameService(
    username: string,
  ): Promise<Omit<UserEntity, 'password'>> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { username },
      });
      return this.responseMappers.userResponse(user);
    } catch (error) {
      throw new HttpException(
        { error: `User with username: ${username} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async addOwnerService(
    ownerDto: CreateOwnerRequestDto,
  ): Promise<OwnerResponseDto> {
    await this.getUserByUsernameService(ownerDto.username);

    const ownerFromDB = await this.ownerRepository.findOne({
      where: { username: ownerDto.username },
    });

    if (ownerFromDB) {
      throw new HttpException(
        { errorMessage: 'Username already exists' },
        HttpStatus.CONFLICT,
      );
    }

    try {
      return await this.ownerRepository.save<OwnerEntity>(ownerDto);
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to add owner' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOwnersService(): Promise<OwnerResponseDto[]> {
    return await this.ownerRepository.find();
    // return this.ownerRepository.find({ relations: ['pets'] });
  }

  getOwnerDetailsService(username: string): Promise<OwnerResponseDto> {
    try {
      return this.ownerRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      throw new HttpException(
        { error: `Owner with username: ${username} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteOwnerService(username: string): Promise<unknown> {
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
