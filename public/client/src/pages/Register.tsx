import React, { useState } from "react";
import { CustomForm, CustomInputFormProps } from "../components/form";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import { regiserRoutes } from "../utils/APIRoutes";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes/constants";
import { useAppDispatch } from "../redux/hooks";
import { RegisterAsync } from "../redux/reducers/auth";

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
    type: "email",
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
  //navigate
  const navigate = useNavigate();

  //dispatcher
  const dispatch = useAppDispatch();

  //routes
  const { ROOT } = ROUTES;

  //functions
  const handleRegister = async (vals: any) => {
    dispatch(RegisterAsync(vals, navigate));
  };

  const handleSignIn = () => {
    navigate(ROOT);
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
              submitLable={"Register"}
              // status={load ? "loading" : "nothing"}
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
