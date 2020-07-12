/**
 * @author ddaninthe
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class RecognitionService {

    /**
     * Parses the response of the Google Api
     * @param response 
     */
    parseResponse(response) {
        return response;
    }
}