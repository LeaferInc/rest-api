import { Controller, Get, Query, HttpService, HttpException, HttpStatus } from '@nestjs/common';

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
