import { fetchRequestWithAuth, logApiError } from "@/helper";
import { Customer } from "@/types";

export const getCustomers = async (): Promise<Customer[]> => {
  let customers: Customer[] = [];
  try {
    const url = `${process.env.API_SERVER_URL}/customers`;
    customers = await fetchRequestWithAuth<Customer[]>(url);
    console.log(customers);
  } catch (e) {
    logApiError("getCustomers", e as Error);
  }
  return customers;
};
