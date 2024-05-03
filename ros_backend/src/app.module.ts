import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import configuration from "./config/configuration";
import { validate } from "./config/env.validation";
import { PrismaModule } from "./prisma/prisma.module";
import { CustomerModule } from "./customer/customer.module";
import { RestaurantModule } from "./restaurant/restaurant.module";
import { ItemModule } from "./item/item.module";
import { OrderModule } from "./order/order.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
    }),
    PrismaModule,
    CustomerModule,
    RestaurantModule,
    ItemModule,
    OrderModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
