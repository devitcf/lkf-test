import { Injectable } from "@nestjs/common";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Item } from "./entities/item.entity";
import { PrismaPromise } from "@prisma/client";

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const { name, price, restaurantId } = createItemDto;
    return this.prisma.item.create({ data: { name, price, restaurantId }, include: { restaurant: true } });
  }

  async findAll(): Promise<Item[]> {
    return this.prisma.item.findMany({ include: { restaurant: true }, orderBy: { id: "desc" } });
  }

  async findOne(id: number): Promise<Item | null> {
    return this.prisma.item.findUnique({ where: { id }, include: { restaurant: true } });
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const { name, price, restaurantId } = updateItemDto;
    return this.prisma.item.update({
      where: { id },
      data: {
        name,
        price,
        restaurantId,
      },
      include: { restaurant: true },
    });
  }

  async remove(id: number): Promise<void> {
    const transactions: PrismaPromise<unknown>[] = [];

    transactions.push(
      this.prisma.orderItem.deleteMany({
        where: {
          itemId: id,
        },
      }),
    );
    transactions.push(
      this.prisma.item.delete({
        where: { id },
      }),
    );

    await this.prisma.$transaction(transactions);
  }
}
