import { FlightSelectionProps } from "./FlightSelection.types";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "store/store";
import { setActiveFlightCard } from "store/features/flightSlice";
import { BrandCode, FareCategories, Price } from "models/FlightType";
import styles from "./FlightSelection.module.css";

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
        styles.container +
        " " +
        (!isChecked ? styles.containerNotChecked : styles.containerChecked)
      }
      onClick={onSelectionCardClick}
    >
      <div className={styles.radioButtonContainer}>
        <input
          ref={radioButtonRef}
          className={styles.radioButton}
          type="radio"
          name={"fareCategoryList"}
          id={key}
        />
        <p className={styles.radioButtonLabel}>
          {t(`fareCategoriesEnum.${fareCategory}`)}
        </p>
      </div>
      <div className={styles.priceInfoContainer}>
        <p className={styles.priceInfoDescription}>
          {t("flight.list.perPassenger")}
        </p>
        <p
          className={styles.priceInfoAmount}
        >{`${ecoFlyPrice?.currency} ${promotionCodeActive && fareCategory === FareCategories.ECONOMY ? (ecoFlyPrice?.amount ?? 0) / 2 : ecoFlyPrice?.amount}`}</p>
      </div>
      {isChecked ? (
        <FontAwesomeIcon icon={faChevronDown} className={styles.upDownIcon} />
      ) : (
        <FontAwesomeIcon icon={faChevronUp} className={styles.upDownIcon} />
      )}
    </div>
  );
};
