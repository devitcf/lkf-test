import { Restaurant } from "@/types";

export type Customer = {
  id: number;
  name: string;
  email: string;
  restaurants: Restaurant[];
};

export type CustomerFormData = {
  name: string;
  email: string;
  restaurantIds: number[];
};
