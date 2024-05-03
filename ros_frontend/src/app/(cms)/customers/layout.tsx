import { getCustomers } from "@/api/customers";
import CustomerPage from "@/app/(cms)/customers/page";

const CustomerLayout = async () => {
  const customers = await getCustomers();

  return <CustomerPage customers={customers} />;
};

export default CustomerLayout;
