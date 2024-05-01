import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  restaurantId: number;
}
