import { Test, TestingModule } from '@nestjs/testing';
import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';
import { EntryServiceMock } from 'src/mocks/services/entry.service.mock';

describe('Entry Controller', () => {
  let controller: EntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntryController],
      providers: [
        {
          provide: EntryService,
          useValue: EntryServiceMock.mock
        }
      ]
    }).compile();

    controller = module.get<EntryController>(EntryController);
  });

  beforeEach(() => {
    EntryServiceMock.setup();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should join a user to an event', async () => {
    EntryServiceMock.testEvent2.entrants = [];
    await controller.joinEvent(2);
    expect(EntryServiceMock.testEvent2.entrants).toHaveLength(1);
    expect(EntryServiceMock.testEvent2.entrants).toStrictEqual([EntryServiceMock.testUser]);
  });

  it('should unjoin a user to an event', async () => {
    await controller.unjoinEvent(1);
    expect(EntryServiceMock.testEvent1.entrants).toHaveLength(0);
  })
});
