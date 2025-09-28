import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, ObjectLiteral } from 'typeorm';
import moment from 'moment';

import { NotFoundException } from 'src/exception/not-found.exception';
import { basicFieldGroupsForSerializing } from 'src/features/criminals/serializer/criminal.serializer';
import { CommonServiceInterface } from 'src/common/interfaces/common-service.interface';
import { Pagination } from 'src/paginate';
import { CriminalSerializer } from './serializer/criminal.serializer';
import { CriminalsRepository } from './criminals.repository';
import { CreateCriminalDto } from './dto/create-criminal.dto';
import { CriminalFilterDto } from './dto/criminal-filter.dto';
import { UpdateCriminalDto } from './dto/update-criminal.dto';
import { CreateExecutiveClemencyDto } from './dto/create-executive-clemency.dto';
import { daysBetween } from 'src/common/helper/time.helper';
import { ExecutiveClemencyService } from '../executive-clemencies/executive-clemency.service';

@Injectable()
export class CriminalsService
  implements CommonServiceInterface<CriminalSerializer>
{
  constructor(
    @InjectRepository(CriminalsRepository)
    private repository: CriminalsRepository,
    private executiveClemencyService: ExecutiveClemencyService
  ) {
    this.repository = repository;
    this.executiveClemencyService = executiveClemencyService;
  }

  /**
   * Find by name
   * @param name
   */
  async findByName(name) {
    return await this.repository.findOne({ name });
  }

  /**
   * create new criminal
   * @param createCriminalDto
   */
  async create(
    createCriminalDto: CreateCriminalDto
  ): Promise<CriminalSerializer> {
    return this.repository.store(createCriminalDto);
  }

  /**
   * find and return collection of criminals
   * @param criminalFilterDto
   */
  async findAll(
    criminalFilterDto: CriminalFilterDto
  ): Promise<Pagination<CriminalSerializer>> {
    return this.repository.paginate(
      criminalFilterDto,
      ['profileTypes'],
      ['name'],
      {
        groups: [basicFieldGroupsForSerializing]
      }
    );
  }

  /**
   * find criminal by id
   * @param id
   */
  async findOne(id: number): Promise<CriminalSerializer> {
    return this.repository.get(id, ['profileTypes'], {
      groups: [basicFieldGroupsForSerializing]
    });
  }

  /**
   * update Criminal by id
   * @param id
   * @param updateCriminalDto
   */
  async update(
    id: number,
    updateCriminalDto: UpdateCriminalDto
  ): Promise<CriminalSerializer> {
    const criminal = await this.repository.findOne(id);
    if (!criminal) {
      throw new NotFoundException();
    }
    const condition: ObjectLiteral = {
      name: updateCriminalDto.name
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
    return this.repository.updateItem(criminal, updateCriminalDto);
  }

  /**
   * remove criminal by id
   * @param id
   */
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repository.delete({ id });
  }

  async addExecutiveClemencies(
    id: number,
    addExecutiveClemencyDto: CreateExecutiveClemencyDto
  ): Promise<CriminalSerializer> {
    const { sentenceReductionDays } = addExecutiveClemencyDto;

    const criminal = await this.repository.findOne({ id });
    if (!criminal) {
      throw new NotFoundException(`Không tìm thấy tội phạm với ID ${id}`);
    }

    const { endExecuteDate } = criminal;
    const today = moment();
    const endExecuteMoment = moment(endExecuteDate);

    if (endExecuteMoment.isBefore(today)) {
      throw new BadRequestException(
        'Án đã kết thúc, không thể áp dụng giảm án.'
      );
    }

    const remainingDays = daysBetween(endExecuteDate, today.toDate());
    if (sentenceReductionDays > remainingDays) {
      throw new BadRequestException(
        `Số ngày giảm án (${sentenceReductionDays}) không thể lớn hơn số ngày thi hành án còn lại (${remainingDays}).`
      );
    }

    const newEndExecuteDate = endExecuteMoment
      .subtract(sentenceReductionDays, 'days')
      .toDate();
    criminal.endExecuteDate = newEndExecuteDate;

    await this.repository.save(criminal);
    await this.executiveClemencyService.create({
      criminalId: criminal.id,
      sentenceReductionDays
    });

    return this.repository.transform(criminal);
  }
}
