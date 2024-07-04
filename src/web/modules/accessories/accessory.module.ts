import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessoryEntity } from './entities/accessory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessoryEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class AccessoryModule {}
