import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommonErrorFilter } from '@common/filters';

import { PetShopService } from './pet-shop.service';
import {
  AddPetShopRequestDto,
  PetShopResponseDto,
  UpdatePetShopRequestDto,
} from './dto';
import { DeleteResponseDto } from '@common/dto';

@UseFilters(CommonErrorFilter)
@ApiTags('PetShops')
@Controller('petShop')
export class PetShopController {
  constructor(private readonly petShopService: PetShopService) {}

  @Post('/add')
  addPetShop(@Body() addPetShopDto: AddPetShopRequestDto): Promise<any> {
    return this.petShopService.addPetShopService(addPetShopDto);
  }

  @Get('/all')
  async getPetShops(): Promise<any> {
    return await this.petShopService.getPetShopsService();
  }

  @Get('/:id')
  getPetShopDetails(@Param('id') id: string): Promise<PetShopResponseDto> {
    return this.petShopService.getPetShopDetailsService(id);
  }

  @Delete('/:id')
  deletePetShop(@Param('id') id: string): Promise<DeleteResponseDto> {
    return this.petShopService.deletePetShopService(id);
  }
}
