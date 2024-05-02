import { IsArray, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  customerId: number;

  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  itemIds?: number[];
}
