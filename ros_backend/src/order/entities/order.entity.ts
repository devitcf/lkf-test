import { Customer, OrderItem, Restaurant } from "@prisma/client";

export class Order {
  id: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  customerId: number;
  customer: Customer;
  restaurantId: number;
  restaurant: Restaurant;
  orderItems: OrderItem[];
}
