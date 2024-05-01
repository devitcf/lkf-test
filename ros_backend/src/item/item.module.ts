import { Module } from "@nestjs/common";
import { ItemService } from "./item.service";
import { ItemController } from "./item.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { RestaurantModule } from "../restaurant/restaurant.module";

@Module({
  imports: [PrismaModule, RestaurantModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
