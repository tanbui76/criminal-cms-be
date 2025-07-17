import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CommonServiceInterface } from 'src/common/interfaces/common-service.interface';
import { NotFoundException } from 'src/exception/not-found.exception';
import { Pagination } from 'src/paginate';
import { CreateJudgmentExecutionDto } from './dto/create-judgement-execution.dto';
import { JudgmentExecutionFilterDto } from './dto/judgement-execution-filter.dto';
import { UpdateJudgmentExecutionDto } from './dto/update-judgement-execution.dto';
import { JudgmentExecutionsRepository } from './judgement-executions.repository';
import {
  basicFieldGroupsForSerializing,
  JudgmentExecutionSerializer
} from './serializer/judgement-execution.serializer';

@Injectable()
export class JudgmentExecutionsService
  implements CommonServiceInterface<JudgmentExecutionSerializer>
{
  constructor(
    @InjectRepository(JudgmentExecutionsRepository)
    private repository: JudgmentExecutionsRepository
  ) {}

  /**
   * create new judgmentExecution
   * @param createJudgmentExecutionDto
   */
  async create(
    createJudgmentExecutionDto: CreateJudgmentExecutionDto
  ): Promise<JudgmentExecutionSerializer> {
    return this.repository.store(createJudgmentExecutionDto);
  }

  /**
   * find and return collection of judgmentExecutions
   * @param judgmentExecutionFilterDto
   */
  async findAll(
    judgmentExecutionFilterDto: JudgmentExecutionFilterDto
  ): Promise<Pagination<JudgmentExecutionSerializer>> {
    return this.repository.paginate(
      judgmentExecutionFilterDto,
      [],
      ['name', 'description', 'birthplace'],
      {
        groups: [basicFieldGroupsForSerializing]
      }
    );
  }

  /**
   * find judgmentExecution by id
   * @param id
   */
  async findOne(id: number): Promise<JudgmentExecutionSerializer> {
    return this.repository.get(id, [], {
      groups: [basicFieldGroupsForSerializing]
    });
  }

  /**
   * update JudgmentExecution by id
   * @param id
   * @param updateJudgmentExecutionDto
   */
  async update(
    id: number,
    updateJudgmentExecutionDto: UpdateJudgmentExecutionDto
  ): Promise<JudgmentExecutionSerializer> {
    const judgmentExecution = await this.repository.findOne(id);
    if (!judgmentExecution) {
      throw new NotFoundException();
    }
    return this.repository.updateItem(
      judgmentExecution,
      updateJudgmentExecutionDto
    );
  }

  /**
   * remove judgmentExecution by id
   * @param id
   */
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repository.delete({ id });
  }
}
