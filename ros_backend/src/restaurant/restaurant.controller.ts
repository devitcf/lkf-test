import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("restaurants")
@UseGuards(AuthGuard)
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Get()
  async findAll() {
    return this.restaurantService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const restaurant = await this.restaurantService.findOne(id);
    if (!restaurant) throw new NotFoundException();
    return restaurant;
  }

  @Patch(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    const restaurant = await this.restaurantService.findOne(id);
    if (!restaurant) throw new NotFoundException();

    return this.restaurantService.update(id, updateRestaurantDto);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    // Confirm the entity exist before deleting
    const restaurant = await this.restaurantService.findOne(id);
    if (!restaurant) throw new NotFoundException();

    return this.restaurantService.remove(id);
  }
}
