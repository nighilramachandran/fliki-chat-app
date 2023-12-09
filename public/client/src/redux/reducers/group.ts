import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../store";
import { RequestStatus } from "../../interfaces";
import {
  getAllGroupRoutes,
  groupRoutes,
  joinGroupRoutes,
} from "../../utils/APIRoutes";
import { enqueueSnackbar } from "notistack";
import { NavigateFunction } from "react-router-dom";
import { ROUTES } from "../../utils/routes/constants";
import { CreateGroupReq, Group, GroupRoot } from "../../interfaces/Group";

interface InitialState {
  status: RequestStatus;
  groups: Group[];
  joinedGroup: boolean;
}

const initialState: InitialState = {
  status: "nothing",
  groups: [],
  joinedGroup: false,
};

const GroupSlice = createSlice({
  name: "Group",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    setGroup: (state, { payload }: PayloadAction<Group[]>) => {
      state.groups = payload;
    },
  },
});

export const { setStatus, setGroup } = GroupSlice.actions;

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
export const GetAllGroupAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    const { data } = await axios.get<GroupRoot>(getAllGroupRoutes);

    if (data.status) {
      dispatch(setStatus("data"));
      dispatch(setGroup(data.groups));
      enqueueSnackbar(data.msg, {
        variant: "success",
      });
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

export const JoinGroupAsync =
  (req: any): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      const { data } = await axios.post(joinGroupRoutes, req);
      if (data.status) {
        dispatch(setStatus("data"));
        enqueueSnackbar(data.msg, {
          variant: "success",
        });
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
