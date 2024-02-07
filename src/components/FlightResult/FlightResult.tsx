import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Status } from "models/FlightType";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "store/store";

export const FlightResult = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const chosenFlight = useAppSelector((state) => state.flight.chosenFlight);
  const promotionCodeActive = useAppSelector(
    (state) => state.flight.promotionCodeActive
  );
  const [passengerCount, setPassengerCount] = useState<number>(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPassengerCount(Number(localStorage.getItem("passenger_count")));
    }
  }, []);

  useEffect(() => {
    if (!chosenFlight) router.push("/flight/query");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-10 w-3/4 mx-auto">
      {chosenFlight?.status === Status.AVAILABLE && (
        <>
          <div className="flex flex-row items-start space-x-3 w-full">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-green-600 h-6"
            />
            <p>{t("flight.result.success")}</p>
          </div>
          <hr className="w-full" />
          <div className="flex flex-row justify-between w-full">
            <p className="text-xl font-thin">
              {t("flight.result.totalAmount")}
            </p>
            <p className="text-lg text-blue-500">{`${t(chosenFlight.price.currency)} ${promotionCodeActive ? (chosenFlight.price.amount / 2) * passengerCount : chosenFlight.price.amount * passengerCount}`}</p>
          </div>
        </>
      )}
      {chosenFlight?.status === Status.ERROR && (
        <>
          <div className="flex flex-row items-start space-x-3 w-full">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="text-red-600 h-6"
            />
            <p>{t("flight.result.error")}</p>
          </div>
          <hr className="w-full" />
          <div className="flex w-full justify-end">
            <Link
              href="/flight/query"
              className="bg-red-500 px-5 py-2 w-fit text-white"
            >
              {t("flight.result.goBack")}
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
