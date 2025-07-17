import { classToPlain, plainToClass } from 'class-transformer';
import { EntityRepository } from 'typeorm';

import { BaseRepository } from 'src/common/repository/base.repository';
import { CreateJudgmentExecutionDto } from './dto/create-judgement-execution.dto';
import { UpdateJudgmentExecutionDto } from './dto/update-judgement-execution.dto';
import { JudgmentExecutionEntity } from './entities/judgement-execution.entity';
import { JudgmentExecutionSerializer } from './serializer/judgement-execution.serializer';

@EntityRepository(JudgmentExecutionEntity)
export class JudgmentExecutionsRepository extends BaseRepository<
  JudgmentExecutionEntity,
  JudgmentExecutionSerializer
> {
  async store(
    createJudgmentExecutionDto: CreateJudgmentExecutionDto
  ): Promise<JudgmentExecutionSerializer> {
    const { serial, punishment, court, offense } = createJudgmentExecutionDto;
    const judgmentExecution = this.create();
    judgmentExecution.serial = serial;
    judgmentExecution.punishment = punishment;
    judgmentExecution.court = court;
    judgmentExecution.offense = offense;
    await judgmentExecution.save();
    return this.transform(judgmentExecution);
  }

  async updateItem(
    judgmentExecution: JudgmentExecutionEntity,
    updateJudgmentExecutionDto: UpdateJudgmentExecutionDto
  ): Promise<JudgmentExecutionSerializer> {
    const fields = ['serial', 'punishment', 'court', 'offense'];
    for (const field of fields) {
      if (updateJudgmentExecutionDto[field]) {
        judgmentExecution[field] = updateJudgmentExecutionDto[field];
      }
    }
    await judgmentExecution.save();
    return this.transform(judgmentExecution);
  }

  /**
   * transform single judgmentExecution
   * @param model
   * @param transformOption
   */
  transform(
    model: JudgmentExecutionEntity,
    transformOption = {}
  ): JudgmentExecutionSerializer {
    return plainToClass(
      JudgmentExecutionSerializer,
      classToPlain(model, transformOption),
      transformOption
    );
  }

  /**
   * transform array of judgmentExecution
   * @param models
   * @param transformOption
   */
  transformMany(
    models: JudgmentExecutionEntity[],
    transformOption = {}
  ): JudgmentExecutionSerializer[] {
    return models.map((model) => this.transform(model, transformOption));
  }
}
