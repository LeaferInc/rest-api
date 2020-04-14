import { Controller, Get, Param, Query, LoggerService, Redirect } from '@nestjs/common';

@Controller('location')
export class LocationController {

  constructor() {}

  @Get()
  @Redirect('https://api-adresse.data.gouv.fr/search/')
  getLocation(@Query('address') address: string) {
    return { url: `https://api-adresse.data.gouv.fr/search?q=${!address ? '' : address}` };
  }

}
