import { PartialType } from '@nestjs/swagger';
import { IsNumber, ValidateIf } from 'class-validator';

import { CommonSearchFieldDto } from 'src/common/extra/common-search-field.dto';

export class CriminalFilterDto extends PartialType(CommonSearchFieldDto) {
  @ValidateIf((object, value) => value)
  @IsNumber({}, { each: true })
  profileTypeIds: number[];
}
