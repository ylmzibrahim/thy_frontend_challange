import { Flight, FlightQuery, Subcategory } from "models/FlightType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FlightState {
  flights: Flight[];
  promotionCodeActive: boolean;
  flight?: FlightQuery;
  activeFlightCard?: string;
  chosenFlight?: Subcategory;
}

const initialState: FlightState = {
  flights: [],
  promotionCodeActive: false,
};

export const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setFlight: (state, action: PayloadAction<FlightQuery>) => {
      state.flight = action.payload;
    },
    setFlights: (state, action: PayloadAction<Flight[]>) => {
      state.flights = action.payload;
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
  setFlights,
  setActiveFlightCard,
  setPromotionCodeActive,
  setChosenFlight,
} = flightSlice.actions;
export default flightSlice.reducer;
