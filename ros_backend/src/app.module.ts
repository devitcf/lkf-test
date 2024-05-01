import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { CustomerModule } from "./customer/customer.module";
import { RestaurantModule } from "./restaurant/restaurant.module";
import { ItemModule } from "./item/item.module";

@Module({
  imports: [PrismaModule, CustomerModule, RestaurantModule, ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
