import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '@modules/user/entities';
import { ResponseMapper } from '@modules/user/mappers';
import { DeleteResponseDto } from '@common/dto';
import { OwnerEntity } from './entities/owner.entity';
import {
  CreateOwnerRequestDto,
  UpdateOwnerRequestDto,
  OwnerResponseDto,
} from './dto';

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
      return await this.ownerRepository.save<OwnerEntity>({ ...ownerDto });
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to add owner' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOwnersService(): Promise<OwnerResponseDto[]> {
    return this.ownerRepository.find({ relations: ['pets'] });
  }

  async getOwnerDetailsService(username: string): Promise<OwnerResponseDto> {
    try {
      return await this.ownerRepository.findOneOrFail({
        where: { username },
        relations: ['pets'],
      });
    } catch (error) {
      throw new HttpException(
        { error: `Owner with username: ${username} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async ownerUpdateService(
    username: string,
    ownerUpdateDto: UpdateOwnerRequestDto,
  ): Promise<OwnerResponseDto> {
    try {
      let owner = await this.getOwnerDetailsService(username);
      if (owner) {
        owner = {
          username: ownerUpdateDto.username,
          age: ownerUpdateDto.age,
          balance: ownerUpdateDto.balance,
          firstName: ownerUpdateDto.firstName,
          lastName: ownerUpdateDto.lastName,
        };
        return await this.ownerRepository.save(owner);
      } else {
        throw new HttpException(
          {
            error: `Owner with username: ${username} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          {
            error: `Failed to update owner with username: ${username}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async deleteOwnerService(username: string): Promise<DeleteResponseDto> {
    try {
      const owner = await this.getOwnerDetailsService(username);
      if (owner) {
        const deleteResult: DeleteResponseDto =
          await this.ownerRepository.delete(username);
        return new DeleteResponseDto(deleteResult.raw, deleteResult.affected);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          { error: `Owner with username: ${username} not found` },
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }
}
