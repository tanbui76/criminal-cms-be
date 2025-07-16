import { IsString } from 'class-validator';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProfileTypeDto } from './create-profile-type.dto';
import { Optional } from '@nestjs/common';

export class UpdateProfileTypeDto extends PartialType(CreateProfileTypeDto) {
  @ApiPropertyOptional()
  @Optional()
  @IsString()
  name: string;
}
