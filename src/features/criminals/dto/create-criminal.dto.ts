import { IsNotEmpty, IsString, MaxLength, ValidateIf } from 'class-validator';

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
}
