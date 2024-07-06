import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommonErrorFilter } from '@common/filters';

import { PetService } from './pet.service';
import { PetEntity } from './entities';
import { AddPetRequestDto, PetResponseDto } from './dto';

// @UseFilters(CommonErrorFilter)
@ApiTags('Pets')
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post('/add')
  addPet(@Body() petDto: AddPetRequestDto): Promise<PetResponseDto> {
    return this.petService.addPet(petDto);
  }

  @Get('/all')
  getPets(): Promise<PetEntity[]> {
    return this.petService.getPets();
  }

  @Get('/:id')
  getPetDetails(@Param('id') id: string): Promise<PetEntity> {
    return this.petService.getPetDetails(id);
  }

  @Post('/owner')
  getPetWithOwner(@Body() petOwnerDto: any): Promise<any> {
    return this.petService.petWithOwner(petOwnerDto);
  }

  @Delete('/:id')
  deletePet(@Param('id') id: string): Promise<any> {
    return this.petService.deletePet(id);
  }
}
