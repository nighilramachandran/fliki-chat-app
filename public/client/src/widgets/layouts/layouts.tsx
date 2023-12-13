import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./header";

const Layouts = () => {
  return (
    <Box>
      <Header />
      <Container
        sx={{
          height: `calc(100vh - 80px)`,
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layouts;
