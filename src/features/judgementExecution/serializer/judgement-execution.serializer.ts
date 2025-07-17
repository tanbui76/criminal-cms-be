import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ModelSerializer } from 'src/common/serializer/model.serializer';

export const basicFieldGroupsForSerializing: string[] = ['basic'];

export class JudgmentExecutionSerializer extends ModelSerializer {
  id: number;

  @ApiProperty()
  serial: string; //Số quyết định

  @ApiProperty()
  punishment: string; //Hình phạt

  @ApiProperty()
  court: string; //tòa án

  @ApiProperty()
  offense: string; //tội danh

  @ApiPropertyOptional()
  @Expose({
    groups: basicFieldGroupsForSerializing
  })
  createdAt: Date;

  @ApiPropertyOptional()
  @Expose({
    groups: basicFieldGroupsForSerializing
  })
  updatedAt: Date;
}
