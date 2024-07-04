import { Module } from '@nestjs/common';
import { CategoryEntity } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class CategoryModule {}
