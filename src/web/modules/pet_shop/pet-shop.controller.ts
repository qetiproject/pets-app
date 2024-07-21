import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PetShopService } from './pet-shop.service';
import {
  AddPetShopRequestDto,
  PetShopResponseDto,
  UpdatePetShopRequestDto,
} from './dto';
import { DeleteResponseDto } from '@common/dto';

// @UseFilters(CommonErrorFilter)
@ApiTags('PetShops')
@Controller('petShop')
export class PetShopController {
  constructor(private readonly petShopService: PetShopService) {}

  @Post('/add')
  addPetShop(
    @Body() addPetShopDto: AddPetShopRequestDto,
  ): Promise<PetShopResponseDto> {
    return this.petShopService.addPetShopService(addPetShopDto);
  }

  @Get('/all')
  async getPetShops(): Promise<PetShopResponseDto[]> {
    return await this.petShopService.getPetShopsService();
  }

  @Get('/:id')
  getPetShopDetails(@Param('id') id: string): Promise<PetShopResponseDto> {
    return this.petShopService.getPetShopDetailsService(id);
  }

  @Put('/:id')
  updatePetShop(
    @Param('id') id: string,
    @Body() updatePetShopDto: UpdatePetShopRequestDto,
  ): Promise<PetShopResponseDto> {
    return this.petShopService.updatePetShopService(id, updatePetShopDto);
  }

  @Delete('/:id')
  deletePetShop(@Param('id') id: string): Promise<DeleteResponseDto> {
    return this.petShopService.deletePetShopService(id);
  }
}
