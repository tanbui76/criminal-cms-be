import { IsString, MaxLength, ValidateIf } from 'class-validator';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateCriminalDto } from './create-criminal.dto';

export class UpdateCriminalDto extends PartialType(CreateCriminalDto) {
  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  @IsString()
  @MaxLength(100)
  name: string;
}
