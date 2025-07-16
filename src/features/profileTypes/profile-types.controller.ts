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
import { CreateProfileTypeDto } from './dto/create-profile-type.dto';
import { ProfileTypesService } from './profile-types.service';
import { ProfileTypeSerializer } from './serializer/profile-type.serializer';
import { ProfileTypeFilterDto } from './dto/profile-type-filter.dto';
import { UpdateProfileTypeDto } from './dto/update-profile-type.dto';

@ApiTags('profileTypes')
@UseGuards(JwtTwoFactorGuard, PermissionGuard)
@Controller('profile-types')
@ApiBearerAuth()
export class ProfileTypesController {
  constructor(private readonly criminalsService: ProfileTypesService) {}

  @Post()
  create(
    @Body()
    createProfileTypeDto: CreateProfileTypeDto
  ): Promise<ProfileTypeSerializer> {
    return this.criminalsService.create(createProfileTypeDto);
  }

  @Get()
  @ApiQuery({
    type: ProfileTypeFilterDto
  })
  findAll(
    @Query()
    criminalFilterDto: ProfileTypeFilterDto
  ): Promise<Pagination<ProfileTypeSerializer>> {
    return this.criminalsService.findAll(criminalFilterDto);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string
  ): Promise<ProfileTypeSerializer> {
    return this.criminalsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    updateRoleDto: UpdateProfileTypeDto
  ): Promise<ProfileTypeSerializer> {
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
}
