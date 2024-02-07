import { FlightSelectionProps } from "./FlightSelection.types";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "store/store";
import { setActiveFlightCard } from "store/features/flightSlice";
import { BrandCode, FareCategories, Price } from "models/FlightType";

export const FlightSelection = ({
  flight,
  fareCategory,
  handleChange,
}: FlightSelectionProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const activeFlightCard = useAppSelector(
    (state) => state.flight.activeFlightCard
  );
  const promotionCodeActive = useAppSelector(
    (state) => state.flight.promotionCodeActive
  );
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const radioButtonRef = useRef<HTMLInputElement>(null);

  const key = useMemo(
    () =>
      `${flight.arrivalDateTimeDisplay}-${flight.departureDateTimeDisplay}/${fareCategory}`,
    [flight]
  );

  const ecoFlyPrice: Price | undefined = useMemo(
    () =>
      flight.fareCategories[fareCategory].subcategories.find(
        (subcategory) => subcategory.brandCode === BrandCode.ECO_FLY
      )?.price,
    []
  );

  const onSelectionCardClick = () => {
    const newCheck = !isChecked;
    if (radioButtonRef.current) radioButtonRef.current.checked = newCheck;
    setIsChecked(newCheck);
    dispatch(setActiveFlightCard(key));
  };

  useEffect(() => {
    if (activeFlightCard !== key) {
      if (radioButtonRef.current) radioButtonRef.current.checked = false;
      setIsChecked(false);
    }
  }, [activeFlightCard]);

  useEffect(() => handleChange(isChecked), [isChecked]);

  return (
    <div
      className={
        "flex flex-row bg-white space-x-4 px-3 py-5 rounded-sm items-center cursor-pointer relative" +
        (!isChecked
          ? " shadow-xl drop-shadow-2xl"
          : " after:w-full after:h-5 after:bg-white after:top-full after:absolute after:left-0")
      }
      onClick={onSelectionCardClick}
    >
      <div className="flex items-center space-x-1">
        <input
          ref={radioButtonRef}
          className="cursor-pointer"
          type="radio"
          name={"fareCategoryList"}
          id={key}
        />
        <p className="underline text-gray-600 font-semibold text-xs">
          {t(`fareCategoriesEnum.${fareCategory}`)}
        </p>
      </div>
      <div className="flex flex-col items-start justify-center">
        <p className="text-gray-600 font-semibold text-[0.6rem]">
          {t("flight.list.perPassenger")}
        </p>
        <p className="font-bold text-md">{`${ecoFlyPrice?.currency} ${promotionCodeActive && fareCategory === FareCategories.ECONOMY ? (ecoFlyPrice?.amount ?? 0) / 2 : ecoFlyPrice?.amount}`}</p>
      </div>
      {isChecked ? (
        <FontAwesomeIcon icon={faChevronDown} className="w-3 !ml-10" />
      ) : (
        <FontAwesomeIcon icon={faChevronUp} className="w-3 !ml-10" />
      )}
    </div>
  );
};
