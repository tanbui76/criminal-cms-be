import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UniqueValidatorPipe } from 'src/common/pipes/unique-validator.pipe';
import { AuthModule } from 'src/auth/auth.module';
import { PermissionsModule } from 'src/permission/permissions.module';
import { JudgmentExecutionsRepository } from './judgement-executions.repository';
import { JudgmentExecutionsController } from './judgement-executions.controller';
import { JudgmentExecutionsService } from './judgement-executions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([JudgmentExecutionsRepository]),
    AuthModule,
    PermissionsModule
  ],
  exports: [],
  controllers: [JudgmentExecutionsController],
  providers: [JudgmentExecutionsService, UniqueValidatorPipe]
})
export class JudgmentExecutionsModule {}
