import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PetShopEntity } from './entities/pet_shop.entity';
import { AddPetShopRequestDto } from './dto';

@Injectable()
export class PetShopService {
  constructor(
    @InjectRepository(PetShopEntity)
    private readonly petShopRepository: Repository<PetShopEntity>,
  ) {}

  addPetShopService(addPetShopDto: AddPetShopRequestDto): Promise<any> {
    try {
      return this.petShopRepository.save<any>(addPetShopDto);
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to add pet' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPetShopsService(): Promise<any> {
    try {
      const petShop = await this.petShopRepository.find();
      return petShop;
    } catch (error) {
      throw new HttpException(
        { error: `Get PetShops have problem` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #id pet-shop`;
  // }

  // update(id: number, updatePetShopDto: UpdatePetShopDto) {
  //   return `This action updates a #id pet-shop`;
  // }

  // remove(id: number) {
  //   return `This action removes a #id pet-shop`;
  // }
}
