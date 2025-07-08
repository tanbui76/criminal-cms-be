import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { BaseRepository } from 'src/common/repository/base.repository';
import { CriminalEntity } from './entities/criminal.entity';
import { CriminalSerializer } from './serializer/criminal.serializer';
import { CreateCriminalDto } from './dto/create-criminal.dto';
import { UpdateCriminalDto } from './dto/update-criminal.dto';

@EntityRepository(CriminalEntity)
export class CriminalsRepository extends BaseRepository<
  CriminalEntity,
  CriminalSerializer
> {
  async store(
    createCriminalDto: CreateCriminalDto
  ): Promise<CriminalSerializer> {
    const { name, description, birthplace } = createCriminalDto;
    const criminal = this.create();
    criminal.name = name;
    criminal.description = description;
    criminal.birthplace = birthplace;
    await criminal.save();
    return this.transform(criminal);
  }

  async updateItem(
    criminal: CriminalEntity,
    updateCriminalDto: UpdateCriminalDto
  ): Promise<CriminalSerializer> {
    const fields = ['name', 'description', 'birthplace'];
    for (const field of fields) {
      if (updateCriminalDto[field]) {
        criminal[field] = updateCriminalDto[field];
      }
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
