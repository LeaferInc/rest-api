import { Test, TestingModule } from '@nestjs/testing';
import { ImageService, ImageType } from './image.service';
import * as path from 'path';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageService,
      ],
    }).compile();

    service = module.get<ImageService>(ImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the right file path', () => {
    expect(service.getPath(ImageType.AVATAR, 'avatar.png')
    .endsWith(path.join('pictures', 'avatars', 'avatar.png'))).toBe(true);
    
    expect(service.getPath(ImageType.EVENT, 'event.png')
    .endsWith(path.join('pictures', 'events', 'event.png'))).toBe(true);
  });
});
