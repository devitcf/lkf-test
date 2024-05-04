import { getCustomers } from "@/api/customers";
import { getRestaurants } from "@/api/restaurants";
import CustomerPage from "@/components/cms/customers/CustomerPage";

const Page = async () => {
  const [customers, restaurants] = await Promise.all([getCustomers(), getRestaurants()]);

  return <CustomerPage customers={customers} restaurants={restaurants} />;
};

export default Page;
