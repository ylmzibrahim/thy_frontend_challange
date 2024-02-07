import { FlightCard } from "components/FlightCard/FlightCard";
import ToggleSwitch from "components/ToggleSwitch";
import { FareCategories, Flight, FlightQuery } from "models/FlightType";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useState } from "react";
import { setPromotionCodeActive } from "store/features/flightSlice";
import { useAppDispatch, useAppSelector } from "store/store";
import styles from "./FlightList.module.css";

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
    <div className={styles.container}>
      <div className={styles.flightTitle}>{t("flight.list.flight")}</div>
      <div className={styles.flightDetails}>
        {flight &&
          `${flight.departure} - ${flight.arrival}, ${flight.passengerCount} ${t("flight.list.passenger")}`}
      </div>
      <div className={styles.promoCodeSection}>
        <p className={styles.promoCodeLabel}>
          {t("flight.list.promotionCode")}
        </p>
        <ToggleSwitch handleChange={onPromotionSwitchChange} />
      </div>
      {promotionCodeActive && (
        <div className={styles.promoCodeContent}>
          <p>{t("flight.list.promotion.firstContent")}</p>
          <p>{t("flight.list.promotion.secondContent")}</p>
        </div>
      )}
      <div className={styles.flightsListContainer}>
        <div className={styles.flightsListHeader}>
          <p>{t("flight.list.sortingCriteria")}</p>
          <button className={styles.sortingButton} onClick={sortByEconomyFare}>
            {t("flight.list.economyFare")}
          </button>
          <button
            className={styles.sortingButton}
            onClick={sortByDepartureTime}
          >
            {t("flight.list.departureTime")}
          </button>
        </div>
        <div className={styles.flightsList}>
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
