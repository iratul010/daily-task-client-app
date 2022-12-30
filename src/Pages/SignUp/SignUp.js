import styled from "@emotion/styled";
import { Avatar, Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import LoadingData from "../Shared/LoadingData/LoadingData";
const SignUp = () => {
  const { createUser, signInGooglePopup, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [signInError, setSignInError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignUp = (data) => {
    setSignInError("");
    console.log(data);

    console.log(data.Email, data.Password);
    createUser(data.Email, data.Password)
      .then((res) => {
        const user = res.user;
        navigate("/");
        console.log(user);
      })
      .catch((errors) => {
        setSignInError(errors);
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
  if (loading) {
    return <LoadingData></LoadingData>;
  }
  const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    "& > :not(style) + :not(style)": {
      marginTop: theme.spacing(2),
    },
  }));
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

  return (
    <div style={{ height: "100vh", margin: "0 auto" }}>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar sx={avatarStyle}></Avatar>
            <Typography variant="h4">Sign Up</Typography>
            <Typography variant="caption">Please fill this form to create an account!</Typography>
          </Grid>
          <form style={formStyle} onSubmit={handleSubmit(handleSignUp)}>
            <div>
              <TextField
                fullWidth
                label="Name"
                variant="standard"
                {...register("Name", { required: "Name is required" })}
                placeholder="Enter Your Full Name"
              ></TextField>
              {errors.Name?.type === "required" && (
                <Typography sx={{ padding: 0, margin: 0, color: "red" }} role="alert">
                  {errors.Name?.message}
                </Typography>
              )}
            </div>
            <div>
              <TextField
                fullWidth
                variant="standard"
                label="Email"
                {...register("Email", { required: "Email Address is required" })}
                placeholder="Enter Your Email Address"
              ></TextField>
              {errors.Email && (
                <Typography sx={{ padding: 0, margin: 0, color: "red" }} role="alert">
                  Email Address is required
                </Typography>
              )}
            </div>
            <div>
              <TextField
                fullWidth
                variant="standard"
                label="Password"
                {...register("Password", {
                  required: "Password  is required",
                  minLength: { value: 6, message: "Password must be 6 characters or Longer!" },
                  pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, message: "Password must be strong!" },
                })}
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
          </form>
          <Box style={{ margin: "10px" }} alignItems="center">
            <Root>
              <Typography>
                {" "}
                Already have an account?{" "}
                <Link to="/login" style={{ color: "green", textDecoration: "none", fontWeight: "bold" }}>
                  Login
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

export default SignUp;
