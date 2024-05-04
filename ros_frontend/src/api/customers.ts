import { fetchRequestWithAuth, logApiError, postRequestWithAuth } from "@/helper/api";
import { CustomerFormData, Customer, ErrorResponse } from "@/types";
import { redirect } from "next/navigation";

const apiUrl = `${process.env.API_SERVER_URL}/customers`;

export const getCustomers = async (): Promise<Customer[]> => {
  let customers: Customer[] = [];
  try {
    const res = await fetchRequestWithAuth<Customer[] | ErrorResponse>(apiUrl);
    if ("error" in res) {
      if (res.statusCode === 401) redirect("/");
    } else {
      customers = res;
    }
  } catch (e) {
    logApiError("getCustomers", e as Error);
  }
  return customers;
};

export const createCustomer = async (data: CustomerFormData): Promise<Customer | ErrorResponse> => {
  return postRequestWithAuth<Customer | ErrorResponse>(apiUrl, data);
};

export const updateCustomer = async (customerId: number, data: CustomerFormData): Promise<Customer | ErrorResponse> => {
  return postRequestWithAuth<Customer | ErrorResponse>(`${apiUrl}/${customerId}`, data, "PATCH");
};

export const removeCustomer = async (customerId: number): Promise<boolean | ErrorResponse> => {
  return postRequestWithAuth<boolean | ErrorResponse>(`${apiUrl}/${customerId}`, undefined, "DELETE");
};
