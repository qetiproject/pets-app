import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { PetCategoryService } from './pet_category.service';
import { AddPetCategoryRequeseDto, PetCategoryResponseDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { DeleteResponseDto } from '@common/dto';

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

  @Get('/all')
  petAllCategory(): Promise<PetCategoryResponseDto[]> {
    return this.petCategoryService.getPetCategoryAllService();
  }

  @Get('/:id')
  getPetCategoryDetails(
    @Param('id') id: string,
  ): Promise<PetCategoryResponseDto> {
    return this.petCategoryService.getPetCategoryDetailsService(id);
  }

  @Delete('/:id')
  deletePetCategory(@Param('id') id: string): Promise<DeleteResponseDto> {
    return this.petCategoryService.deletePetCategoryService(id);
  }
}
