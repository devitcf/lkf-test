import { Injectable } from "@nestjs/common";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Restaurant } from "./entities/restaurant.entity";

@Injectable()
export class RestaurantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const { name, address, cuisineType } = createRestaurantDto;
    return this.prisma.restaurant.create({
      data: { name, address, cuisineType },
      include: { customers: true, items: true, orders: true },
    });
  }

  async findAll(): Promise<Restaurant[]> {
    return this.prisma.restaurant.findMany({ include: { customers: true, items: true, orders: true } });
  }

  async findOne(id: number): Promise<Restaurant | null> {
    return this.prisma.restaurant.findUnique({
      where: { id },
      include: { customers: true, items: true, orders: true },
    });
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
    const { name, address, cuisineType } = updateRestaurantDto;
    return this.prisma.restaurant.update({
      where: { id },
      data: { name, address, cuisineType },
      include: { customers: true, items: true, orders: true },
    });
  }

  async remove(id: number): Promise<Restaurant> {
    return this.prisma.restaurant.delete({ where: { id }, include: { customers: true, items: true, orders: true } });
  }
}
