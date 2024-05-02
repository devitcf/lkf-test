import { Injectable } from "@nestjs/common";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto) {
    const { name, price, restaurantId } = createItemDto;
    return this.prisma.item.create({ data: { name, price, restaurantId }, include: { restaurant: true } });
  }

  async findAll() {
    return this.prisma.item.findMany({ include: { restaurant: true } });
  }

  async findOne(id: number) {
    return this.prisma.item.findUnique({ where: { id } });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const { name, price, restaurantId } = updateItemDto;
    return this.prisma.item.update({
      where: { id },
      data: {
        name,
        price,
        restaurantId,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.item.delete({ where: { id } });
  }
}
