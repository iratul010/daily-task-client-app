import { Button, Stack, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import header from "../../../assets/header.png";
const Banner = () => {
  const BannerWrapper = styled(Box)(({ theme }) => ({
    height: "75vh",
    backgroundColor: " rgba(11, 156,49, 0.1)",
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 90%)",
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }));
  return (
    <BannerWrapper>
      <Stack color="#333" spacing={4}>
        <Typography variant="h3">
          We Witness, <br /> Your Daily Tasks.
        </Typography>
        <Typography variant="h5" sx={{ width: "100%" }}>
          'William Osler'-"We are here to add what we can to life, not to get what we can from life."
        </Typography>
        <Button style={{ width: "30%" }} variant="contained">
          Task Show
        </Button>
      </Stack>
      <Box style={{ width: "60% " }}>
        <img src={header} alt="task" style={{ width: "100%" }} />
      </Box>
    </BannerWrapper>
  );
};

export default Banner;
