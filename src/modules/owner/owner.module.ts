import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { OwnerEntity } from './owner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OwnerEntity])],
  providers: [OwnerService],
  controllers: [OwnerController],
})
export class OwnerModule {}
