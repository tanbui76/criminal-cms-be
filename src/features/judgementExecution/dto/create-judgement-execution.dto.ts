import { IsString, ValidateIf } from 'class-validator';

export class CreateJudgmentExecutionDto {
  @ValidateIf((object, value) => value)
  @IsString()
  serial: string; //Số quyết định

  @ValidateIf((object, value) => value)
  @IsString()
  punishment: string; //Hình phạt

  @ValidateIf((object, value) => value)
  @IsString()
  court: string; //tòa án

  @ValidateIf((object, value) => value)
  @IsString()
  offense: string; //tội danh
}
