import { fetchRequestWithAuth, logApiError, postRequestWithAuth } from "@/helper/api";
import { RestaurantFormData, ErrorResponse, Restaurant } from "@/types";
import { redirect } from "next/navigation";

const apiUrl = `${process.env.API_SERVER_URL}/restaurants`;

export const getRestaurants = async (): Promise<Restaurant[]> => {
  let restaurants: Restaurant[] = [];
  try {
    const res = await fetchRequestWithAuth<Restaurant[] | ErrorResponse>(apiUrl);
    if ("error" in res) {
      if (res.statusCode === 401) redirect("/");
    } else {
      restaurants = res;
    }
  } catch (e) {
    logApiError("getRestaurants", e as Error);
  }
  return restaurants;
};

export const createRestaurant = async (data: RestaurantFormData): Promise<Restaurant | ErrorResponse> => {
  return postRequestWithAuth<Restaurant | ErrorResponse>(apiUrl, data);
};

export const updateRestaurant = async (
  userId: number,
  data: RestaurantFormData
): Promise<Restaurant | ErrorResponse> => {
  return postRequestWithAuth<Restaurant | ErrorResponse>(`${apiUrl}/${userId}`, data, "PATCH");
};

export const removeRestaurant = async (userId: number): Promise<boolean | ErrorResponse> => {
  return postRequestWithAuth<boolean | ErrorResponse>(`${apiUrl}/${userId}`, undefined, "DELETE");
};
