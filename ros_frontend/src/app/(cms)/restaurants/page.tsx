import { getRestaurants } from "@/api/restaurants";
import RestaurantPage from "@/components/cms/restaurants/RestaurantPage";

const Page = async () => {
  const restaurants = await getRestaurants();

  return <RestaurantPage restaurants={restaurants} />;
};

export default Page;
