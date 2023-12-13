import { AppBar, Box, Button, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { LogOutAsync } from "../../redux/reducers/auth";

const Header = () => {
  // dispatcher;
  const dispatch = useAppDispatch();

  //navigate
  const navigate = useNavigate();

  const { isAuth, user } = useAppSelector((state) => state.Auth);

  const handleLogout = () => {
    // sessionStorage.removeItem("chat-app-user");
    dispatch(LogOutAsync({ email: user.email }, navigate));
    // dispatch(setIsAuth(false));
    // dispatch(ResetsUser({ _id: "", username: "", email: "", isOnline: false }));
  };

  return (
    <AppBar
      sx={{
        position: "sticky",
        bgcolor: "background.header",
        borderRadius: 0,
        height: "80px",
        justifyContent: "center",
      }}
    >
      <Box sx={{ marginLeft: "auto" }}>
        <Stack direction={"row"} spacing={2}>
          {/* <Avatar
                sx={{
                  background: "transparent",
                  border: "1px solid #fc9915",
                  color: "#fc9915",
                }}
              >
                {avatarName.charAt(0).toUpperCase()}
              </Avatar> */}
          {isAuth && (
            <Button
              onClick={() => handleLogout()}
              variant="contained"
              sx={{ color: "white" }}
            >
              Log out
            </Button>
          )}
        </Stack>
      </Box>
    </AppBar>
  );
};

export default Header;
