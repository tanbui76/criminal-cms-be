import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { BaseRepository } from 'src/common/repository/base.repository';
import { CriminalEntity } from './entities/criminal.entity';
import { CriminalSerializer } from './serializer/criminal.serializer';
import { CreateCriminalDto } from './dto/create-criminal.dto';
import { UpdateCriminalDto } from './dto/update-criminal.dto';
import { ProfileTypeEntity } from '../profileTypes/entities/profile-type.entity';
import { JudgmentExecutionEntity } from '../judgementExecution/entities/judgement-execution.entity';

@EntityRepository(CriminalEntity)
export class CriminalsRepository extends BaseRepository<
  CriminalEntity,
  CriminalSerializer
> {
  async store(
    createCriminalDto: CreateCriminalDto
  ): Promise<CriminalSerializer> {
    const {
      name,
      address,
      description,
      birthplace,
      startExecuteDate,
      endExecuteDate,
      doneExecuteDate,
      profileTypeId,
      judgmentExecutionId,
      birthdate
    } = createCriminalDto;
    const criminal = this.create();
    criminal.name = name;
    criminal.address = address;
    criminal.birthdate = birthdate;
    criminal.description = description;
    criminal.birthplace = birthplace;
    criminal.startExecuteDate = startExecuteDate;
    criminal.endExecuteDate = endExecuteDate;
    criminal.doneExecuteDate = doneExecuteDate;
    if (profileTypeId) {
      criminal.profileType = await this.manager.findOne(ProfileTypeEntity, {
        where: { id: profileTypeId }
      });
    }

    if (judgmentExecutionId) {
      criminal.judgmentExecution = await this.manager.findOne(
        JudgmentExecutionEntity,
        {
          where: { id: judgmentExecutionId }
        }
      );
    }
    await criminal.save();
    return this.transform(criminal);
  }

  async updateItem(
    criminal: CriminalEntity,
    updateCriminalDto: UpdateCriminalDto
  ): Promise<CriminalSerializer> {
    const fields = [
      'name',
      'description',
      'birthplace',
      'birthdate',
      'address',
      'startExecuteDate',
      'endExecuteDate',
      'doneExecuteDate'
    ];
    for (const field of fields) {
      if (updateCriminalDto[field]) {
        criminal[field] = updateCriminalDto[field];
      }
    }
    if (updateCriminalDto.profileTypeId) {
      criminal.profileType = await this.manager.findOne(ProfileTypeEntity, {
        where: { id: updateCriminalDto.profileTypeId }
      });
    }

    if (updateCriminalDto.judgmentExecutionId) {
      criminal.judgmentExecution = await this.manager.findOne(
        JudgmentExecutionEntity,
        {
          where: {
            id: updateCriminalDto.judgmentExecutionId
          }
        }
      );
    }
    await criminal.save();
    return this.transform(criminal);
  }

  /**
   * transform single criminal
   * @param model
   * @param transformOption
   */
  transform(model: CriminalEntity, transformOption = {}): CriminalSerializer {
    return plainToClass(
      CriminalSerializer,
      classToPlain(model, transformOption),
      transformOption
    );
  }

  /**
   * transform array of criminal
   * @param models
   * @param transformOption
   */
  transformMany(
    models: CriminalEntity[],
    transformOption = {}
  ): CriminalSerializer[] {
    return models.map((model) => this.transform(model, transformOption));
  }
}
