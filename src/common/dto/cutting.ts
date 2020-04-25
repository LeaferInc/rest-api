import { CuttingEntity } from "../entity/cutting";

export class CreateCuttingDto {
  name: string;
  description: string;

  toEntity(): CuttingEntity {
    const cutting: CuttingEntity = new CuttingEntity();
    cutting.name = this.name;
    cutting.description = this.description
    return cutting;
  }
}
