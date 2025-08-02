import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from 'src/dashboard/dashboard.service';
import { DashboardController } from 'src/dashboard/dashboard.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CriminalEntity } from 'src/features/criminals/entities/criminal.entity';

@Module({
  controllers: [DashboardController],
  imports: [AuthModule, TypeOrmModule.forFeature([CriminalEntity])],
  providers: [DashboardService]
})
export class DashboardModule {}
