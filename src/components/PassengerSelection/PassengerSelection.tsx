import { faPerson, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FareCategories } from "models/FlightType";
import { useTranslation } from "next-i18next";
import styles from "./PassengerSelection.module.css";

export const PassengerSelection = () => {
  const { t } = useTranslation();
  const [passengerCount, setPassengerCount] = useState<number>(1);
  const [fareCategory, setFareCategory] = useState<FareCategories>(
    FareCategories.ECONOMY
  );
  const [isCollapsed, setIsCollapsed] = useState(true);
  const collapsibleRef = useRef<HTMLDivElement>(null);
  const manuallyOpened = useRef<boolean>(false);

  const onPassengerButtonClick = () => {
    manuallyOpened.current = true;
    setIsCollapsed((prevState) => !prevState);
  };

  const increasePassengerCount = () => {
    const increasedCount = passengerCount + 1;
    localStorage.setItem("passenger_count", increasedCount.toString());
    setPassengerCount(increasedCount);
  };

  const decreasePassengerCount = () => {
    const decreasedCount =
      passengerCount > 1 ? passengerCount - 1 : passengerCount;
    localStorage.setItem("passenger_count", decreasedCount.toString());
    setPassengerCount(decreasedCount);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPassengerCount = localStorage.getItem("passenger_count");
      if (storedPassengerCount) setPassengerCount(+storedPassengerCount);
      const storedFareCategory = localStorage.getItem(
        "fare_category"
      ) as FareCategories;
      setFareCategory(storedFareCategory);
    }
  }, []);

  useEffect(() => {
    // Function to handle click outside of the collapsible window
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !manuallyOpened.current &&
        !isCollapsed &&
        !collapsibleRef.current?.contains(event.target as Node)
      ) {
        setIsCollapsed(true);
      } else {
        manuallyOpened.current = false;
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isCollapsed]);

  const onCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFareCategory(event.target.value as FareCategories);
    localStorage.setItem("fare_category", event.target.value);
  };

  return (
    <>
      <button className={styles.container} onClick={onPassengerButtonClick}>
        <p className={styles.passengerCount}>{passengerCount}</p>
        <div className={styles.passengerIcons}>
          {[...Array(passengerCount)].map((_, index) => {
            if (index < 2 || passengerCount === 3)
              return (
                <FontAwesomeIcon key={index} icon={faPerson} className="h-5" />
              );
            else if (index === 2)
              return (
                <>
                  <FontAwesomeIcon
                    key={index}
                    icon={faPerson}
                    className={styles.passengerIcon}
                  />
                  <FontAwesomeIcon
                    key={index}
                    icon={faPlus}
                    className={styles.plusIcon}
                  />
                </>
              );
            else return <></>;
          })}
        </div>
      </button>
      {!isCollapsed && (
        <div ref={collapsibleRef} className={styles.collapsibleContainer}>
          <p>{t("flight.query.selectionTitle")}</p>
          <div className={styles.fareCategories}>
            <div className={styles.fareCategory}>
              <input
                type="radio"
                name="fareCategory"
                id={FareCategories.ECONOMY}
                value={FareCategories.ECONOMY}
                onChange={onCategoryChange}
                checked={fareCategory === FareCategories.ECONOMY}
              />
              <label htmlFor={FareCategories.ECONOMY}>
                {t("flight.query.economyClass")}
              </label>
            </div>
            <div className={styles.fareCategory}>
              <input
                type="radio"
                name="fareCategory"
                id={FareCategories.BUSINESS}
                value={FareCategories.BUSINESS}
                onChange={onCategoryChange}
                checked={fareCategory === FareCategories.BUSINESS}
              />
              <label htmlFor={FareCategories.BUSINESS} className="text">
                {t("flight.query.businessClass")}
              </label>
            </div>
          </div>
          <div className={styles.passengerSelection}>
            <p>{t("flight.query.passenger")}</p>
            <div className={styles.buttonsContainer}>
              <button
                className={styles.button}
                disabled={passengerCount === 1}
                onClick={decreasePassengerCount}
              >
                -
              </button>
              <p className={styles.passengerCountLabel}>{passengerCount}</p>
              <button
                className={styles.button}
                onClick={increasePassengerCount}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
