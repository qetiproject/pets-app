import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { PetDto } from './dto/pet.dto';
import { CommonErrorFilter } from '../shared/filters/common-error.filter';

@UseFilters(CommonErrorFilter)
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post('/add')
  addPet(@Body() petDto: PetDto): string {
    return this.petService.addPet(petDto);
  }

  @Get('/all')
  getPets(): PetDto[] {
    return this.petService.getPets();
  }

  @Get('/:id')
  getPetDetails(@Param() { id }): PetDto {
    return this.petService.getPetDetails(id);
  }

  @Delete('')
  deletePet(@Query() { id }): string {
    return this.petService.deletePet(id);
  }
}
