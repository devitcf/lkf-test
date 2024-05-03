import NavigationMenuButton from "@/components/cms/NavigationMenuButton";
import LogoutButton from "@/components/cms/LogoutButton";
import { NavigationMenuItem } from "@/types";

const menuItems: NavigationMenuItem[] = ["customers", "restaurants", "items", "orders"].map((item) => ({
  type: item,
  label: item,
  url: `/${item}`,
}));

const NavigationMenu = () => {
  return (
    <div data-testid="MainMenu" className={`flex h-full flex-col bg-white gap-6 p-6 shadow-md`}>
      <div className={"flex flex-1 flex-col gap-4 w-fit md:w-64"}>
        {menuItems.map((item) => (
          <NavigationMenuButton key={item.type} menuItem={item} />
        ))}
      </div>
      <LogoutButton />
    </div>
  );
};

export default NavigationMenu;
