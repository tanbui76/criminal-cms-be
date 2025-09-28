import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UniqueValidatorPipe } from 'src/common/pipes/unique-validator.pipe';
import { AuthModule } from 'src/auth/auth.module';
import { PermissionsModule } from 'src/permission/permissions.module';
import { ExecutiveClemencyController } from './executive-clemency.controller';
import { ExecutiveClemencyRepository } from './executive-clemency.repository';
import { ExecutiveClemencyService } from './executive-clemency.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExecutiveClemencyRepository]),
    AuthModule,
    PermissionsModule
  ],
  exports: [ExecutiveClemencyService],
  controllers: [ExecutiveClemencyController],
  providers: [ExecutiveClemencyService, UniqueValidatorPipe]
})
export class ExecutiveClemencyModule {}
