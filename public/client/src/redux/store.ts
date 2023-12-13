import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AuthSlice from "./reducers/auth";

export const store = configureStore({
  reducer: {
    [AuthSlice.name]: AuthSlice.reducer,
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
