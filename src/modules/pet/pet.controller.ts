import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CommonErrorFilter } from '../shared/filters/common-error.filter';
import { ApiTags } from '@nestjs/swagger';
import { PetEntity } from './pet.entity';
import { PetDto, PetOwnerDto } from './dto';

@ApiTags('Pets')
@UseFilters(CommonErrorFilter)
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post('/add')
  addPet(@Body() petDto: PetDto): Promise<PetDto> {
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

  @Delete('/:id')
  deletePet(@Param('id') id: string): Promise<any> {
    return this.petService.deletePet(id);
  }

  @Post('/owner')
  getPetWithOwner(@Body() petOwnerDto: PetOwnerDto): Promise<PetDto> {
    return this.petService.petWithOwner(petOwnerDto);
  }
}
