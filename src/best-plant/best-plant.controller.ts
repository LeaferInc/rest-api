import { UseGuards, Controller, Post, Body } from "@nestjs/common";
import { BestPlantService } from "./best-plant.service";
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FindBestPlantDto, BestPlantDto } from "src/common/dto/best-plant.dto";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('best-plant')
export class BestPlantController {

  constructor(private bestPlantService: BestPlantService) { }

  /**
   * Determines the best plant for a user
   * @param criteria the form the user filled
   */
  @Post()
  determineBestPlant(@Body() criteria: FindBestPlantDto): Promise<BestPlantDto> {
    return this.bestPlantService.findBestPlant(criteria);
  }
}