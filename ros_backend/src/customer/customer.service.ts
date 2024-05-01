import { Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    // TODO: restaurantIds
    const { name, email } = createCustomerDto;
    return this.prisma.customer.create({ data: { name, email } });
  }

  async findAll() {
    return this.prisma.customer.findMany({ include: { restaurants: true } });
  }

  async findOne(id: number) {
    return this.prisma.customer.findUnique({ where: { id }, include: { restaurants: true } });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    // TODO: restaurantIds
    const { name, email } = updateCustomerDto;
    return this.prisma.customer.update({
      where: { id },
      data: { name, email },
    });
  }

  async remove(id: number) {
    return this.prisma.customer.delete({ where: { id } });
  }
}
