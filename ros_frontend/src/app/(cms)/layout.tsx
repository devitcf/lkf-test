import Image from "next/image";
import { ReactNode, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import logo from "@/assets/images/header-logo.svg";
import NavigationMenu from "@/components/cms/NavigationMenu/NavigationMenu";

type Props = {
  children: ReactNode;
};

const CmsLayout = ({ children }: Props) => {
  return (
    <div className={"flex flex-col h-full w-full"}>
      <div className={"z-10 p-4 shadow-md w-full flex justify-center"}>
        <Image src={logo} alt={"Logo"} />
      </div>
      <div className={"flex flex-1"}>
        <NavigationMenu />
        <div className={`flex-1 overflow-auto bg-gray-50 p-6`}>
          <Suspense>{children}</Suspense>
        </div>
      </div>
      <ToastContainer theme="colored" />
    </div>
  );
};

export default CmsLayout;
