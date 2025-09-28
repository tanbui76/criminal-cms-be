import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min, ValidateIf } from 'class-validator';

export class CreateExecutiveClemencyDto {
  @ApiProperty({
    description: 'Số ngày được giảm án',
    example: 30
  })
  @ValidateIf((object, value) => value !== null)
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  sentenceReductionDays: number;
}
