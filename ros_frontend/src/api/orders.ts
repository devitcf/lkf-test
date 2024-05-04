import { fetchRequestWithAuth, logApiError, postRequestWithAuth } from "@/helper/api";
import { ErrorResponse, Order, CreateOrderData, UpdateOrderData } from "@/types";
import { redirect } from "next/navigation";

const apiUrl = `${process.env.API_SERVER_URL}/orders`;

export const getOrders = async (): Promise<Order[]> => {
  let orders: Order[] = [];
  try {
    const res = await fetchRequestWithAuth<Order[] | ErrorResponse>(apiUrl);
    if ("error" in res) {
      if (res.statusCode === 401) redirect("/");
    } else {
      orders = res;
    }
  } catch (e) {
    logApiError("getOrders", e as Error);
  }
  return orders;
};

export const createOrder = async (data: CreateOrderData): Promise<Order | ErrorResponse> => {
  return postRequestWithAuth<Order | ErrorResponse>(apiUrl, data);
};

export const updateOrder = async (orderId: number, data: UpdateOrderData): Promise<Order | ErrorResponse> => {
  return postRequestWithAuth<Order | ErrorResponse>(`${apiUrl}/${orderId}`, data, "PATCH");
};

export const removeOrder = async (orderId: number): Promise<boolean | ErrorResponse> => {
  return postRequestWithAuth<boolean | ErrorResponse>(`${apiUrl}/${orderId}`, undefined, "DELETE");
};
