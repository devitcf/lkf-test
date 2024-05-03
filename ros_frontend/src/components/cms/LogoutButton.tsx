"use client";
import { Button } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { logoutAction } from "@/actions";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const onClick = async () => {
    await logoutAction();
    router.refresh();
  };

  return (
    <>
      <Button
        onClick={onClick}
        sx={{ paddingLeft: 1, paddingRight: 1, minWidth: 0, width: { xs: 40, sm: "100%" } }}
        variant="outlined"
      >
        <LogoutOutlinedIcon role="img" aria-label="Logout Outline Icon" />
        <span className={"hidden md:block"}>Log out</span>
      </Button>
    </>
  );
};

export default LogoutButton;
