"use client";
import { NavigationMenuItem } from "@/types";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      icon = <PeopleOutlineIcon role="img" aria-label="People Outline Icon" />;
      break;
    case "restaurants":
      icon = <StorefrontOutlinedIcon role="img" aria-label="Store front Outline Icon" />;
      break;
    case "items":
      icon = <FastfoodOutlinedIcon role="img" aria-label="Fast food Outline Icon" />;
      break;
    case "orders":
      icon = <ReceiptOutlinedIcon role="img" aria-label="Receipt Outline Icon" />;
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
