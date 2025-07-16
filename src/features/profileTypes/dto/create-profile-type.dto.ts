import { IsNotEmpty, IsString, MaxLength, ValidateIf } from 'class-validator';

export class CreateProfileTypeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string; //tên

  @ValidateIf((object, value) => value)
  @IsString()
  @MaxLength(100)
  description: string; //mô tả (ghi chú)
}
