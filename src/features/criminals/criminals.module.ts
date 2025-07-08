import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UniqueValidatorPipe } from 'src/common/pipes/unique-validator.pipe';
import { AuthModule } from 'src/auth/auth.module';
import { PermissionsModule } from 'src/permission/permissions.module';
import { CriminalsRepository } from './criminals.repository';
import { CriminalsController } from './criminals.controller';
import { CriminalsService } from './criminals.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CriminalsRepository]),
    AuthModule,
    PermissionsModule
  ],
  exports: [],
  controllers: [CriminalsController],
  providers: [CriminalsService, UniqueValidatorPipe]
})
export class CriminalsModule {}
