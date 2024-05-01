import { Injectable } from "@nestjs/common";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class RestaurantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    const { name, address, cuisineType } = createRestaurantDto;
    return this.prisma.restaurant.create({ data: { name, address, cuisineType } });
  }

  async findAll() {
    return this.prisma.restaurant.findMany();
  }

  async findOne(id: number) {
    return this.prisma.restaurant.findUnique({ where: { id } });
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    const { name, address, cuisineType } = updateRestaurantDto;
    return this.prisma.restaurant.update({
      where: { id },
      data: { name, address, cuisineType },
    });
  }

  async remove(id: number) {
    return this.prisma.restaurant.delete({ where: { id } });
  }
}
