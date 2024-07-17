import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AddProductRequestDto, ProductResponseDto } from './dto';
import { CommonErrorFilter } from '@common/filters';
import { ProductService } from './product.service';

// @UseFilters(CommonErrorFilter)
@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/add')
  addProduct(
    @Body() addProductDto: AddProductRequestDto,
  ): Promise<ProductResponseDto> {
    return this.productService.addProductService(addProductDto);
  }
}
