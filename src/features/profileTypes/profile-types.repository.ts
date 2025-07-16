import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { BaseRepository } from 'src/common/repository/base.repository';
import { ProfileTypeEntity } from './entities/profile-type.entity';
import { ProfileTypeSerializer } from './serializer/profile-type.serializer';
import { CreateProfileTypeDto } from './dto/create-profile-type.dto';
import { UpdateProfileTypeDto } from './dto/update-profile-type.dto';

@EntityRepository(ProfileTypeEntity)
export class ProfileTypesRepository extends BaseRepository<
  ProfileTypeEntity,
  ProfileTypeSerializer
> {
  async store(
    createProfileTypeDto: CreateProfileTypeDto
  ): Promise<ProfileTypeSerializer> {
    const { name, description } = createProfileTypeDto;
    const profileType = this.create();
    profileType.name = name;
    profileType.description = description;
    await profileType.save();
    return this.transform(profileType);
  }

  async updateItem(
    profileType: ProfileTypeEntity,
    updateProfileTypeDto: UpdateProfileTypeDto
  ): Promise<ProfileTypeSerializer> {
    const fields = ['name', 'description', 'birthplace'];
    for (const field of fields) {
      if (updateProfileTypeDto[field]) {
        profileType[field] = updateProfileTypeDto[field];
      }
    }
    await profileType.save();
    return this.transform(profileType);
  }

  /**
   * transform single profileType
   * @param model
   * @param transformOption
   */
  transform(
    model: ProfileTypeEntity,
    transformOption = {}
  ): ProfileTypeSerializer {
    return plainToClass(
      ProfileTypeSerializer,
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
    models: ProfileTypeEntity[],
    transformOption = {}
  ): ProfileTypeSerializer[] {
    return models.map((model) => this.transform(model, transformOption));
  }
}
