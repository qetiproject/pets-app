import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetModule } from '../pet/pet.module';
import { OwnerModule } from '../owner/owner.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'pets',
      username: 'postgres',
      password: 'root',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    PetModule,
    OwnerModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
