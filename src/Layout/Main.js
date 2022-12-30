import { Box, Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
  return (
    <Box>
      <Container>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
      </Container>
    </Box>
  );
};

export default Main;
