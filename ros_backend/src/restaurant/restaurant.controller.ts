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
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.restaurantService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const restaurant = await this.restaurantService.findOne(+id);
    if (!restaurant) throw new NotFoundException();
    return restaurant;
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantService.update(+id, updateRestaurantDto);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    // Confirm the entity exist before deleting
    const restaurant = await this.restaurantService.findOne(id);
    if (!restaurant) throw new NotFoundException();

    return this.restaurantService.remove(+id);
  }
}
