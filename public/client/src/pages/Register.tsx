import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { CustomForm, CustomInputFormProps } from "../form";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes/contants";
import { RegisterAsync } from "../redux/reducers/auth";
import { useAppDispatch } from "../redux/hooks";
import { RegisterReq } from "../interfaces";

const inputs: CustomInputFormProps[] = [
  {
    type: "text",
    name: "username",
    label: "User Name",
    placeholder: "User Name",
    autoComplete: "false",
    validate: { required: true },
    colProps: { xs: 12 },
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    placeholder: "Email",
    autoComplete: "false",
    validate: { required: true },
    colProps: { xs: 12 },
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "password",
    autoComplete: "false",
    validate: { required: true },
    colProps: { xs: 12 },
  },
  {
    type: "password",
    name: "newPassword",
    label: "Confirm Password",
    placeholder: "Please reenter your password",
    autoComplete: "false",
    validate: { required: true, same: "password" },
    colProps: { xs: 12 },
  },
];

const { ROOT } = ROUTES;

const Register = () => {
  //navigate
  const navigate = useNavigate();

  // dispatcher;
  const dispatch = useAppDispatch();

  //functions
  const handleRegister = (vals: RegisterReq) => {
    dispatch(RegisterAsync(vals, navigate));
  };

  const handleSignIn = () => {
    navigate(ROOT);
  };

  return (
    <Box sx={{ height: "inherit", display: "flex", justifyContent: "center" }}>
      <Grid container alignItems={"center"} justifyContent={"center"}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ padding: "40px" }}>
            <Stack spacing={2}>
              <CustomForm
                formName="form"
                inputs={inputs}
                onSubmit={handleRegister}
                submitLable={"Register"}
                resetFrom={true}
              ></CustomForm>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={1}
              >
                <Typography>Already an User ?</Typography>
                <Button onClick={() => handleSignIn()}>SignIn</Button>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
