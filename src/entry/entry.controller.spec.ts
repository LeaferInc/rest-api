import { Test, TestingModule } from '@nestjs/testing';
import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';
import { EntryServiceMock } from 'src/mocks/services/entry.service.mock';
import { ExpressRequestMock } from 'src/mocks/express.request.mock';

describe('Entry Controller', () => {
  let controller: EntryController;
  const requestMock = new ExpressRequestMock();

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
    await controller.joinEvent(requestMock, 2);
    expect(EntryServiceMock.testEvent2.entrants).toHaveLength(1);
    expect(EntryServiceMock.testEvent2.entrants).toStrictEqual([EntryServiceMock.testUser]);
  });

  it('should unjoin a user to an event', async () => {
    await controller.unjoinEvent(requestMock, 1);
    expect(EntryServiceMock.testEvent1.entrants).toHaveLength(0);
  });

  it('should return the entry state', async() => {
    expect(await controller.getEntryState(requestMock, 1)).toBe(true);
    expect(await controller.getEntryState(requestMock, 2)).toBe(false);
  });
});
