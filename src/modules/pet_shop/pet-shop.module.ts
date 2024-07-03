import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetShopEntity } from './entities/pet_shop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PetShopEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class PetShopModule {}
