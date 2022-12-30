import styled from "@emotion/styled";
import ArticleIcon from "@mui/icons-material/Article";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const AddTasks = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
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
  const handleAddToTasks = (data) => {
    console.log(data);
    console.log("user", user);
    const tasksDetails = {
      name: data.Email,
      email: data.Email,
      text: data.Text,
    };
    console.log("tasksDetails", tasksDetails);
    // https://daily-tasks-server-app.vercel.app
    fetch("https://daily-tasks-server-app.vercel.app/addtasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tasksDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      <Typography> Add Tasks</Typography>
      <div style={{ height: "100vh", margin: "0 auto" }}>
        <Grid>
          <Paper elevation={20} style={paperStyle}>
            <Grid align="center">
              <Avatar sx={avatarStyle}>
                <ArticleIcon></ArticleIcon>
              </Avatar>
              <Typography variant="h4">Your Tasks</Typography>
              <Typography variant="caption">Please fill this form for your Your Tasks</Typography>
            </Grid>
            <form style={formStyle} onSubmit={handleSubmit(handleAddToTasks)}>
              <div>
                <TextField
                  fullWidth
                  label="Name"
                  defaultValue={user?.displayName}
                  variant="standard"
                  {...register("Name")}
                  placeholder="Enter Your Email Address"
                ></TextField>
              </div>
              <div>
                <TextField
                  fullWidth
                  label="Email"
                  defaultValue={user?.email}
                  variant="standard"
                  {...register("Email", { required: "Email Address is required" })}
                ></TextField>
              </div>
              <div>
                <TextField
                  type="text"
                  fullWidth
                  variant="standard"
                  label="text"
                  {...register("Text")}
                  placeholder="text here"
                ></TextField>
              </div>

              {/* <div>
                <TextField
                  type="image"
                  fullWidth
                  variant="standard"
                  label="Upload Image"
                  {...register("Image", { required: "Image is required" })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="upload"></IconButton>
                    </InputAdornment>
                  }
                  placeholder="Choose Image File"
                ></TextField>
              </div> */}

              {/* <div>
                {" "}
                <InputLabel htmlFor="upload-script">Sim Script</InputLabel>
                <TextField
                  fullWidth
                  variant="standard"
                  type="file"
                  //   onChange={() => handleChange("script")}
                  {...register("Image", { required: "Image is required" })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="upload"></IconButton>
                    </InputAdornment>
                  }
                ></TextField>
              </div> */}
              <Button type="submit" variant="contained" sx={{ color: "primary.light" }}>
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
      </div>
    </div>
  );
};

export default AddTasks;
