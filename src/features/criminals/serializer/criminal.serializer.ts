import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

import { ModelSerializer } from 'src/common/serializer/model.serializer';
import { ExecutionStatus } from '../enums/execution-status.enum';
import { getExecutionStatus } from 'src/common/helper/time.helper';
import moment from 'moment';

export const basicFieldGroupsForSerializing: string[] = ['basic'];

export class CriminalSerializer extends ModelSerializer {
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  birthplace: string;

  @ApiProperty()
  @Expose()
  birthdate: Date;

  @ApiProperty()
  @Expose()
  address: string;

  @ApiProperty()
  @Expose()
  startExecuteDate: Date;

  @ApiProperty()
  @Expose()
  endExecuteDate: Date;

  @ApiPropertyOptional()
  @Expose()
  doneExecuteDate: Date;

  @ApiProperty({
    description: 'Trạng thái thi hành án',
    enum: ExecutionStatus,
    example: ExecutionStatus.ACTIVE
  })
  @Expose()
  @Transform(({ obj }) => {
    return getExecutionStatus(obj.endExecuteDate, obj.doneExecuteDate);
  })
  executionStatus: ExecutionStatus;

  @ApiProperty({
    description: 'Số ngày còn lại để thi hành án (âm nếu đã hết hạn)',
    example: 120
  })
  @Expose()
  @Transform(({ obj }) => {
    if (obj.doneExecuteDate) {
      return 0; // Đã hoàn thành
    }
    const today = moment();
    const endDate = moment(obj.endExecuteDate);
    return endDate.diff(today, 'days');
  })
  daysRemaining: number;

  @ApiPropertyOptional({
    description: 'Array of profile types with id and name',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' }
      }
    }
  })
  @Expose()
  @Transform(({ obj }) => {
    if (obj.profileTypes && Array.isArray(obj.profileTypes)) {
      return obj.profileTypes.map((profileType) => ({
        id: profileType.id,
        name: profileType.name
      }));
    }
    return [];
  })
  profileTypeIds: Array<{ id: number; name: string }>;

  @ApiPropertyOptional()
  @Expose()
  createdAt: Date;

  @ApiPropertyOptional()
  @Expose()
  updatedAt: Date;
}
