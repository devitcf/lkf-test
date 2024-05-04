import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, PrismaPromise } from "@prisma/client";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerId, restaurantId, itemIds } = createOrderDto;
    const items = await this.prisma.item.findMany({ where: { id: { in: itemIds } } });
    if (items.some((item) => item.restaurantId !== restaurantId)) {
      throw new BadRequestException("Some itemIds are not belong to the restaurant");
    }

    try {
      const order = await this.prisma.order.create({
        data: {
          customerId,
          restaurantId,
          orderItems: {
            createMany: {
              data: (itemIds ?? []).map((itemId) => ({ itemId })),
            },
          },
        },
        include: { orderItems: { include: { item: true } } },
      });

      const totalPrice = order.orderItems.reduce((sum, cur) => sum + cur.item.price, 0);

      return await this.prisma.order.update({
        where: { id: order.id },
        data: { totalPrice },
        include: { customer: true, restaurant: true, orderItems: true },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Prisma: An operation failed because it depends on one or more records that were required but not found.
        if (e.code === "P2003" || e.code === "P2025") {
          throw new BadRequestException("Some itemIds are not valid");
        }
      }
      throw e;
    }
  }

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: { customer: true, restaurant: true, orderItems: { include: { item: true } } },
      orderBy: { id: "desc" },
    });
  }

  async findOne(id: number): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: { id },
      include: { customer: true, restaurant: true, orderItems: { include: { item: true } } },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const { itemIds, removeOrderItemIds } = updateOrderDto;
    const order = await this.prisma.order.findUnique({ where: { id } });

    if (order) {
      const items = await this.prisma.item.findMany({ where: { id: { in: itemIds ?? [] } } });
      if (items.some((item) => item.restaurantId !== order.restaurantId)) {
        throw new BadRequestException("Some itemIds are not belong to the restaurant");
      }
    }

    try {
      const order = await this.prisma.order.update({
        where: { id },
        data: {
          orderItems: {
            createMany: {
              data: (itemIds ?? []).map((itemId) => ({ itemId })),
            },
            deleteMany: (removeOrderItemIds ?? []).map((orderItemId) => ({ id: orderItemId })),
          },
        },
        include: { orderItems: { include: { item: true } } },
      });
      const totalPrice = order.orderItems.reduce((sum, cur) => sum + cur.item.price, 0);

      return await this.prisma.order.update({
        where: { id: order.id },
        data: { totalPrice },
        include: { customer: true, restaurant: true, orderItems: true },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Prisma: An operation failed because it depends on one or more records that were required but not found.
        if (e.code === "P2003" || e.code === "P2025") {
          throw new BadRequestException("Some itemIds are not valid");
        }
      }
      throw e;
    }
  }

  async remove(id: number): Promise<void> {
    const transactions: PrismaPromise<unknown>[] = [];

    transactions.push(
      this.prisma.orderItem.deleteMany({
        where: {
          orderId: id,
        },
      }),
    );
    transactions.push(
      this.prisma.order.delete({
        where: { id },
      }),
    );

    await this.prisma.$transaction(transactions);
  }
}
