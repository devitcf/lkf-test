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
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { CustomerService } from "../customer/customer.service";
import { RestaurantService } from "../restaurant/restaurant.service";
import { AddItemToOrderDto } from "./dto/add-item-to-order.dto";

@Controller("orders")
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

  @Post(":id/items/add")
  async addItemToOrder(@Param("id", ParseIntPipe) id: number, @Body() addItemToOrderDto: AddItemToOrderDto) {
    return this.orderService.addItemToOrder(+id, addItemToOrderDto);
  }

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const order = await this.orderService.findOne(+id);
    if (!order) throw new NotFoundException();
    return order;
  }

  @Patch(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    if (updateOrderDto.customerId) {
      const customer = await this.customerService.findOne(updateOrderDto.customerId);
      if (!customer) throw new BadRequestException("Customer not exist");
    }
    if (updateOrderDto.restaurantId) {
      const restaurant = await this.restaurantService.findOne(updateOrderDto.restaurantId);
      if (!restaurant) throw new BadRequestException("Restaurant not exist");
    }

    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    // Confirm the entity exist before deleting
    const order = await this.orderService.findOne(id);
    if (!order) throw new NotFoundException();

    return this.orderService.remove(+id);
  }
}
