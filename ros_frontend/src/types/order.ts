import { OrderItem } from "@/types";
import { Customer } from "@/types";
import { Restaurant } from "@/types";

export type Order = {
  id: number;
  totalPrice: number;
  customerId: number;
  customer: Customer;
  restaurantId: number;
  restaurant: Restaurant;
  orderItems: OrderItem[];
  createdAt: Date;
};
