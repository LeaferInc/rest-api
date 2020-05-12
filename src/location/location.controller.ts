import { Controller, Get, Query, HttpService, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('location')
export class LocationController {

  constructor(private httpService: HttpService) {}

  @Get()
  async getLocation(@Query('address') address: string) {
    if(!address) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    const { data } = await this.httpService.get(`https://api-adresse.data.gouv.fr/search?q=${address}`).toPromise();
    return data;
  }
}
