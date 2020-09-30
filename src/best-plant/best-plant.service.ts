import { Injectable } from "@nestjs/common";
import { Repository, getConnection } from "typeorm";
import { BestPlantEntity, BestPlantList, PlantHeight, PlantCareTime, PlantLuminosity } from "src/common/entity/best-plant.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindBestPlantDto, BestPlantDto, UserCareTime, UserLuminosity } from "src/common/dto/best-plant.dto";

@Injectable()
export class BestPlantService {

  constructor(@InjectRepository(BestPlantEntity) private readonly bestPlantRepository: Repository<BestPlantEntity>) {
    this.setup();
  }

  /**
   * Save in DataBase all the plants that could be adviced to a user
   */
  async setup(): Promise<void> {
    const names: string[] = (await getConnection()
      .getRepository(BestPlantEntity)
      .createQueryBuilder("best")
      .select('best.name')
      .getMany()).map(bp => bp.name);

    for (const bp of BestPlantList.PLANTS) {
      if (!names.includes(bp.name)) {
        this.bestPlantRepository.save(bp);
      }
    }
  }

  /**
   * Returns the best plant for the given form
   * @param form the criteria of the user
   */
  async findBestPlant(form: FindBestPlantDto): Promise<BestPlantDto> {
    const plants = await this.bestPlantRepository.find();

    for (const plant of plants) {
      this.computeScore(plant, form);
    }

    plants.sort((a,b) => b.score - a.score);

    return plants[0].toDto();
  }

  /**
   * Computes the compatibility score of the plant
   * @param plant the plant to compare
   * @param form the form to compare
   */
  computeScore(plant: BestPlantEntity, form: FindBestPlantDto): void {
    let score = 0;

    // Budget
    if (form.budget >= plant.price) score += 2;
    else if (form.budget + 10 >= plant.price) score += 1;

    // Space available
    if (form.space) {
      score += plant.height === PlantHeight.SMALL ? 1 : 2;
    } else {
      if (plant.height === PlantHeight.MEDIUM) score += 1;
      else if (plant.height === PlantHeight.SMALL) score += 2;
    }

    // Care Time
    switch (form.careTime) {
      case UserCareTime.LOT:
        if (plant.careTime === PlantCareTime.BIT || plant.careTime === PlantCareTime.LITTLE) {
          score += 1;
        } else score += 2;
        break;
      case UserCareTime.MEDIUM:
        if (plant.careTime !== PlantCareTime.LOT) score += 2;
        break;
      case UserCareTime.LITTLE:
        if (plant.careTime === PlantCareTime.BIT || plant.careTime === PlantCareTime.LITTLE) {
          score =+ 2;
        }
        break;
    }

    // Luminosity
    switch (form.weather) {
      case UserLuminosity.SUN: 
        score += plant.luminosity === PlantLuminosity.SHADOW ? 1 : 2;
        break;
      case UserLuminosity.CLOUD:
        if (plant.luminosity !== PlantLuminosity.EXPOSED) score += 2;
        break;
      case UserLuminosity.RAIN:
        if (plant.luminosity === PlantLuminosity.SHADOW) score += 2;
        else if (plant.luminosity === PlantLuminosity.UNEXPOSED) score += 1; 
    }

    // Toxicity
    if (form.hasPet != plant.toxicity) score += 2;

    plant.score = score;
  }
}