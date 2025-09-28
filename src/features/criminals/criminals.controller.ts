import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Pagination } from 'src/paginate';
import { PermissionGuard } from 'src/common/guard/permission.guard';
import JwtTwoFactorGuard from 'src/common/guard/jwt-two-factor.guard';
import { CreateCriminalDto } from './dto/create-criminal.dto';
import { CriminalsService } from './criminals.service';
import { CriminalSerializer } from './serializer/criminal.serializer';
import { CriminalFilterDto } from './dto/criminal-filter.dto';
import { UpdateCriminalDto } from './dto/update-criminal.dto';
import { CreateExecutiveClemencyDto } from './dto/create-executive-clemency.dto';

@ApiTags('criminals')
@UseGuards(JwtTwoFactorGuard)
@Controller('criminals')
@ApiBearerAuth()
export class CriminalsController {
  constructor(private readonly criminalsService: CriminalsService) {}

  @Post()
  create(
    @Body()
    createCriminalDto: CreateCriminalDto
  ): Promise<CriminalSerializer> {
    return this.criminalsService.create(createCriminalDto);
  }

  @Get()
  @ApiQuery({
    type: CriminalFilterDto
  })
  findAll(
    @Query()
    criminalFilterDto: CriminalFilterDto
  ): Promise<Pagination<CriminalSerializer>> {
    return this.criminalsService.findAll(criminalFilterDto);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string
  ): Promise<CriminalSerializer> {
    return this.criminalsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    updateRoleDto: UpdateCriminalDto
  ): Promise<CriminalSerializer> {
    return this.criminalsService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id')
    id: string
  ): Promise<void> {
    return this.criminalsService.remove(+id);
  }

  @Post(':id/executive-clemencies')
  addExecutiveClemencies(
    @Param('id')
    id: string,
    @Body()
    dto: CreateExecutiveClemencyDto
  ): Promise<CriminalSerializer> {
    return this.criminalsService.addExecutiveClemencies(+id, dto);
  }
}
