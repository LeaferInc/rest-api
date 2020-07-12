import { Module } from '@nestjs/common';
import { RecognitionController } from './recognition.controller';
import { RecognitionService } from './recognition.service';

@Module({
  imports: [],
  controllers: [RecognitionController],
  providers: [RecognitionService],
  exports: [],
})
export class RecognitionModule {}
