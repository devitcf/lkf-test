import { getItemss } from "@/api/item";
import { getRestaurants } from "@/api/restaurants";
import ItemPage from "@/components/cms/items/ItemPage";

const Page = async () => {
  const [items, restaurants] = await Promise.all([getItemss(), getRestaurants()]);

  return <ItemPage items={items} restaurants={restaurants} />;
};

export default Page;
