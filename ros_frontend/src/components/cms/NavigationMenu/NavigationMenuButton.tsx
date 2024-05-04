"use client";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenuItem } from "@/types";

type Props = {
  menuItem: NavigationMenuItem;
};

const NavigationMenuButton = ({ menuItem }: Props) => {
  const pathname = usePathname();
  const selected = pathname === menuItem.url;
  const wrapperBgClass = selected ? "bg-success" : "bg-white";
  const textClass = selected ? "text-white" : "text-black";

  let icon;
  switch (menuItem.type) {
    case "customers":
      icon = <PeopleOutlineIcon />;
      break;
    case "restaurants":
      icon = <StorefrontOutlinedIcon />;
      break;
    case "items":
      icon = <FastfoodOutlinedIcon />;
      break;
    case "orders":
      icon = <ReceiptOutlinedIcon />;
      break;
  }

  return (
    <Link key={menuItem.type} href={menuItem.url}>
      <div
        className={`rounded-md py-2 px-2 md:px-4 flex items-center gap-8 transition-all duration-200 ${wrapperBgClass}`}
      >
        <div className={`${textClass} transition-all duration-200`}>{icon}</div>
        <div className={`${textClass} font-bold transition-all duration-200 uppercase hidden md:block`}>
          {menuItem.label}
        </div>
      </div>
    </Link>
  );
};

export default NavigationMenuButton;
