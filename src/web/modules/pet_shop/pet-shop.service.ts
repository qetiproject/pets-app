import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PetShopEntity } from './entities/pet_shop.entity';
import {
  AddPetShopRequestDto,
  PetShopResponseDto,
  UpdatePetShopRequestDto,
} from './dto';
import { DeleteResponseDto } from '@common/dto';

@Injectable()
export class PetShopService {
  constructor(
    @InjectRepository(PetShopEntity)
    private readonly petShopRepository: Repository<PetShopEntity>,
  ) {}

  addPetShopService(
    addPetShopDto: AddPetShopRequestDto,
  ): Promise<PetShopResponseDto> {
    try {
      const petShop = this.petShopRepository.create({
        name: addPetShopDto.name,
        active: true,
        address: addPetShopDto.address,
        city: addPetShopDto.city,
        work_hours: addPetShopDto.work_hours,
        products: [],
      });
      return this.petShopRepository.save<PetShopEntity>(petShop);
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to add pet' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPetShopsService(): Promise<PetShopResponseDto[]> {
    try {
      const petShop = await this.petShopRepository.find({
        relations: ['pets'],
      });
      return petShop;
    } catch (error) {
      throw new HttpException(
        { error: `Get PetShops have problem` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePetShopService(
    id: string,
    updatePetShopDto: Partial<UpdatePetShopRequestDto>,
  ): Promise<PetShopResponseDto> {
    try {
      const petShop = await this.getPetShopDetailsService(id);
      Object.assign(petShop, updatePetShopDto);
      const updatedPetShop =
        await this.petShopRepository.save<PetShopEntity>(petShop);
      return updatedPetShop;
    } catch (error) {
      throw new HttpException(
        {
          error: `Pet with id: ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getPetShopDetailsService(id: string): Promise<PetShopResponseDto> {
    try {
      return await this.petShopRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { error: `Petshop with id: ${id} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deletePetShopService(id: string): Promise<DeleteResponseDto> {
    try {
      return await this.petShopRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        { error: `PetShop with id: ${id} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
