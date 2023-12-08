import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../store";
import { RequestStatus } from "../../interfaces";
import { LoginReq, RegisterReq } from "../../interfaces/Auth";
import { loginRoutes, regiserRoutes } from "../../utils/APIRoutes";
import { enqueueSnackbar } from "notistack";
import { NavigateFunction } from "react-router-dom";
import { ROUTES } from "../../utils/routes/constants";
// import { API } from "@/utility/api/constants";

interface InitialState {
  status: RequestStatus;
  authenticated: Boolean;
}

const initialState: InitialState = {
  status: "nothing",
  authenticated: false,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    setAuthentication: (state, { payload }: PayloadAction<Boolean>) => {
      state.authenticated = payload;
    },
  },
});

export const { setStatus, setAuthentication } = AuthSlice.actions;

export const LoginAsync =
  (req: LoginReq, navigate: NavigateFunction): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));

    const { AUTH } = ROUTES;
    try {
      const { data } = await axios.post(loginRoutes, req);
      if (data.status) {
        dispatch(setStatus("data"));
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate(AUTH.CHAT_GROUP);
        dispatch(setAuthentication(data.status));
      }
      if (!data.status) {
        dispatch(setAuthentication(data.status));
        dispatch(setStatus("error"));
        enqueueSnackbar(data.msg, {
          variant: "error",
        });
      }
    } catch (error: any) {
      dispatch(setStatus("error"));
    }
  };

export const RegisterAsync =
  (req: RegisterReq, navigate: NavigateFunction): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));

    const { ROOT } = ROUTES;
    try {
      const { data } = await axios.post(regiserRoutes, req);
      if (data.status) {
        dispatch(setStatus("data"));
        enqueueSnackbar(data.msg, {
          variant: "success",
        });
        navigate(ROOT);
      }
      if (!data.status) {
        dispatch(setStatus("error"));
        enqueueSnackbar(data.msg, {
          variant: "error",
        });
      }
    } catch (error: any) {
      dispatch(setStatus("error"));
    }
  };

export default AuthSlice;
