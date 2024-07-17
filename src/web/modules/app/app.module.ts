import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import config from '@common/config';
import * as Joi from 'joi';
import { AuthModule } from '@common/modules';
import {
  CategoryModule,
  OwnerModule,
  PetModule,
  PetShopModule,
  UserModule,
} from '@modules/index';

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
    AuthModule,
    UserModule,
    OwnerModule,
    PetModule,
    PetShopModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
