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

import { DeleteResponseDto } from '@common/dto';
import { PetService } from './pet.service';
import {
  AddPetRequestDto,
  PetResponseDto,
  UpdatePetWithOwnerOrAddRequestDto,
  UpdatePetWithOwnerOrAddResponseDto,
} from './dto';

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

  @Put('/:id')
  updatePetWithOwnerOrAdd(
    @Param('id') id: string,
    updatePetWithOwnerOrAddRequestDto: UpdatePetWithOwnerOrAddRequestDto,
  ): Promise<UpdatePetWithOwnerOrAddResponseDto> {
    return this.petService.updatePetWithOwnerOrAddService(
      id,
      updatePetWithOwnerOrAddRequestDto,
    );
  }

  @Delete('/:id')
  deletePet(@Param('id') id: string): Promise<DeleteResponseDto> {
    return this.petService.deletePet(id);
  }
}
