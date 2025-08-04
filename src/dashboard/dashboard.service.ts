import { Injectable } from '@nestjs/common';

import { UserStatusEnum } from 'src/auth/user-status.enum';
import { AuthService } from 'src/auth/auth.service';
import { UsersStatsInterface } from 'src/dashboard/interface/user-stats.interface';
import { BrowserStatsInterface } from 'src/dashboard/interface/browser-stats.interface';
import { OsStatsInterface } from 'src/dashboard/interface/os-stats.interface';
import { CriminalStatsInterface } from 'src/dashboard/interface/criminal-stats.interface';
import { CriminalEntity } from 'src/features/criminals/entities/criminal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(CriminalEntity)
    private readonly criminalRepository: Repository<CriminalEntity>
  ) {}

  async getUserStat(): Promise<UsersStatsInterface> {
    const totalUserPromise = this.authService.countByCondition({});
    const totalActiveUserPromise = this.authService.countByCondition({
      status: UserStatusEnum.ACTIVE
    });
    const totalInActiveUserPromise = this.authService.countByCondition({
      status: UserStatusEnum.INACTIVE
    });
    const [total, active, inactive] = await Promise.all([
      totalUserPromise,
      totalActiveUserPromise,
      totalInActiveUserPromise
    ]);
    return {
      total,
      active,
      inactive
    };
  }

  getOsData(): Promise<Array<OsStatsInterface>> {
    return this.authService.getRefreshTokenGroupedData('os');
  }

  getBrowserData(): Promise<Array<BrowserStatsInterface>> {
    return this.authService.getRefreshTokenGroupedData('browser');
  }

  async getCriminalStats(): Promise<CriminalStatsInterface> {
    // Lấy tất cả criminals với profile types
    const criminals = await this.criminalRepository
      .createQueryBuilder('criminal')
      .leftJoinAndSelect('criminal.profileTypes', 'profileType')
      .getMany();

    const total = criminals.length;

    // Thống kê theo profile type
    const profileTypeStats = new Map<string, number>();
    criminals.forEach((criminal) => {
      criminal.profileTypes.forEach((profileType) => {
        const count = profileTypeStats.get(profileType.name) || 0;
        profileTypeStats.set(profileType.name, count + 1);
      });
    });

    const byProfileType = Array.from(profileTypeStats.entries()).map(
      ([name, count]) => ({
        profileTypeName: name,
        count
      })
    );

    // Thống kê theo birthplace
    const birthplaceStats = new Map<string, number>();
    criminals.forEach((criminal) => {
      const count = birthplaceStats.get(criminal.birthplace) || 0;
      birthplaceStats.set(criminal.birthplace, count + 1);
    });

    const byBirthplace = Array.from(birthplaceStats.entries()).map(
      ([birthplace, count]) => ({
        birthplace,
        count
      })
    );

    // Thống kê theo năm sinh
    const yearStats = new Map<number, number>();
    criminals.forEach((criminal) => {
      const birthdate = new Date(criminal.birthdate);
      const year = birthdate.getFullYear();
      const count = yearStats.get(year) || 0;
      yearStats.set(year, count + 1);
    });

    const byYear = Array.from(yearStats.entries()).map(([year, count]) => ({
      year,
      count
    }));

    // Phạm nhân sẽ được thả tháng này
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const willBeReleasedThisMonth = criminals
      .filter((criminal) => {
        if (!criminal.endExecuteDate) return false;
        const endDate = new Date(criminal.endExecuteDate);
        return (
          endDate.getMonth() === currentMonth &&
          endDate.getFullYear() === currentYear
        );
      })
      .map((criminal) => ({
        id: criminal.id,
        name: criminal.name,
        description: criminal.description,
        endExecuteDate: new Date(criminal.endExecuteDate)
          .toISOString()
          .split('T')[0]
      }));

    // Phạm nhân sẽ được thả tháng tới
    const willBeReleasedNextMonth = criminals
      .filter((criminal) => {
        if (!criminal.endExecuteDate) return false;
        const endDate = new Date(criminal.endExecuteDate);
        return (
          endDate.getMonth() === (currentMonth + 1) % 12 &&
          endDate.getFullYear() === currentYear
        );
      })
      .map((criminal) => ({
        id: criminal.id,
        name: criminal.name,
        description: criminal.description,
        endExecuteDate: new Date(criminal.endExecuteDate)
          .toISOString()
          .split('T')[0]
      }));

    // Phạm nhân vừa được thả (trong 30 ngày qua)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const recentlyReleased = criminals
      .filter((criminal) => {
        if (!criminal.doneExecuteDate) return false;
        const doneDate = new Date(criminal.doneExecuteDate);
        return doneDate >= thirtyDaysAgo;
      })
      .map((criminal) => ({
        id: criminal.id,
        name: criminal.name,
        description: criminal.description,
        doneExecuteDate: new Date(criminal.doneExecuteDate)
          .toISOString()
          .split('T')[0]
      }));

    return {
      total,
      byProfileType,
      byBirthplace,
      byYear,
      willBeReleasedThisMonth,
      willBeReleasedNextMonth,
      recentlyReleased
    };
  }
}
