import { useTranslation } from "next-i18next";
import { SubcategoryInfoProps } from "./SubcategoryInfo.types";
import { useAppDispatch, useAppSelector } from "store/store";
import { useMemo } from "react";
import { BrandCode, FareCategories } from "models/FlightType";
import { setChosenFlight } from "store/features/flightSlice";
import { useRouter } from "next/router";
import styles from "./SubcategoryInfo.module.css";

export const SubcategoryInfo = ({
  subcategory,
  fareCategory,
}: SubcategoryInfoProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const promotionCodeActive = useAppSelector(
    (state) => state.flight.promotionCodeActive
  );

  const buttonDisabled = useMemo(
    () =>
      promotionCodeActive &&
      (fareCategory === FareCategories.BUSINESS ||
        subcategory.brandCode !== BrandCode.ECO_FLY),
    [subcategory, fareCategory, promotionCodeActive]
  );

  const onSelectFlightClick = () => {
    dispatch(setChosenFlight(subcategory));
    router.push("/flight/result");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.headerTitle}>
          {t(`brandCodeEnum.${subcategory.brandCode}`)}
        </p>
        <div className={styles.headerPriceContainer}>
          <p className={styles.headerPriceCurrency}>
            {subcategory.price.currency}
          </p>
          <p className={styles.headerTitle}>
            {promotionCodeActive && !buttonDisabled
              ? subcategory.price.amount / 2
              : subcategory.price.amount}
          </p>
        </div>
      </div>
      <div className={styles.rights}>
        {subcategory.rights.map((right) => (
          <div className={styles.right}>{right}</div>
        ))}
      </div>
      <button
        className={styles.selectFlightButton}
        disabled={buttonDisabled}
        onClick={onSelectFlightClick}
      >
        {t("flight.list.selectFlight")}
      </button>
    </div>
  );
};
