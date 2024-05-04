import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, PrismaPromise } from "@prisma/client";
import { Order } from "./entities/order.entity";
import { AddItemToOrderDto } from "./dto/add-item-to-order.dto";

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerId, restaurantId, itemIds } = createOrderDto;
    try {
      const order = await this.prisma.order.create({
        data: {
          customerId,
          restaurantId,
        },
      });

      const updatedOrder = await this.prisma.order.update({
        where: { id: order.id },
        data: {
          orderItems: {
            createMany: {
              data: (itemIds ?? []).map((itemId) => ({ itemId })),
            },
          },
        },
        include: { orderItems: { include: { item: true } } },
      });

      const totalPrice = updatedOrder.orderItems.reduce((sum, cur) => sum + cur.item.price, 0);

      return await this.prisma.order.update({
        where: { id: order.id },
        data: { totalPrice },
        include: { customer: true, restaurant: true, orderItems: true },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Prisma: An operation failed because it depends on one or more records that were required but not found.
        if (e.code === "P2025" || e.code === "P2003") {
          throw new BadRequestException({ message: "Some itemIds are not valid" });
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
    const { customerId, restaurantId } = updateOrderDto;
    try {
      return await this.prisma.order.update({
        where: { id },
        data: {
          customerId,
          restaurantId,
        },
        include: { customer: true, restaurant: true, orderItems: { include: { item: true } } },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Prisma: An operation failed because it depends on one or more records that were required but not found.
        if (e.code === "P2003" || e.code === "P2003") {
          throw new BadRequestException({ message: "Some itemIds are not valid" });
        }
      }
      throw e;
    }
  }

  async addItemToOrder(id: number, addItemToOrderDto: AddItemToOrderDto): Promise<Order> {
    const { itemIds } = addItemToOrderDto;
    try {
      const order = await this.prisma.order.update({
        where: { id },
        data: {
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
        include: { customer: true, restaurant: true, orderItems: { include: { item: true } } },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Prisma: An operation failed because it depends on one or more records that were required but not found.
        if (e.code === "P2003" || e.code === "P2025") {
          throw new BadRequestException({ message: "Some itemIds are not valid" });
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
