import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PetService } from './pet.service';
import { PetEntity } from './entities';
import { AddPetRequestDto, PetResponseDto } from './dto';
import { DeleteResponseDto } from '@common/dto';

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
  getPets(): Promise<PetResponseDto[]> {
    return this.petService.getPets();
  }

  @Get('/:id')
  getPetDetails(@Param('id') id: string): Promise<PetResponseDto> {
    return this.petService.getPetDetails(id);
  }

  @Delete('/:id')
  deletePet(@Param('id') id: string): Promise<DeleteResponseDto> {
    return this.petService.deletePet(id);
  }
}
