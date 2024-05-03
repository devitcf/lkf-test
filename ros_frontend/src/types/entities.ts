export type Customer = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  restaurants: Restaurant[];
};

export type Restaurant = {
  id: number;
  name: string;
  address: string;
  cuisineType: string;
  createdAt: Date;
  updatedAt: Date;
  customers: Customer[];
  items: Item[];
  orders: Order[];
};

export type Item = {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  restaurantId: number;
  restaurant: Restaurant;
};

export type Order = {
  id: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  customerId: number;
  customer: Customer;
  restaurantId: number;
  restaurant: Restaurant;
  orderItems: OrderItem[];
};

export type OrderItem = {
  id: number;
  itemId: number;
  item: Item;
  orderId: number;
  order: Order;
  createdAt: Date;
  updatedAt: Date;
};
