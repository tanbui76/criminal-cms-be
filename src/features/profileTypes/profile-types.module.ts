import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UniqueValidatorPipe } from 'src/common/pipes/unique-validator.pipe';
import { AuthModule } from 'src/auth/auth.module';
import { PermissionsModule } from 'src/permission/permissions.module';
import { ProfileTypesRepository } from './profile-types.repository';
import { ProfileTypesController } from './profile-types.controller';
import { ProfileTypesService } from './profile-types.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileTypesRepository]),
    AuthModule,
    PermissionsModule
  ],
  exports: [],
  controllers: [ProfileTypesController],
  providers: [ProfileTypesService, UniqueValidatorPipe]
})
export class ProfileTypesModule {}
