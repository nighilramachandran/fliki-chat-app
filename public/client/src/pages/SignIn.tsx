import React, { useState } from "react";
import { CustomForm, CustomInputFormProps } from "../components/form";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes/constants";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { loginRoutes } from "../utils/APIRoutes";

const inputs: CustomInputFormProps[] = [
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

  //states
  const [load, setLoad] = useState<boolean>(false);

  //functions
  const handleSignUp = () => {
    navigate(GUEST.REGISTER);
  };

  const handleSignIn = async (vals: any) => {
    setLoad((prev) => !prev);
    try {
      const { data } = await axios.post(loginRoutes, vals);

      if (data.status) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate(AUTH.CHAT_GROUP);
      } else if (!data.status) {
        navigate(ROOT);
        enqueueSnackbar(data.msg, {
          variant: "error",
        });
      }
    } catch (error: any) {
      setLoad((prev) => !prev);
      console.error("Error:", error.message);
    }
    setLoad((prev) => !prev);
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
              status={load ? "loading" : "nothing"}
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
