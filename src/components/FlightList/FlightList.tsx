import { FlightCard } from "components/FlightCard/FlightCard";
import ToggleSwitch from "components/ToggleSwitch";
import { FareCategories, Flight, FlightQuery } from "models/FlightType";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useState } from "react";
import { setPromotionCodeActive } from "store/features/flightSlice";
import { useAppDispatch, useAppSelector } from "store/store";

export const FlightList = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const flights = useAppSelector((state) => state.flight.flights);
  const [filteredAndSortedFlights, setFilteredAndSortedFlights] = useState<
    Flight[]
  >([]);
  const [flight, setFlight] = useState<FlightQuery>();
  const promotionCodeActive = useAppSelector(
    (state) => state.flight.promotionCodeActive
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFlight({
        arrival: localStorage.getItem("arrival") ?? "",
        departure: localStorage.getItem("departure") ?? "",
        fareCategory: localStorage.getItem("fare_category") as FareCategories,
        passengerCount: Number(localStorage.getItem("passenger_count")),
      });
    }
  }, []);

  const onPromotionSwitchChange = (checked: boolean) => {
    dispatch(setPromotionCodeActive(checked));
  };

  const getFilterFlights = useCallback(
    (): Flight[] =>
      flights.filter(
        (_flight) =>
          _flight.originAirport.city.name === flight?.departure &&
          _flight.destinationAirport.city.name === flight?.arrival
      ),
    [flights, flight]
  );

  const sortByEconomyFare = useCallback(() => {
    const filteredFlights = getFilterFlights();
    filteredFlights.sort((firstFlight, secondFlight) => {
      const ecoFlyPriceFirst =
        firstFlight.fareCategories[FareCategories.ECONOMY].subcategories.find(
          (subcategory) => subcategory.brandCode === "ecoFly"
        )?.price.amount || 0;
      const ecoFlyPriceSecond =
        secondFlight.fareCategories[FareCategories.ECONOMY].subcategories.find(
          (subcategory) => subcategory.brandCode === "ecoFly"
        )?.price.amount || 0;
      return ecoFlyPriceFirst - ecoFlyPriceSecond;
    });
    setFilteredAndSortedFlights(filteredFlights);
  }, [flights, getFilterFlights]);

  const sortByDepartureTime = useCallback(() => {
    const filteredFlights = getFilterFlights();
    filteredFlights.sort((firstFlight, secondFlight) => {
      const departureTimeFirst = Number(
        firstFlight.departureDateTimeDisplay.replace(":", "")
      );
      const departureTimeSecond = Number(
        secondFlight.departureDateTimeDisplay.replace(":", "")
      );
      return departureTimeFirst - departureTimeSecond;
    });
    setFilteredAndSortedFlights(filteredFlights);
  }, [flights, getFilterFlights]);

  useEffect(() => {
    sortByEconomyFare();
  }, [sortByEconomyFare]);

  return (
    <div className="flex flex-col mx-auto w-fit pb-5">
      <div className="px-10 py-1 bg-redButton w-fit text-white">
        {t("flight.list.flight")}
      </div>
      <div className="text-xl mt-2 mb-5">
        {flight &&
          `${flight.departure} - ${flight.arrival}, ${flight.passengerCount} ${t("flight.list.passenger")}`}
      </div>
      <div className="flex flex-row space-x-5 mb-4">
        <p className="font-semibold">{t("flight.list.promotionCode")}</p>
        <ToggleSwitch handleChange={onPromotionSwitchChange} />
      </div>
      {promotionCodeActive && (
        <div className="text-xs mb-8 space-y-4">
          <p>{t("flight.list.promotion.firstContent")}</p>
          <p>{t("flight.list.promotion.secondContent")}</p>
        </div>
      )}
      <div className="flex flex-col border rounded-lg overflow-hidden">
        <div className="flex flex-row justify-end items-center bg-queryBg text-white text-xs space-x-2 py-2 px-4">
          <p>{t("flight.list.sortingCriteria")}</p>
          <button
            className="border border-white py-1 px-3"
            onClick={sortByEconomyFare}
          >
            {t("flight.list.economyFare")}
          </button>
          <button
            className="border border-white py-1 px-3"
            onClick={sortByDepartureTime}
          >
            {t("flight.list.departureTime")}
          </button>
        </div>
        <div className="bg-listHeader p-4 space-y-3">
          {filteredAndSortedFlights.map((listedFlight) => (
            <FlightCard
              key={`${listedFlight.arrivalDateTimeDisplay}-${listedFlight.arrivalDateTimeDisplay}`}
              flight={listedFlight}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
