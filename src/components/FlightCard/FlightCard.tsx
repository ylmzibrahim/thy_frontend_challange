import { FlightInfo } from "components/FlightInfo/FlightInfo";
import { FlightSelection } from "components/FlightSelection/FlightSelection";
import { FareCategories, Subcategory } from "models/FlightType";
import { FlightCardProps } from "./FlightCard.types";
import { useEffect, useState } from "react";
import { FlightSubcategories } from "components/FlightSubcategories/FlightSubcategories";
import styles from "./FlightCard.module.css";

export const FlightCard = ({ flight }: FlightCardProps) => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [isEconomyFlightOpen, setIsEconomyFlightOpen] =
    useState<boolean>(false);
  const [isBusinessFlightOpen, setIsBusinessFlightOpen] =
    useState<boolean>(false);
  const [fareCategory, setFareCategory] = useState<FareCategories>(
    FareCategories.ECONOMY
  );

  useEffect(() => {
    const selectedFareCategory = isEconomyFlightOpen
      ? FareCategories.ECONOMY
      : FareCategories.BUSINESS;
    const newSubcategories =
      isEconomyFlightOpen || isBusinessFlightOpen
        ? flight.fareCategories[selectedFareCategory].subcategories
        : [];
    setFareCategory(selectedFareCategory);
    setSubcategories(newSubcategories);
  }, [isEconomyFlightOpen, isBusinessFlightOpen]);

  return (
    <div className={styles.container}>
      <div className={styles.flightCardsSection}>
        <FlightInfo flight={flight} />
        <FlightSelection
          flight={flight}
          fareCategory={FareCategories.ECONOMY}
          handleChange={setIsEconomyFlightOpen}
        />
        <FlightSelection
          flight={flight}
          fareCategory={FareCategories.BUSINESS}
          handleChange={setIsBusinessFlightOpen}
        />
      </div>
      {subcategories.length > 0 && (
        <FlightSubcategories
          subcategories={subcategories}
          fareCategory={fareCategory}
        />
      )}
    </div>
  );
};
