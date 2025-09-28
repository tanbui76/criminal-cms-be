import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  ValidateIf
} from 'class-validator';
import { Type } from 'class-transformer';

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
  @Type(() => Date)
  birthdate: Date; //ngày tháng năm sinh

  @ValidateIf((object, value) => value)
  address: string; // hộ khẩu thường trú

  @ValidateIf((object, value) => value)
  @IsNumber({}, { each: true })
  profileTypeIds: number[];

  @ValidateIf((object, value) => value)
  @IsNumber()
  judgmentExecutionId: number;

  @ValidateIf((object, value) => value)
  @IsDate()
  @Type(() => Date)
  startExecuteDate: Date; //Ngày bắt đầu chấp hành án

  @ValidateIf((object, value) => value)
  @IsDate()
  @Type(() => Date)
  endExecuteDate: Date; //Ngày kết thúc thi hành án

  @ValidateIf((object, value) => value)
  @IsDate()
  @Type(() => Date)
  doneExecuteDate: Date; //Ngày chấp hành án xong

  // @ValidateIf((object, value) => value)
  // @IsString()
  // refNo: string;
}
