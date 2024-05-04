import { Item, Order } from "@/types";
import { Customer } from "@/types";

export type Restaurant = {
  id: number;
  name: string;
  address: string;
  cuisineType: string;
  customers: Customer[];
  items: Item[];
  orders: Order[];
};
