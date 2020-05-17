import { Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';

@Catch()
export class WsExceptionFilterExtended extends BaseWsExceptionFilter {

  private readonly logger = new Logger(WsExceptionFilterExtended.name); 

  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
    this.logger.log('An exception occured '.concat(JSON.stringify(exception)));
  }
}