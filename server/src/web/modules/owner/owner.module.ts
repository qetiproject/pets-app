import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserEntity } from '@modules/user/entities';
import { ResponseMapper } from '@modules/user/mappers';

import { OwnerController } from './owner.controller';
import { OwnerEntity } from './entities/owner.entity';
import { OwnerService } from './owner.service';

@Module({
  imports: [TypeOrmModule.forFeature([OwnerEntity, UserEntity])],
  providers: [OwnerService, ResponseMapper],
  controllers: [OwnerController],
})
export class OwnerModule {}
