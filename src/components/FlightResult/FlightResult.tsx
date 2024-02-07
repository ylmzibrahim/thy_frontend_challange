import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Status } from "models/FlightType";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "store/store";

export const FlightResult = () => {
  const { t } = useTranslation();
  const chosenFlight = useAppSelector((state) => state.flight.chosenFlight);
  const promotionCodeActive = useAppSelector(
    (state) => state.flight.promotionCodeActive
  );

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-10">
      {chosenFlight?.status === Status.AVAILABLE && (
        <>
          <div className="flex flex-row items-start space-x-3 w-3/4">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-green-600 h-6"
            />
            <p>{t("flight.result.success")}</p>
          </div>
          <hr className="w-3/4" />
          <div className="flex flex-row !justify-between">
            <p className="text-lg">{t("flight.result.totalAmount")}</p>
            <p className="text-lg">{`${t(chosenFlight.price.currency)} ${promotionCodeActive ? chosenFlight.price.amount / 2 : chosenFlight.price.amount}`}</p>
          </div>
        </>
      )}
      {chosenFlight?.status === Status.ERROR && (
        <>
          <div className="flex flex-row items-start space-x-3 w-3/4">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="text-red-600 h-6"
            />
            <p>{t("flight.result.error")}</p>
          </div>
          <hr className="w-3/4" />
          <div className="flex flex-row justify-end">
            <button className="bg-red-500 px-5 py-2">
              {t("flight.result.goBack")}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
