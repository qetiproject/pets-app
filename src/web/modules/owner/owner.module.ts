import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OwnerEntity } from './owner.entity';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { UserEntity } from '@modules/user/entities';

@Module({
  imports: [TypeOrmModule.forFeature([OwnerEntity, UserEntity])],
  providers: [OwnerService],
  controllers: [OwnerController],
})
export class OwnerModule {}
