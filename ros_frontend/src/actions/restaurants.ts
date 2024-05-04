"use server";
import { RestaurantFormData, Restaurant, ErrorResponse } from "@/types";
import { createRestaurant, removeRestaurant, updateRestaurant } from "@/api/restaurants";

export const createRestaurantAction = async (data: RestaurantFormData): Promise<Restaurant | ErrorResponse> => {
  return createRestaurant(data);
};

export const updateRestaurantAction = async (
  userId: number,
  data: RestaurantFormData
): Promise<Restaurant | ErrorResponse> => {
  return updateRestaurant(userId, data);
};

export const removeRestaurantAction = async (userId: number): Promise<boolean | ErrorResponse> => {
  return removeRestaurant(userId);
};
