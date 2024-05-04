import { fetchRequestWithAuth, logApiError } from "@/helper/api";
import { Restaurant } from "@/types";

export const getRestaurants = async (): Promise<Restaurant[]> => {
  let customers: Restaurant[] = [];
  try {
    const url = `${process.env.API_SERVER_URL}/restaurants`;
    customers = await fetchRequestWithAuth<Restaurant[]>(url);
  } catch (e) {
    logApiError("getRestaurants", e as Error);
  }
  return customers;
};
