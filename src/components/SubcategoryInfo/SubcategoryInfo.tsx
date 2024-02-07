import { useTranslation } from "next-i18next";
import { SubcategoryInfoProps } from "./SubcategoryInfo.types";
import { useAppDispatch, useAppSelector } from "store/store";
import { useMemo } from "react";
import { BrandCode, FareCategories } from "models/FlightType";
import { setChosenFlight } from "store/features/flightSlice";
import { useRouter } from "next/router";

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
    <div className="flex flex-col w-full border">
      <div className="flex flex-row justify-between bg-gray-300 p-2">
        <p className="font-semibold">
          {t(`brandCodeEnum.${subcategory.brandCode}`)}
        </p>
        <div className="flex flex-row space-x-1">
          <p className="text-[0.6rem]">{subcategory.price.currency}</p>
          <p className="font-semibold">
            {promotionCodeActive && !buttonDisabled
              ? subcategory.price.amount / 2
              : subcategory.price.amount}
          </p>
        </div>
      </div>
      <div className="flex flex-col min-h-52 text-sm">
        {subcategory.rights.map((right) => (
          <div className="p-2 border">{right}</div>
        ))}
      </div>
      <button
        className="bg-redButton text-center py-5 text-white disabled:bg-gray-400 disabled:text-gray-600"
        disabled={buttonDisabled}
        onClick={onSelectFlightClick}
      >
        {t("flight.list.selectFlight")}
      </button>
    </div>
  );
};
