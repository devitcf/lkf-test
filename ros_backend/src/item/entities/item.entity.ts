import { Restaurant } from "@prisma/client";

export class Item {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  restaurant: Restaurant;
}
