import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Pagination } from 'src/paginate';
import { PermissionGuard } from 'src/common/guard/permission.guard';
import JwtTwoFactorGuard from 'src/common/guard/jwt-two-factor.guard';
import { JudgmentExecutionsService } from './judgement-executions.service';
import { CreateJudgmentExecutionDto } from './dto/create-judgement-execution.dto';
import { JudgmentExecutionSerializer } from './serializer/judgement-execution.serializer';
import { JudgmentExecutionFilterDto } from './dto/judgement-execution-filter.dto';
import { UpdateJudgmentExecutionDto } from './dto/update-judgement-execution.dto';

@ApiTags('judgment-executions')
@UseGuards(JwtTwoFactorGuard, PermissionGuard)
@Controller('judgment-executions')
@ApiBearerAuth()
export class JudgmentExecutionsController {
  constructor(
    private readonly judgmentExecutionsService: JudgmentExecutionsService
  ) {}

  @Post()
  create(
    @Body()
    createJudgmentExecutionDto: CreateJudgmentExecutionDto
  ): Promise<JudgmentExecutionSerializer> {
    return this.judgmentExecutionsService.create(createJudgmentExecutionDto);
  }

  @Get()
  @ApiQuery({
    type: JudgmentExecutionFilterDto
  })
  findAll(
    @Query()
    judgmentExecutionFilterDto: JudgmentExecutionFilterDto
  ): Promise<Pagination<JudgmentExecutionSerializer>> {
    return this.judgmentExecutionsService.findAll(judgmentExecutionFilterDto);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string
  ): Promise<JudgmentExecutionSerializer> {
    return this.judgmentExecutionsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    updateRoleDto: UpdateJudgmentExecutionDto
  ): Promise<JudgmentExecutionSerializer> {
    return this.judgmentExecutionsService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id')
    id: string
  ): Promise<void> {
    return this.judgmentExecutionsService.remove(+id);
  }
}
