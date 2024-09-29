import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./ApplicationReducer";

const store = configureStore({
  reducer: {
    google: appSlice,
  },
});

export default store;