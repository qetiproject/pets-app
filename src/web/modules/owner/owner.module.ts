import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OwnerEntity } from './owner.entity';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OwnerEntity])],
  providers: [OwnerService],
  controllers: [OwnerController],
})
export class OwnerModule {}
