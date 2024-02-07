import { faPerson, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FareCategories } from "models/FlightType";
import { useTranslation } from "next-i18next";

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
      <button
        className="flex flex-col w-20 items-center justify-center bg-slate-800 p-1"
        onClick={onPassengerButtonClick}
      >
        <p className="text-xs end-0 text-end w-full">{passengerCount}</p>
        <div className="flex flex-row text-slate-400 items-center">
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
                    className="h-5 text-slate-600"
                  />
                  <FontAwesomeIcon
                    key={index}
                    icon={faPlus}
                    className="h-2.5 text-slate-600"
                  />
                </>
              );
            else return <></>;
          })}
        </div>
      </button>
      {!isCollapsed && (
        <div
          ref={collapsibleRef}
          className="flex flex-col space-y-5 absolute bg-white text-gray-500 top-full !ml-0 mt-2 w-full text-sm p-2 before:absolute before:-top-1 before:left-1/2 before:rotate-45 before:bg-white before:w-2 before:h-2"
        >
          <p>{t("flight.query.selectionTitle")}</p>
          <div className="flex flex-row text-[0.6rem] justify-between">
            <div className="flex items-center space-x-1">
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
            <div className="flex items-center space-x-1">
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
          <div className="flex flex-row justify-between">
            <p>{t("flight.query.passenger")}</p>
            <div className="flex flex-row space-x-3 items-center">
              <button
                className="bg-gray-300 w-6 aspect-square rounded-md"
                disabled={passengerCount === 1}
                onClick={decreasePassengerCount}
              >
                -
              </button>
              <p className="min-w-4 text-center">{passengerCount}</p>
              <button
                className="bg-gray-300 w-6 aspect-square rounded-md"
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
