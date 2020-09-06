import { Test, TestingModule } from '@nestjs/testing';
import { RecognitionController } from './recognition.controller';
import { HttpService } from '@nestjs/common';

describe('Recognition Controller', () => {
  let controller: RecognitionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecognitionController],
      providers: [
        {
          provide: HttpService, useValue: {}
        },
      ]
    }).compile();

    controller = module.get<RecognitionController>(RecognitionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
