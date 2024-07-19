import { Body, Controller, Post } from '@nestjs/common';

import { PetCategoryService } from './pet_category.service';
import { AddPetCategoryRequeseDto, PetCategoryResponseDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PetCategories')
@Controller('petCategory')
export class PetCategoryController {
  constructor(private readonly petCategoryService: PetCategoryService) {}

  @Post('/add')
  addPetCategory(
    @Body() addPetCategoryDto: AddPetCategoryRequeseDto,
  ): Promise<PetCategoryResponseDto> {
    return this.petCategoryService.addPetCategoryService(addPetCategoryDto);
  }
}
