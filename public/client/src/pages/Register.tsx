import React from "react";
import { CustomForm, CustomInputFormProps } from "../components/form";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import { regiserRoutes } from "../utils/APIRoutes";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes/constants";

const inputs: CustomInputFormProps[] = [
  {
    type: "text",
    name: "username",
    label: "User Name",
    placeholder: "User Name",
    validate: { required: true },
    colProps: { xs: 12 },
  },
  {
    type: "text",
    name: "email",
    label: "Email",
    placeholder: "Email",
    validate: { required: true },
    colProps: { xs: 12 },
  },
  {
    type: "password",
    name: "loginPassword",
    label: "Password",
    placeholder: "password",
    validate: { required: true },
    colProps: { xs: 12 },
  },
  {
    type: "password",
    name: "newPassword",
    label: "Confirm Password",
    placeholder: "Please reenter your password",
    validate: { required: true, same: "loginPassword" },
    colProps: { xs: 12 },
  },
];

const Register = () => {
  const navigate = useNavigate();

  const { AUTH } = ROUTES;

  const handleRegister = async (vals: any) => {
    try {
      const { data } = await axios.post(regiserRoutes, vals);
      if (data.status) {
        enqueueSnackbar(data.msg, {
          variant: "success",
        });
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate(AUTH.ROOT);
      } else {
        enqueueSnackbar(data.msg, {
          variant: "error",
        });
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  const handleSignIn = () => {
    navigate(AUTH.ROOT);
  };

  return (
    <Grid container alignItems={"center"} justifyContent={"center"}>
      <Grid item xs={5}>
        <Paper sx={{ padding: "40px" }}>
          <Stack spacing={2}>
            <CustomForm
              formName="form"
              inputs={inputs}
              onSubmit={handleRegister}
              submitLable={"login"}
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
  );
};

export default Register;
