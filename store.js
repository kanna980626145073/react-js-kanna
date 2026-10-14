import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./locationhandler.js";

export const store = configureStore({
  reducer: {
    location: locationReducer,
  },
});
