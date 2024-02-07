import { useTranslation } from "next-i18next";
import { IconInput } from "../IconInput/IconInput";
import {
  faArrowRight,
  faPlaneArrival,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Calendar } from "../Calendar/Calendar";
import PassengerSelection from "components/PassengerSelection";
import { ChangeEvent } from "react";
import { useAppDispatch } from "store/store";
import { setFlight } from "store/features/flightSlice";
import { FareCategories } from "models/FlightType";

export const FlightQuery = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onLocationInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    flightType: string
  ) => {
    localStorage.setItem(flightType, event.target.value);
  };

  const onFlightQuerySubmit = () => {
    dispatch(
      setFlight({
        departure: localStorage.getItem("departure") ?? "",
        arrival: localStorage.getItem("arrival") ?? "",
        fareCategory: localStorage.getItem("fare_category") as FareCategories,
        passengerCount: Number(localStorage.getItem("passenger_count")),
      })
    );
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
            <Link
              href="/flight/list"
              className="p-3 bg-redButton flex items-center"
              onClick={onFlightQuerySubmit}
            >
              <FontAwesomeIcon icon={faArrowRight} className="h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
