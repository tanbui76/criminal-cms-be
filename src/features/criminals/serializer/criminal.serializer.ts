import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

import { ModelSerializer } from 'src/common/serializer/model.serializer';

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
