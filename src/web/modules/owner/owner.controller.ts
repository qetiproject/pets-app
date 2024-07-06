import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthGuard, RoleGuard } from '@common/modules/auth/guards';
import { RoleEnum } from '@common/enums';
import { Roles } from '@common/decorators';
import { OwnerService } from './owner.service';
import { CreateOwnerRequestDto, OwnerResponseDto } from './dto';

// @UseFilters(CommonErrorFilter)
@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Owner')
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post('/add')
  async addOwner(
    @Body() ownerDto: CreateOwnerRequestDto,
  ): Promise<OwnerResponseDto> {
    return await this.ownerService.addOwnerService(ownerDto);
  }

  @Get('/all')
  getOwners(): Promise<OwnerResponseDto[]> {
    return this.ownerService.getOwnersService();
  }

  @Get('/:username')
  getOwnerDetails(
    @Param('username') username: string,
  ): Promise<OwnerResponseDto> {
    return this.ownerService.getOwnerDetailsService(username);
  }

  @Roles(RoleEnum.ADMIN)
  @Delete('/:username')
  deleteOwner(@Param('username') username: string): Promise<any> {
    return this.ownerService.deleteOwnerService(username);
  }
}
