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
import { ApiTags } from '@nestjs/swagger';

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
  getPets(): PetDto[] {
    console.log(this.petService.getPets());
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
