import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  AddPetShopRequestDto,
  PetShopResponseDto,
  UpdatePetShopRequestDto,
} from './dto';
import { DeleteResponseDto } from '@common/dto';
import { CommonErrorFilter } from '@common/filters';
import { PetShopService } from './pet-shop.service';
import { Roles } from '@common/decorators';
import { RoleEnum } from '@common/enums';
import { RoleGuard } from '@common/modules/auth/guards';
import { AuthGuard } from '@nestjs/passport';

@UseFilters(CommonErrorFilter)
@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.ADMIN, RoleEnum.USER)
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
