import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { ModelSerializer } from 'src/common/serializer/model.serializer';

export const basicFieldGroupsForSerializing: string[] = ['basic'];

export class ExecutiveClemencySerializer extends ModelSerializer {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  @Transform(({ obj }) => obj.criminal?.id)
  criminalId: number;

  @ApiProperty()
  @Expose()
  @Transform(({ obj }) => obj.criminal?.name)
  criminalName: string;

  @ApiProperty()
  @Expose()
  decisionNo: string; //số quyết định

  @ApiProperty()
  @Expose()
  decisionDate: Date; //ngày quyết định

  @ApiProperty()
  @Expose()
  sentenceReductionDays: number; //số ngày giảm án

  @ApiPropertyOptional()
  @Expose()
  createdAt: Date;

  @ApiPropertyOptional()
  @Expose()
  updatedAt: Date;

  constructor(data?: Partial<ExecutiveClemencySerializer>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
