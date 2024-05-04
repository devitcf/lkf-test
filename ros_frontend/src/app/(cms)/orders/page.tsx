import { getCustomers } from "@/api/customers";
import { getOrders } from "@/api/orders";
import { getRestaurants } from "@/api/restaurants";
import OrderPage from "@/components/cms/orders/OrderPage";

const Page = async () => {
  const [orders, customers, restaurants] = await Promise.all([getOrders(), getCustomers(), getRestaurants()]);

  return <OrderPage orders={orders} customers={customers} restaurants={restaurants} />;
};

export default Page;
