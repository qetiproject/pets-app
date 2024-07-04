import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '@common/config';
import * as Joi from 'joi';
import { PetModule } from '../pet/pet.module';
import { OwnerModule } from '../owner/owner.module';
import { ShopItemModule } from '../shop_items/shop-item.module';
import { PetShopModule } from '../pet_shop/pet-shop.module';
import { AccessoryModule } from '../accessories/accessory.module';
import { CategoryModule } from '../category/category.module';
// import { AuthModule } from '@common/modules';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      validationSchema: Joi.object({
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('db'),
      inject: [ConfigService],
    }),
    // AuthModule,
    UserModule,
    OwnerModule,
    PetModule,
    ShopItemModule,
    PetShopModule,
    AccessoryModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
