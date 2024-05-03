import { ReactNode } from "react";
import NavigationMenu from "@/components/cms/NavigationMenu";
import Image from "next/image";
import logo from "@/assets/images/header-logo.svg";

type Props = {
  children: ReactNode;
};

const CmsLayout = ({ children }: Props) => {
  return (
    <div className={"flex flex-col h-screen w-full"}>
      <div className={"p-4 shadow-lg w-full flex justify-center"}>
        <Image src={logo} alt={"Logo"} />
      </div>
      <div className={"flex flex-1"}>
        <NavigationMenu />
        <div className={`flex-1 overflow-auto bg-gray-50 p-6`}>{children}</div>
      </div>
    </div>
  );
};

export default CmsLayout;
