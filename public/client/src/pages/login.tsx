import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { CustomForm, CustomInputFormProps } from "../form";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes/contants";
import { LoginReq } from "../interfaces";
import { useAppDispatch } from "../redux/hooks";
import { LoginAsync } from "../redux/reducers/auth";

const inputs: CustomInputFormProps[] = [
  {
    type: "email",
    name: "email",
    label: "Email",
    placeholder: "Email",
    validate: { required: true },
    autoComplete: "false",
    colProps: { xs: 12 },
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "password",
    validate: { required: true },
    colProps: { xs: 12 },
  },
];

const { GUEST } = ROUTES;

const Login = () => {
  //navigate
  const navigate = useNavigate();

  // dispatcher;
  const dispatch = useAppDispatch();

  //functions
  const handleSignUp = () => {
    navigate(GUEST.REGISTER);
  };

  const handleSignIn = (vals: LoginReq) => {
    dispatch(LoginAsync(vals, navigate));
  };

  return (
    <Box sx={{ height: "inherit", display: "flex", justifyContent: "center" }}>
      <Grid container alignItems={"center"} justifyContent={"center"}>
        <Grid item xs={5}>
          <Paper sx={{ padding: "40px" }}>
            <Stack spacing={2}>
              <CustomForm
                formName="form"
                inputs={inputs}
                onSubmit={handleSignIn}
                submitLable={"login"}
              ></CustomForm>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={1}
              >
                <Typography>Dont have an account ?</Typography>
                <Button onClick={() => handleSignUp()}>Register</Button>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
