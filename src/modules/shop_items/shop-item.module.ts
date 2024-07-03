import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopItemEntity } from './entities/shop_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShopItemEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ShopItemModule {}
