import React, { useState } from "react";

import { Box } from "@mui/system";
import { Avatar, Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import GoogleIcon from "@mui/icons-material/Google";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import LoadingData from "../Shared/LoadingData/LoadingData";

const Login = () => {
  const { login, signInGooglePopup, loading } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  if (loading) {
    return <LoadingData></LoadingData>;
  }
  const handleLogin = (data) => {
    setLoginError();
    console.log(data);
    login(data.Email, data.Password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        navigate("/");
      })
      .catch((errors) => {
        console.log(errors);
        setLoginError(errors.message);
      });
  };
  const handleGoogleSignIn = () => {
    signInGooglePopup()
      .then((res) => {
        const user = res.user;
        console.log(user);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const paperStyle = {
    padding: "30px 30px",
    width: "350px",
    margin: "30px auto",
    borderRadius: "10px",
  };
  const avatarStyle = {
    bgcolor: "primary.green",
  };
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    marginTop: "10px",
  };
  const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    "& > :not(style) + :not(style)": {
      marginTop: theme.spacing(2),
    },
  }));

  return (
    <div style={{ height: "100vh", margin: "0 auto" }}>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar sx={avatarStyle}></Avatar>
            <Typography variant="h4">Login</Typography>
            <Typography variant="caption">Please fill this form to Login!</Typography>
          </Grid>
          <form style={formStyle} onSubmit={handleSubmit(handleLogin)}>
            <div>
              <TextField
                fullWidth
                label="Email"
                variant="standard"
                {...register("Email", { required: "Email Address is required" })}
                placeholder="Enter Your Email Address"
              ></TextField>
              {errors.Email?.type === "required" && (
                <Typography sx={{ padding: 0, margin: 0, color: "red" }} role="alert">
                  {errors.Email?.message}
                </Typography>
              )}
            </div>
            <div>
              <TextField
                fullWidth
                variant="standard"
                label="Password"
                {...register("Password", { required: "Password Address is required" })}
                placeholder="Choose Password"
              ></TextField>
              {errors.Password && (
                <Typography sx={{ padding: 0, margin: 0, color: "red" }} role="alert">
                  {errors.Password?.message}
                </Typography>
              )}
            </div>
            <Button type="submit" variant="contained" sx={{ color: "primary.light" }}>
              Sign Up
            </Button>
            <div>{loginError && <p>{loginError}</p>}</div>
          </form>
          <Box style={{ margin: "10px" }} alignItems="center">
            <Root>
              <Typography>
                {" "}
                Don't have an account?{" "}
                <Link to="/signup" style={{ color: "green", textDecoration: "none", fontWeight: "bold" }}>
                  Sign Up
                </Link>
              </Typography>

              <Divider>OR</Divider>
              <Button fullWidth onClick={handleGoogleSignIn}>
                <GoogleIcon style={{ fontSize: "40px" }}></GoogleIcon>
              </Button>
            </Root>
          </Box>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
