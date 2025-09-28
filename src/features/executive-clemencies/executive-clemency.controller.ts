import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/common/guard/permission.guard';
import JwtTwoFactorGuard from 'src/common/guard/jwt-two-factor.guard';
import { ExecutiveClemencyService } from './executive-clemency.service';

@ApiTags('ExecutiveClemency')
@UseGuards(JwtTwoFactorGuard, PermissionGuard)
@Controller('ExecutiveClemency')
@ApiBearerAuth()
export class ExecutiveClemencyController {
  constructor(
    private readonly executiveClemencyService: ExecutiveClemencyService
  ) {}
}
