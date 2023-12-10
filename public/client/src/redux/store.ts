import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AuthSlice from "./reducers/auth";
import GroupSlice from "./reducers/group";
import MessageSlice from "./reducers/message";

export const store = configureStore({
  reducer: {
    [AuthSlice.name]: AuthSlice.reducer,
    [GroupSlice.name]: GroupSlice.reducer,
    [MessageSlice.name]: MessageSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
