import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'src/common/repository/base.repository';
import { ExecutiveClemencyEntity } from './entities/executive-clemency.entity';
import { ExecutiveClemencySerializer } from './serializer/executive-clemency.serializer';

@EntityRepository(ExecutiveClemencyEntity)
export class ExecutiveClemencyRepository extends BaseRepository<
  ExecutiveClemencyEntity,
  ExecutiveClemencySerializer
> {
  async store(
    data: Partial<ExecutiveClemencyEntity>
  ): Promise<ExecutiveClemencySerializer> {
    const {
      criminalId,
      decisionNumber,
      decisionDate,
      sentenceReductionDays,
      reason
    } = data;
    const executiveClemency = this.create();
    executiveClemency.criminalId = criminalId;
    executiveClemency.decisionNumber = decisionNumber;
    executiveClemency.decisionDate = decisionDate || new Date();
    executiveClemency.sentenceReductionDays = sentenceReductionDays;
    executiveClemency.reason = reason;
    await executiveClemency.save();
    return this.transform(executiveClemency);
  }
}
