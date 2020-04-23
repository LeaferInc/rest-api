import { Module, HttpModule } from '@nestjs/common';
import { LocationController } from './location.controller';

@Module({
  imports: [HttpModule],
  controllers: [LocationController],
  providers: [],
  exports: []
})
export class LocationModule {}
