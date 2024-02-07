import { Flight } from "models/FlightType";
import { useEffect } from "react";
import { setFlights } from "store/features/flightSlice";
import { useAppDispatch } from "store/store";

export const useFetchFlightsJson2Slice = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await import("assets/datas/flights.json");
        const flights = data.flights as Flight[];
        dispatch(setFlights(flights));
      } catch (error) {
        console.error("Error loading flights.json:", error);
      }
    };

    fetchFlights();
  }, []);
};
