"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Container, IconButton, InputAdornment, InputLabel, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  onLogin?: (email: string, pass: string) => Promise<boolean>;
  onLoginSuccess?: () => void;
};

const LoginForm = ({ onLogin, onLoginSuccess }: Props) => {
  const emailInput = useRef<HTMLInputElement>();
  const passInput = useRef<HTMLInputElement>();
  const [email, setEmail] = useState({ error: false, value: "" });
  const [pass, setPass] = useState({ error: false, value: "" });
  const [showPass, setShowPass] = useState(false);

  const handleChange = (value: string, type = "email"): void => {
    if (type === "email") {
      setEmail({ error: false, value });
      setPass({ ...pass, error: false });
    } else {
      setPass({ error: false, value });
      setEmail({ ...email, error: false });
    }
  };

  const handleSubmit = async (): Promise<void> => {
    let emailError = email.value.length === 0;
    let passError = pass.value.length === 0;
    if (passError) {
      setPass({ ...pass, error: true });
      passInput.current?.focus();
    }
    if (emailError) {
      setEmail({ ...email, error: true });
      emailInput.current?.focus();
    }
    if (emailError || passError) return;
    if (await onLogin?.(email.value, pass.value)) {
      onLoginSuccess?.();
    } else {
      setEmail({ ...email, error: true });
      setPass({ ...pass, error: true });
      toast.error("Incorrect credentials");
    }
  };

  useEffect(() => {
    emailInput.current?.focus();
  }, []);

  return (
    <Container data-testid="LoginForm" className={`relative flex h-full w-full flex-col justify-center`} maxWidth="sm">
      <div className={"opacity-100 lg:opacity-0 mb-12 text-4xl transition-opacity"}>Restaurant Ordering System</div>
      <InputLabel htmlFor="username" className={"text-xl"}>
        Username
      </InputLabel>
      <TextField
        id="username"
        autoComplete="off"
        classes={{
          root: `mb-6`,
        }}
        error={email.error}
        value={email.value}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && passInput.current?.focus()}
        inputRef={emailInput}
        fullWidth
      />
      <InputLabel htmlFor="password" className={`text-xl`}>
        Password
      </InputLabel>
      <TextField
        id="password"
        autoComplete="off"
        classes={{
          root: `mb-6`,
        }}
        error={pass.error}
        value={pass.value}
        onChange={(e) => handleChange(e.target.value, "pass")}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        inputRef={passInput}
        InputProps={{
          type: showPass ? "text" : "password",
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                data-testid="toggleBtn"
                aria-label="Toggle password visibility"
                tabIndex={-1}
                onClick={() => setShowPass(!showPass)}
                edge="end"
              >
                {showPass ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
      />
      <Button
        aria-label="submit"
        color="warning"
        className={`mt-6 p-3 text-lg text-white`}
        onClick={handleSubmit}
        variant="contained"
        fullWidth
      >
        Login
      </Button>
      <ToastContainer theme={"colored"} />
    </Container>
  );
};

export default LoginForm;
