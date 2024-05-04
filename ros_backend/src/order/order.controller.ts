import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { CustomerService } from "../customer/customer.service";
import { RestaurantService } from "../restaurant/restaurant.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller("orders")
@UseGuards(AuthGuard)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly customerService: CustomerService,
    private readonly restaurantService: RestaurantService,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const customer = await this.customerService.findOne(createOrderDto.customerId);
    if (!customer) throw new BadRequestException("Customer not exist");
    const restaurant = await this.restaurantService.findOne(createOrderDto.restaurantId);
    if (!restaurant) throw new BadRequestException("Restaurant not exist");

    return this.orderService.create(createOrderDto);
  }

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const order = await this.orderService.findOne(id);
    if (!order) throw new NotFoundException();
    return order;
  }

  @Patch(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    const order = await this.orderService.findOne(id);
    if (!order) throw new NotFoundException();
    if (updateOrderDto.removeOrderItemIds) {
      const existingOrderItemIds = order.orderItems.map((orderItem) => orderItem.id);
      if (!updateOrderDto.removeOrderItemIds.every((id) => existingOrderItemIds.includes(id))) {
        throw new BadRequestException("Some orderItemIds are not valid");
      }
    }

    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    // Confirm the entity exist before deleting
    const order = await this.orderService.findOne(id);
    if (!order) throw new NotFoundException();

    return this.orderService.remove(id);
  }
}
