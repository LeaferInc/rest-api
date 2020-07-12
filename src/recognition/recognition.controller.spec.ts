import { Test, TestingModule } from '@nestjs/testing';
import { RecognitionController } from './recognition.controller';
import { RecognitionService } from './recognition.service';

describe('Recognition Controller', () => {
  let controller: RecognitionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecognitionController],
      providers: [RecognitionService],
    }).compile();

    controller = module.get<RecognitionController>(RecognitionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
