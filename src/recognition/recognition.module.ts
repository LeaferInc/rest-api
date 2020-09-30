import { Module, HttpModule } from '@nestjs/common';
import { RecognitionController } from './recognition.controller';

@Module({
  imports: [HttpModule],
  controllers: [RecognitionController],
  providers: [],
  exports: []
})
export class RecognitionModule {}
