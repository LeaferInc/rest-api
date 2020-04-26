import { Test, TestingModule } from '@nestjs/testing';
import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';

describe('Entry Controller', () => {
  let controller: EntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntryController],
      providers: [
        { 
        provide: EntryService,
        useFactory: () => ({})
      }
    ]
    }).compile();

    controller = module.get<EntryController>(EntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
