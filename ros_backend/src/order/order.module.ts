import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { CustomerModule } from "../customer/customer.module";
import { RestaurantModule } from "../restaurant/restaurant.module";

@Module({
  imports: [PrismaModule, CustomerModule, RestaurantModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
