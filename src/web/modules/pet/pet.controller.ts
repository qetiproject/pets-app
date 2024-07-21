import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { DeleteResponseDto } from '@common/dto';
import { AddPetRequestDto, PetResponseDto, UpdatePetRequestDto } from './dto';
import { PetService } from './pet.service';
import { PetEnum, PetTypeEnum } from './enums';

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

  @ApiQuery({
    name: 'limit',
    required: true,
    description: 'Limit per page',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filter by pet name',
  })
  @ApiQuery({
    name: 'age',
    required: false,
    type: Number,
    description: 'Filter by pet age',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    enum: PetTypeEnum,
    description: 'Filter by pet type',
  })
  @ApiQuery({
    name: 'animal',
    required: false,
    enum: PetEnum,
    description: 'Filter by pet animal',
  })
  @Get('/all')
  getPets(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('name') name?: string,
    @Query('age') age?: number,
    @Query('type') type?: PetTypeEnum,
    @Query('animal') animal?: PetEnum,
  ): Promise<PetResponseDto[]> {
    const filters = {
      name,
      age,
      type,
      animal,
    };
    const skip = (page - 1) * limit;
    return this.petService.getPets(limit, skip, filters);
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
