"use server";
import { ItemFormData, Item, ErrorResponse } from "@/types";
import { createItem, removeItem, updateItem } from "@/api/item";

export const createItemAction = async (data: ItemFormData): Promise<Item | ErrorResponse> => {
  return createItem(data);
};

export const updateItemAction = async (itemId: number, data: ItemFormData): Promise<Item | ErrorResponse> => {
  return updateItem(itemId, data);
};

export const removeItemAction = async (itemId: number): Promise<boolean | ErrorResponse> => {
  return removeItem(itemId);
};
