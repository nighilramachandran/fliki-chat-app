import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../store";
import { LoginReq, RegisterReq, RequestStatus } from "../../interfaces";
import { groupRoutes, loginRoutes, regiserRoutes } from "../../utils/APIRoutes";
import { enqueueSnackbar } from "notistack";
import { NavigateFunction } from "react-router-dom";
import { ROUTES } from "../../utils/routes/constants";
import { CreateGroupReq } from "../../interfaces/Group";

interface InitialState {
  status: RequestStatus;
  authenticated: Boolean;
}

const initialState: InitialState = {
  status: "nothing",
  authenticated: false,
};

const GroupSlice = createSlice({
  name: "Group",
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

export const { setStatus, setAuthentication } = GroupSlice.actions;

export const CreateGroupAsync =
  (req: CreateGroupReq, navigate: NavigateFunction): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    const { AUTH } = ROUTES;
    try {
      const { data } = await axios.post(groupRoutes, req);
      if (data.status) {
        dispatch(setStatus("data"));
        enqueueSnackbar(data.msg, {
          variant: "success",
        });
        navigate(AUTH.CHAT_GROUP);
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

export default GroupSlice;
