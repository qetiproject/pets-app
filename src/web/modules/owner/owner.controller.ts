import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { OwnerDto } from './dto/owner.dto';
import { OwnerService } from './owner.service';
import { CommonErrorFilter } from '../../../common/filters/common-error.filter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Owner')
@UseFilters(CommonErrorFilter)
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post('/add')
  addOwner(@Body() ownerDto: OwnerDto): Promise<OwnerDto> {
    return this.ownerService.addOwner(ownerDto);
  }

  @Get('/all')
  getOwners(): Promise<OwnerDto[]> {
    return this.ownerService.getOwners();
  }

  @Get('/:username')
  getOwnerDetails(@Param('username') username: string): Promise<OwnerDto> {
    return this.ownerService.getOwnerDetails(username);
  }

  @Delete('/:username')
  deleteOwner(@Param('username') username: string): Promise<any> {
    return this.ownerService.deleteOwner(username);
  }
}
