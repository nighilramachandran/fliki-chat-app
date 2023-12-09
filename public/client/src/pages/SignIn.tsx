import React, { useState } from "react";
import { CustomForm, CustomInputFormProps } from "../components/form";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes/constants";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { loginRoutes } from "../utils/APIRoutes";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { LoginAsync } from "../redux/reducers/auth";
import { LoginReq } from "../interfaces/Auth";

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

const { ROOT, GUEST, AUTH } = ROUTES;

const SignIn = () => {
  //navigate
  const navigate = useNavigate();

  //dispatcher
  const dispatch = useAppDispatch();

  //selectors
  const { status } = useAppSelector((state: RootState) => state.Auth);

  //functions
  const handleSignUp = () => {
    navigate(GUEST.REGISTER);
  };

  const handleSignIn = async (vals: LoginReq) => {
    dispatch(LoginAsync(vals, navigate));
  };

  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={5}>
        <Paper sx={{ padding: "40px" }}>
          <Stack spacing={2}>
            <CustomForm
              formName="form"
              inputs={inputs}
              onSubmit={handleSignIn}
              submitLable={"login"}
              // status={status === "loading" ? "loading" : "nothing"}
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
  );
};

export default SignIn;
