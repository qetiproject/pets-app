import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetModule } from '../pet/pet.module';
import { OwnerModule } from '../owner/owner.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../auth/user.entity';
import { PetEntity } from '../pet/pet.entity';
import { OwnerEntity } from '../owner/owner.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'pets',
      username: 'postgres',
      password: 'root',
      entities: [UserEntity, PetEntity, OwnerEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    PetModule,
    OwnerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
