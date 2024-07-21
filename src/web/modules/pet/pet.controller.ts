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
import { AddPetRequestDto, PetResponseDto, UpdatePetRequestDto } from './dto';
import { PetService } from './pet.service';

// @UseFilters(CommonErrorFilter)
// @UseGuards(AuthGuard, RoleGuard)
// @Roles(RoleEnum.ADMIN, RoleEnum.USER)
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
  updatePet(
    @Param('id') id: string,
    @Body() updatePetRequestDto: UpdatePetRequestDto,
  ): Promise<PetResponseDto> {
    return this.petService.updatePetService(id, updatePetRequestDto);
  }

  @Delete('/:id')
  deletePet(@Param('id') id: string): Promise<DeleteResponseDto> {
    return this.petService.deletePet(id);
  }
}
