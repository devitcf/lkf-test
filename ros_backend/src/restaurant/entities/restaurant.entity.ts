import { Customer, Item } from "@prisma/client";

export class Restaurant {
  id: number;
  name: string;
  address: string;
  cuisineType: string;
  createdAt: Date;
  updatedAt: Date;
  customers: Customer[];
  items: Item[];
}
