import { Restaurant } from "@prisma/client";

export class Customer {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  restaurants: Restaurant[];
}
