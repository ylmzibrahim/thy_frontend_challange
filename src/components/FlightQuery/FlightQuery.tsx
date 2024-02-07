import { useTranslation } from "next-i18next";
import { IconInput } from "../IconInput/IconInput";
import {
  faArrowRight,
  faPlaneArrival,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Calendar } from "../Calendar/Calendar";
import PassengerSelection from "components/PassengerSelection";
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "store/store";
import { setFlight } from "store/features/flightSlice";
import { FareCategories } from "models/FlightType";
import { useRouter } from "next/router";

export const FlightQuery = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const flights = useAppSelector((state) => state.flight.flights);

  const onLocationInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    flightType: string
  ) => {
    localStorage.setItem(flightType, event.target.value);
  };

  const onFlightQuerySubmit = () => {
    const flightDetails = {
      departure: localStorage.getItem("departure") ?? "",
      arrival: localStorage.getItem("arrival") ?? "",
      fareCategory: localStorage.getItem("fare_category") as FareCategories,
      passengerCount: Number(localStorage.getItem("passenger_count")),
    };
    dispatch(setFlight(flightDetails));
    const areThereAnyFlight = flights.filter(
      (flight) =>
        flight.originAirport.city.name === flightDetails.departure &&
        flight.destinationAirport.city.name === flightDetails.arrival
    );
    if (areThereAnyFlight.length) {
      router.push("/flight/list");
    } else {
      window.alert(t("flight.query.errorMessage"));
    }
  };

  return (
    <div className="flex flex-col w-full h-full items-center bg-queryBg text-white pt-10">
      <h3 className="text-xl">{t("flight.query.title")}</h3>
      <h4 className="text-lg">{t("flight.query.content")}</h4>
      <div className="mt-5">
        <div className="flex flex-row p-5 bg-querySelectionBg space-x-1">
          <IconInput
            icon={faPlaneDeparture}
            text="flight.query.from"
            value={
              typeof window !== "undefined"
                ? localStorage.getItem("departure")
                : ""
            }
            handleChange={(event) => onLocationInputChange(event, "departure")}
          />
          <IconInput
            icon={faPlaneArrival}
            text="flight.query.to"
            value={
              typeof window !== "undefined"
                ? localStorage.getItem("arrival")
                : ""
            }
            handleChange={(event) => onLocationInputChange(event, "arrival")}
          />
          <div className="flex flex-row space-x-1 relative">
            <Calendar />
            <PassengerSelection />
            <button
              className="p-3 bg-redButton flex items-center"
              onClick={onFlightQuerySubmit}
            >
              <FontAwesomeIcon icon={faArrowRight} className="h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
