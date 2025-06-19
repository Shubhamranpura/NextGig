import { configureStore } from "@reduxjs/toolkit";
import theamSlice from "./Slices/ThemeSlice"

const store = configureStore({
  reducer: {
    theam: theamSlice
  }
})

export default store
