import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const { name, email, restaurantIds } = createCustomerDto;
    try {
      return await this.prisma.customer.create({
        data: {
          name,
          email,
          restaurants: { connect: (restaurantIds ?? []).map((restaurantId) => ({ id: restaurantId })) },
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Prisma: An operation failed because it depends on one or more records that were required but not found.
        if (e.code === "P2025") {
          throw new BadRequestException({ message: "Some restaurantIds are not valid" });
        }
      }
      throw e;
    }
  }

  async findAll() {
    return this.prisma.customer.findMany({ include: { restaurants: true } });
  }

  async findOne(id: number) {
    return this.prisma.customer.findUnique({ where: { id }, include: { restaurants: true } });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const { name, email, restaurantIds } = updateCustomerDto;
    try {
      return await this.prisma.customer.update({
        where: { id },
        data: {
          name,
          email,
          restaurants: restaurantIds ? { set: restaurantIds.map((restaurantId) => ({ id: restaurantId })) } : undefined,
        },
        include: { restaurants: true },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Prisma: An operation failed because it depends on one or more records that were required but not found.
        if (e.code === "P2025") {
          throw new BadRequestException({ message: "Some restaurantIds are not valid" });
        }
      }
      throw e;
    }
  }

  async remove(id: number) {
    return this.prisma.customer.delete({ where: { id } });
  }
}
