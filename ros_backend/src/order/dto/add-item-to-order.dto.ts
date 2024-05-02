import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class AddItemToOrderDto {
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsNumber({}, { each: true })
  itemIds: number[];
}
