import { configureStore } from "@reduxjs/toolkit";
import { rejuveApi } from "./services/api";
import { mainSlice } from "./slice/main";

const combinedReducer = {
  [mainSlice.name]: mainSlice.reducer,
  [rejuveApi.reducerPath]: rejuveApi.reducer,
};

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([rejuveApi.middleware]),
  devTools: false,
});
