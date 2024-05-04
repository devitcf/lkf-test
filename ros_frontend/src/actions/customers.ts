"use server";
import { CustomerFormData, Customer, ErrorResponse } from "@/types";
import { createCustomer, removeCustomer, updateCustomer } from "@/api/customers";

export const createCustomerAction = async (data: CustomerFormData): Promise<Customer | ErrorResponse> => {
  return createCustomer(data);
};

export const updateCustomerAction = async (
  customerId: number,
  data: CustomerFormData
): Promise<Customer | ErrorResponse> => {
  return updateCustomer(customerId, data);
};

export const removeCustomerAction = async (customerId: number): Promise<boolean | ErrorResponse> => {
  return removeCustomer(customerId);
};
