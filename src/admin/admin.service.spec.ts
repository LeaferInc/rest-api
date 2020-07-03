import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { UserService } from 'src/user/user.service';
import { PlantService } from 'src/plant/plant.service';
import { CuttingService } from 'src/cutting/cutting.service';
import { EventService } from 'src/event/event.service';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        { provide: UserService, useValue: {} },
        { provide: PlantService, useValue: {} },
        { provide: CuttingService, useValue: {} },
        { provide: EventService, useValue: {} },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
