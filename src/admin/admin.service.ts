import { Injectable } from '@nestjs/common';
import { PlantService } from 'src/plant/plant.service';
import { CuttingService } from 'src/cutting/cutting.service';
import { EventService } from 'src/event/event.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminService {
  
  constructor(
    private userService: UserService,
    private plantService: PlantService,
    private cuttingService: CuttingService,
    private eventService: EventService,
  ) {}

  async getStatistic() {
    const [ userCount, plantCount, cuttingCount, eventCount ] = await Promise.all([
      this.userService.userCount(),
      this.plantService.plantCount(),
      this.cuttingService.cuttingCount(),
      this.eventService.eventCount()
    ])
    return { userCount, plantCount, cuttingCount, eventCount };
  }

}
