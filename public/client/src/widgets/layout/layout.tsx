import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { Header } from "./header";
export const Layout: React.FC = () => {
  return (
    <Box>
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: "80vh",
          position: "relative",
          padding: "0px !important",
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};
