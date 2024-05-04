import { fetchRequestWithAuth, logApiError, postRequestWithAuth } from "@/helper/api";
import { ItemFormData, ErrorResponse, Item } from "@/types";
import { redirect } from "next/navigation";

const apiUrl = `${process.env.API_SERVER_URL}/items`;

export const getItemss = async (): Promise<Item[]> => {
  let items: Item[] = [];
  try {
    const res = await fetchRequestWithAuth<Item[] | ErrorResponse>(apiUrl);
    if ("error" in res) {
      if (res.statusCode === 401) redirect("/");
    } else {
      items = res;
    }
  } catch (e) {
    logApiError("getCustomers", e as Error);
  }
  return items;
};

export const createItem = async (data: ItemFormData): Promise<Item | ErrorResponse> => {
  return postRequestWithAuth<Item | ErrorResponse>(apiUrl, data);
};

export const updateItem = async (itemId: number, data: ItemFormData): Promise<Item | ErrorResponse> => {
  return postRequestWithAuth<Item | ErrorResponse>(`${apiUrl}/${itemId}`, data, "PATCH");
};

export const removeItem = async (itemId: number): Promise<boolean | ErrorResponse> => {
  return postRequestWithAuth<boolean | ErrorResponse>(`${apiUrl}/${itemId}`, undefined, "DELETE");
};
