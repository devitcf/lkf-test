import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("customers")
@UseGuards(AuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  async findAll() {
    return this.customerService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const user = await this.customerService.findOne(+id);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Patch(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    // Confirm the entity exist before deleting
    const customer = await this.customerService.findOne(id);
    if (!customer) throw new NotFoundException();

    return this.customerService.remove(+id);
  }
}
