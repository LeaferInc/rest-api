import { Controller, UseGuards, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { AdminService } from './admin.service';

@ApiBearerAuth()
@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {

  constructor(
    private adminService: AdminService
  ) {}

  @Get('statistics')
  getStatistic() {
    return this.adminService.getStatistic();
  }

}
