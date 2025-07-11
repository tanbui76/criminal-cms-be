import {
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateIf
} from 'class-validator';

export class CreateCriminalDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ValidateIf((object, value) => value)
  @IsString()
  description: string;

  @ValidateIf((object, value) => value)
  @IsString()
  birthplace: string;

  @ValidateIf((object, value) => value)
  @IsDate()
  birthdate: Date; //ngày tháng năm sinh

  @ValidateIf((object, value) => value)
  @IsString()
  address: string; // hộ khẩu thường trú
}
