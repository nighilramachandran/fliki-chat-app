import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../store";
import { RequestStatus } from "../../interfaces";
import { addMessagesRoutes } from "../../utils/APIRoutes";
import { enqueueSnackbar } from "notistack";

interface InitialState {
  status: RequestStatus;
}

const initialState: InitialState = {
  status: "nothing",
};

const MessageSlice = createSlice({
  name: "Message",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
  },
});

export const { setStatus } = MessageSlice.actions;

export const AddMessageAsync =
  (req: any): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      const { data } = await axios.post(addMessagesRoutes, req);
      console.log("messagedata", data);

      //   if (data.status) {
      //     dispatch(setStatus("data"));
      //     enqueueSnackbar(data.msg, {
      //       variant: "success",
      //     });
      //   }
    } catch (error: any) {
      dispatch(setStatus("error"));
    }
  };
export default MessageSlice;
