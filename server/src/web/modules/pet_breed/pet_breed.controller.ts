import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DeleteResponseDto } from '@common/dto';
import { PetBreedService } from './pet_breed.service';
import { AddPetBreedRequeseDto, PetBreedResponseDto } from './dto';
import { RoleEnum } from '@common/enums';
import { Roles } from '@common/decorators';
import { CommonErrorFilter } from '@common/filters';
import { RoleGuard } from '@common/modules/auth/guards';
import { AuthGuard } from '@nestjs/passport';

@UseFilters(CommonErrorFilter)
@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.ADMIN, RoleEnum.USER)
@ApiTags('PetBreeds')
@Controller('petBreed')
export class PetBreedController {
  constructor(private readonly petBreedService: PetBreedService) {}

  @Post('/add')
  addPetBreed(
    @Body() addPetBreedDto: AddPetBreedRequeseDto,
  ): Promise<PetBreedResponseDto> {
    return this.petBreedService.addPetBreedService(addPetBreedDto);
  }

  @Get('/all')
  petAllBreed(): Promise<PetBreedResponseDto[]> {
    return this.petBreedService.getPetBreedAllService();
  }

  @Get('/:id')
  getPetBreedDetails(@Param('id') id: string): Promise<PetBreedResponseDto> {
    return this.petBreedService.getPetBreedDetailsService(id);
  }

  @Delete('/:id')
  deletePetBreed(@Param('id') id: string): Promise<DeleteResponseDto> {
    return this.petBreedService.deletePetBreedService(id);
  }
}
