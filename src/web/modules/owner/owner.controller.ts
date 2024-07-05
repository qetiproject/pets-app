import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { OwnerResponseDto } from './dto/owner-response.dto';
import { OwnerService } from './owner.service';
import { CommonErrorFilter } from '../../../common/filters/common-error.filter';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateOwnerRequestDto } from './dto';

@UseFilters(CommonErrorFilter)
@UseGuards(AuthGuard())
@ApiTags('Owner')
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post('/add')
  async addOwner(
    @Body() ownerDto: CreateOwnerRequestDto,
  ): Promise<OwnerResponseDto> {
    return await this.ownerService.addOwner(ownerDto);
  }

  @Get('/all')
  getOwners(): Promise<OwnerResponseDto[]> {
    return this.ownerService.getOwners();
  }

  @Get('/:username')
  getOwnerDetails(
    @Param('username') username: string,
  ): Promise<OwnerResponseDto> {
    return this.ownerService.getOwnerDetails(username);
  }

  @Delete('/:username')
  deleteOwner(@Param('username') username: string): Promise<any> {
    return this.ownerService.deleteOwner(username);
  }
}
