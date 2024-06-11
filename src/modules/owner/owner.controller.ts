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
import { OwnerDto } from './dto/owner.dto';
import { OwnerService } from './owner.service';
import { CommonErrorFilter } from '../shared/filters/common-error.filter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Owner')
@UseFilters(CommonErrorFilter)
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post('/add')
  addOwner(@Body() ownerDto: OwnerDto): string {
    return this.ownerService.addOwner(ownerDto);
  }

  @Get('/all')
  getOwners() {
    return this.ownerService.getOwners();
  }

  @Get('/:id')
  getOwnerDetails(@Param() { id }): OwnerDto {
    return this.ownerService.getOwnerDetails(id);
  }

  @Delete('')
  deleteOwner(@Query() { id }): string {
    return this.ownerService.deleteOwner(id);
  }
}
