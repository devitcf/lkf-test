"use server";
import { Order, ErrorResponse, CreateOrderData, UpdateOrderData } from "@/types";
import { createOrder, removeOrder, updateOrder } from "@/api/orders";

export const createOrderAction = async (data: CreateOrderData): Promise<Order | ErrorResponse> => {
  return createOrder(data);
};

export const updateOrderAction = async (orderId: number, data: UpdateOrderData): Promise<Order | ErrorResponse> => {
  return updateOrder(orderId, data);
};

export const removeOrderAction = async (orderId: number): Promise<boolean | ErrorResponse> => {
  return removeOrder(orderId);
};
