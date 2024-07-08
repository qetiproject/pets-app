import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthGuard, RoleGuard } from '@common/modules/auth/guards';
import { RoleEnum } from '@common/enums';
import { Roles } from '@common/decorators';
import { CommonErrorFilter } from '@common/filters';
import { OwnerService } from './owner.service';
import {
  CreateOwnerRequestDto,
  OwnerResponseDto,
  UpdateOwnerRequestDto,
} from './dto';

@UseFilters(CommonErrorFilter)
@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.ADMIN, RoleEnum.USER)
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

  @Patch('/:username')
  async updateOwner(
    @Param('username') username: string,
    @Body() ownerUpdateDto: UpdateOwnerRequestDto,
  ): Promise<OwnerResponseDto> {
    return await this.ownerService.ownerUpdateService(username, ownerUpdateDto);
  }

  @Delete('/:username')
  deleteOwner(@Param('username') username: string): Promise<any> {
    return this.ownerService.deleteOwnerService(username);
  }
}
