import Image from "next/image";
import LoginForm from "@/components/login/LoginForm";
import lanternImage from "@/assets/images/lanterns-rz-1-scaled.jpg";

const LoginPage = () => {
  return (
    <div className={`flex h-screen w-full`}>
      <div className={`relative hidden w-3/5 lg:block`}>
        <Image className={`object-cover`} src={lanternImage} alt="lkf" sizes="100vw" fill />
        <div className={"absolute bottom-10 left-10 text-5xl text-white uppercase w-0 drop-shadow-lg"}>
          Restaurant Ordering System
        </div>
      </div>
      <div className={`flex flex-1 items-center justify-center`}>
        <LoginForm />
      </div>
    </div>
  );
};
export default LoginPage;
