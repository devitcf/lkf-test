import { Item } from "@/types";
import { Order } from "@/types";

export type OrderItem = {
  id: number;
  itemId: number;
  item: Item;
  orderId: number;
  order: Order;
};
