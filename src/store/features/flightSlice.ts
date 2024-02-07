import { FlightQuery, Subcategory } from "models/FlightType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FlightState {
  promotionCodeActive: boolean;
  flight?: FlightQuery;
  activeFlightCard?: string;
  chosenFlight?: Subcategory;
}

const initialState: FlightState = {
  promotionCodeActive: false,
};

export const FlightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setFlight: (state, action: PayloadAction<FlightQuery>) => {
      state.flight = action.payload;
    },
    setActiveFlightCard: (state, action: PayloadAction<string>) => {
      state.activeFlightCard = action.payload;
    },
    setPromotionCodeActive: (state, action: PayloadAction<boolean>) => {
      state.promotionCodeActive = action.payload;
    },
    setChosenFlight: (state, action: PayloadAction<Subcategory>) => {
      state.chosenFlight = action.payload;
    },
  },
});

export const {
  setFlight,
  setActiveFlightCard,
  setPromotionCodeActive,
  setChosenFlight,
} = FlightSlice.actions;
export default FlightSlice.reducer;
