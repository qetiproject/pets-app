import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PetShopEntity } from './entities/pet_shop.entity';
import { PetShopController } from './pet-shop.controller';
import { PetShopService } from './pet-shop.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetShopEntity])],
  controllers: [PetShopController],
  providers: [PetShopService],
  exports: [],
})
export class PetShopModule {}
