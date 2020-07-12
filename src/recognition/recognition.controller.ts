import { Controller, UseGuards, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { File, fileFilter } from 'src/common/file';
import * as vision from '@google-cloud/vision';
import { RecognitionService } from './recognition.service';

@ApiBearerAuth()
@Controller('recognize')
export class RecognitionController {
  private readonly client = new vision.ImageAnnotatorClient();

  constructor(private recognition: RecognitionService) { }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', { fileFilter: fileFilter }))
  @Post()
  recognizePlant(@UploadedFile() file: File): Promise<any> {
    return this.client.labelDetection(file.buffer);
  }
}