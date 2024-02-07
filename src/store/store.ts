import { configureStore } from "@reduxjs/toolkit";
import { flightSlice } from "./features/flightSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { themeSlice } from "./features/languageSlice";

export const store = configureStore({
  reducer: {
    flight: flightSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
