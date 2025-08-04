import { EntityRepository, In, ILike } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { BaseRepository } from 'src/common/repository/base.repository';
import { CriminalEntity } from './entities/criminal.entity';
import { CriminalSerializer } from './serializer/criminal.serializer';
import { CreateCriminalDto } from './dto/create-criminal.dto';
import { UpdateCriminalDto } from './dto/update-criminal.dto';
import { ProfileTypeEntity } from '../profileTypes/entities/profile-type.entity';
import { JudgmentExecutionEntity } from '../judgementExecution/entities/judgement-execution.entity';
import { Pagination } from 'src/paginate';

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
      profileTypeIds,
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
    if (profileTypeIds && profileTypeIds.length > 0) {
      const profileTypes = await this.manager.find(ProfileTypeEntity, {
        where: { id: In(profileTypeIds) }
      });
      if (profileTypes.length > 0) {
        criminal.profileTypes = profileTypes;
      }
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

    const savedCriminal = await this.findOne({
      where: { id: criminal.id },
      relations: ['profileTypes']
    });

    return this.transform(savedCriminal);
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
    if (
      updateCriminalDto.profileTypeIds &&
      updateCriminalDto.profileTypeIds.length > 0
    ) {
      const profileTypes = await this.manager.find(ProfileTypeEntity, {
        where: { id: In(updateCriminalDto.profileTypeIds) }
      });
      if (profileTypes.length > 0) {
        criminal.profileTypes = profileTypes;
      }
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

    // Load lại với relations để đảm bảo có đầy đủ data
    const savedCriminal = await this.findOne({
      where: { id: criminal.id },
      relations: ['profileTypes']
    });

    return this.transform(savedCriminal);
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
   * Override paginate method to support profileTypeIds filter
   * @param searchFilter
   * @param relations
   * @param searchCriteria
   * @param transformOptions
   */
  async paginate(
    searchFilter: any,
    relations: string[] = [],
    searchCriteria: string[] = [],
    transformOptions = {}
  ): Promise<any> {
    const paginationInfo = this.getPaginationInfo(searchFilter);
    const { page, skip, limit } = paginationInfo;

    // Build query builder
    const queryBuilder = this.createQueryBuilder('criminal');

    // Add relations
    if (relations.includes('profileTypes')) {
      queryBuilder.leftJoinAndSelect('criminal.profileTypes', 'profileTypes');
    }

    // Handle keywords search
    if (searchFilter.hasOwnProperty('keywords') && searchFilter.keywords) {
      for (const key of searchCriteria) {
        queryBuilder.andWhere(`criminal.${key} ILIKE :keyword`, {
          keyword: `%${searchFilter.keywords}%`
        });
      }
    }

    // Handle profileTypeIds filter
    if (
      searchFilter.hasOwnProperty('profileTypeIds') &&
      searchFilter.profileTypeIds &&
      searchFilter.profileTypeIds.length > 0
    ) {
      queryBuilder.andWhere('profileTypes.id IN (:...profileTypeIds)', {
        profileTypeIds: searchFilter.profileTypeIds
      });
    }

    // Add pagination
    queryBuilder.skip(skip).take(limit).orderBy('criminal.createdAt', 'DESC');

    const [results, total] = await queryBuilder.getManyAndCount();
    const serializedResult = this.transformMany(results, transformOptions);

    return new Pagination({
      results: serializedResult,
      totalItems: total,
      pageSize: limit,
      currentPage: page,
      previous: page > 1 ? page - 1 : 0,
      next: total > skip + limit ? page + 1 : 0
    });
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
