import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from 'src/config';
import * as Joi from 'joi';
import { PetModule } from '../pet/pet.module';
import { OwnerModule } from '../owner/owner.module';
import { UserModule } from '../user/user.module';
// import { AuthModule } from '../auth/auth.module';

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
    PetModule,
    OwnerModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
