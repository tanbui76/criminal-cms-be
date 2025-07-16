import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, ObjectLiteral } from 'typeorm';

import { NotFoundException } from 'src/exception/not-found.exception';
import { basicFieldGroupsForSerializing } from 'src/features/criminals/serializer/criminal.serializer';
import { CommonServiceInterface } from 'src/common/interfaces/common-service.interface';
import { Pagination } from 'src/paginate';
import { ProfileTypeSerializer } from './serializer/profile-type.serializer';
import { ProfileTypesRepository } from './profile-types.repository';
import { CreateProfileTypeDto } from './dto/create-profile-type.dto';
import { ProfileTypeFilterDto } from './dto/profile-type-filter.dto';
import { UpdateProfileTypeDto } from './dto/update-profile-type.dto';

@Injectable()
export class ProfileTypesService
  implements CommonServiceInterface<ProfileTypeSerializer>
{
  constructor(
    @InjectRepository(ProfileTypesRepository)
    private repository: ProfileTypesRepository
  ) {}

  /**
   * Find by name
   * @param name
   */
  async findByName(name) {
    return await this.repository.findOne({ name });
  }

  /**
   * create new criminal
   * @param createProfileTypeDto
   */
  async create(
    createProfileTypeDto: CreateProfileTypeDto
  ): Promise<ProfileTypeSerializer> {
    return this.repository.store(createProfileTypeDto);
  }

  /**
   * find and return collection of criminals
   * @param criminalFilterDto
   */
  async findAll(
    criminalFilterDto: ProfileTypeFilterDto
  ): Promise<Pagination<ProfileTypeSerializer>> {
    return this.repository.paginate(
      criminalFilterDto,
      [],
      ['name', 'description'],
      {
        groups: [basicFieldGroupsForSerializing]
      }
    );
  }

  /**
   * find criminal by id
   * @param id
   */
  async findOne(id: number): Promise<ProfileTypeSerializer> {
    return this.repository.get(id, [], {
      groups: [basicFieldGroupsForSerializing]
    });
  }

  /**
   * update ProfileType by id
   * @param id
   * @param updateProfileTypeDto
   */
  async update(
    id: number,
    updateProfileTypeDto: UpdateProfileTypeDto
  ): Promise<ProfileTypeSerializer> {
    const profileType = await this.repository.findOne(id);
    if (!profileType) {
      throw new NotFoundException();
    }
    const condition: ObjectLiteral = {
      name: updateProfileTypeDto.name
    };
    condition.id = Not(id);
    const checkUniqueTitle = await this.repository.countEntityByCondition(
      condition
    );
    if (checkUniqueTitle > 0) {
      throw new UnprocessableEntityException({
        property: 'name',
        constraints: {
          unique: 'already taken'
        }
      });
    }
    return this.repository.updateItem(profileType, updateProfileTypeDto);
  }

  /**
   * remove criminal by id
   * @param id
   */
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repository.delete({ id });
  }
}
