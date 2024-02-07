import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  language: string;
}

const initialState: ThemeState = {
  language: "tr-TR",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = themeSlice.actions;
export default themeSlice.reducer;
