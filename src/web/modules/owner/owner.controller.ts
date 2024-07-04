import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { OwnerDto } from './dto/owner.dto';
import { OwnerService } from './owner.service';
import { CommonErrorFilter } from '../../../common/filters/common-error.filter';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseFilters(CommonErrorFilter)
@UseGuards(AuthGuard())
@ApiTags('Owner')
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post('/add')
  async addOwner(@Body() ownerDto: OwnerDto): Promise<any> {
    try {
      const newOwner = await this.ownerService.addOwner(ownerDto);
      console.log(newOwner);
      return newOwner;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        console.error(error, 'error');
        throw new HttpException(
          { error: 'Failed to add owner' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
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
