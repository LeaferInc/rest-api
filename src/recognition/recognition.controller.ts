import { Controller, HttpService, UseGuards, Post, HttpCode, Body, HttpException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import * as FormData from 'form-data';
import { catchError, map } from 'rxjs/operators';
import { RecognitionDto } from 'src/common/dto/recognition.dto';
import { Observable } from 'rxjs';

enum Organ {
  LEAF = 'leaf',
  FLOWER = 'flower',
}

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('recognize')
export class RecognitionController {

  constructor(private httpService: HttpService) { }

  /**
   * Returns the result of the image recognition
   * @param image the image as a base64 encoded string
   * @param organ the organ of the plant
   */
  @Post()
  @HttpCode(200)
  recognize(@Body('image') image: string, @Body('organ') organ: Organ): Observable<RecognitionDto> {
    const form = new FormData();
    form.append('organs', organ);
    form.append('images', Buffer.from(image, 'base64'), { filename: 'plant.jpg' });

    return this.httpService.post(`https://my-api.plantnet.org/v2/identify/all?lang=fr&api-key=${process.env.PLANT_API_KEY}`,
      form, { headers: form.getHeaders() })
      .pipe(
        map(res => {
          return {
            score: res.data.results[0].score, // Score of the recognition
            name: res.data.results[0].species.scientificNameWithoutAuthor,  // Guessed Name of the recognized plant picture
          };
        }),
        catchError((e) => {
          console.log(e);
          throw new HttpException(e.response.data, e.response.status);
        })
      );
  }
}
