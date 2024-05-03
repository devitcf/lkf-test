"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Container, IconButton, InputAdornment, InputLabel, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { loginAction } from "@/actions";

const LoginForm = () => {
  const usernameInput = useRef<HTMLInputElement>();
  const passInput = useRef<HTMLInputElement>();
  const [username, setUsername] = useState({ error: false, value: "" });
  const [password, setPassword] = useState({ error: false, value: "" });
  const [showPass, setShowPass] = useState(false);

  const handleChange = (value: string, type = "username"): void => {
    if (type === "username") {
      setUsername({ error: false, value });
      setPassword({ ...password, error: false });
    } else {
      setPassword({ error: false, value });
      setUsername({ ...username, error: false });
    }
  };

  const handleSubmit = async (): Promise<void> => {
    let usernameError = username.value.length === 0;
    let passError = password.value.length === 0;
    if (passError) {
      setPassword({ ...password, error: true });
      passInput.current?.focus();
    }
    if (usernameError) {
      setUsername({ ...username, error: true });
      usernameInput.current?.focus();
    }
    if (usernameError || passError) return;

    if (!(await loginAction(username.value, password.value))) {
      setUsername({ ...username, error: true });
      setPassword({ ...password, error: true });
      toast.error("Incorrect credentials");
    } else {
      toast.success("Login successful");
    }
  };

  useEffect(() => {
    usernameInput.current?.focus();
  }, []);

  return (
    <Container data-testid="LoginForm" className={`relative flex h-full w-full flex-col justify-center`} maxWidth="sm">
      <div className={"text-center opacity-100 lg:opacity-0 mb-12 text-3xl uppercase"}>Restaurant Ordering System</div>
      <InputLabel htmlFor="username" className={"text-xl"}>
        Username
      </InputLabel>
      <TextField
        id="username"
        autoComplete="off"
        classes={{
          root: `mb-6`,
        }}
        error={username.error}
        value={username.value}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && passInput.current?.focus()}
        inputRef={usernameInput}
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
        error={password.error}
        value={password.value}
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
