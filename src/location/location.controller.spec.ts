import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { HttpService } from '@nestjs/common';

describe('Location Controller', () => {
  let controller: LocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        {
          provide: HttpService, useValue: {}
        },
      ]
    }).compile();

    controller = module.get<LocationController>(LocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
