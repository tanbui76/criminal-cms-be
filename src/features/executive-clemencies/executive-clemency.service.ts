import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExecutiveClemencyRepository } from './executive-clemency.repository';
import { ExecutiveClemencyEntity } from './entities/executive-clemency.entity';
import { ExecutiveClemencySerializer } from './serializer/executive-clemency.serializer';

@Injectable()
export class ExecutiveClemencyService {
  constructor(
    @InjectRepository(ExecutiveClemencyRepository)
    private executiveClemencyRepo: ExecutiveClemencyRepository
  ) {
    this.executiveClemencyRepo = executiveClemencyRepo;
  }

  create(
    payload: Partial<ExecutiveClemencyEntity>
  ): Promise<ExecutiveClemencySerializer> {
    return this.executiveClemencyRepo.store(payload);
  }
}
