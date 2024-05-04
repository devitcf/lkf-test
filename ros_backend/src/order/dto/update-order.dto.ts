import { IsArray, IsNumber, IsOptional } from "class-validator";

export class UpdateOrderDto {
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  itemIds?: number[];

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  removeOrderItemIds?: number[];
}
