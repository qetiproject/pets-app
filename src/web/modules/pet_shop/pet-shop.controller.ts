import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommonErrorFilter } from '@common/filters';

import { PetShopService } from './pet-shop.service';
import { AddPetShopRequestDto } from './dto';

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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.pet-shopService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePetShopDto: UpdatePetShopDto) {
  //   return this.pet-shopService.update(+id, updatePetShopDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pet-shopService.remove(+id);
  // }
}
