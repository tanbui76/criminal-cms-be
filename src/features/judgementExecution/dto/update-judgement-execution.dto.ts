import { PartialType } from '@nestjs/swagger';
import { CreateJudgmentExecutionDto } from './create-judgement-execution.dto';

export class UpdateJudgmentExecutionDto extends PartialType(
  CreateJudgmentExecutionDto
) {}
