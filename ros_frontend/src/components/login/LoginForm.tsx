"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { loginAction } from "@/actions";

const LoginForm = () => {
  const usernameInput = useRef<HTMLInputElement>();
  const passInput = useRef<HTMLInputElement>();
  const [username, setUsername] = useState({ error: false, value: "" });
  const [password, setPassword] = useState({ error: false, value: "" });
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

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
      router.push("/");
    }
  };

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Restaurant Ordering System
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <TextField
            id="username"
            label="Username"
            autoComplete="off"
            sx={{ mb: 3 }}
            error={username.error}
            value={username.value}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && passInput.current?.focus()}
            inputRef={usernameInput}
            fullWidth
            autoFocus
          />
          <TextField
            id="password"
            label="Password"
            autoComplete="off"
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
            variant="contained"
            color="warning"
            sx={{ mt: 3, padding: 2 }}
            onClick={handleSubmit}
            fullWidth
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <ToastContainer theme={"colored"} />
    </Grid>
  );
};

export default LoginForm;
