import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { AddProductRequestDto, ProductResponseDto } from './dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRespository: Repository<ProductEntity>,
  ) {}

  addProductService(
    addProductDto: AddProductRequestDto,
  ): Promise<ProductResponseDto> {
    try {
      const product = this.productRespository.create({
        name: addProductDto.name,
        description: addProductDto.description,
        price: addProductDto.price,
        shopId: addProductDto.shopId,
        photo: addProductDto.photo,
        active: addProductDto.active,
      });
      return this.productRespository.save<ProductEntity>(product);
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to add product' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
