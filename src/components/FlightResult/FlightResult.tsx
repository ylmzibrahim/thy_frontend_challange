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
import styles from "./FlightResult.module.css";

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
      setPassengerCount(Number(localStorage.getItem("passenger_count") ?? 1));
    }
  }, []);

  useEffect(() => {
    if (!chosenFlight) router.push("/flight/query");
  }, []);

  return (
    <div className={styles.container}>
      {chosenFlight?.status === Status.AVAILABLE && (
        <>
          <div className={styles.resultMessage}>
            <FontAwesomeIcon
              icon={faCircleCheck}
              className={styles.successIcon}
            />
            <p>{t("flight.result.success")}</p>
          </div>
          <hr className={styles.horizontalLine} />
          <div className={styles.successDescriptionContainer}>
            <p className={styles.successDescriptionMessage}>
              {t("flight.result.totalAmount")}
            </p>
            <p
              className={styles.successDescriptionAmount}
            >{`${t(chosenFlight.price.currency)} ${promotionCodeActive ? (chosenFlight.price.amount / 2) * passengerCount : chosenFlight.price.amount * passengerCount}`}</p>
          </div>
        </>
      )}
      {chosenFlight?.status === Status.ERROR && (
        <>
          <div className={styles.resultMessage}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={styles.errorIcon}
            />
            <p>{t("flight.result.error")}</p>
          </div>
          <hr className={styles.horizontalLine} />
          <div className={styles.errorDescriptionContainer}>
            <Link href="/flight/query" className={styles.errorDescritionButton}>
              {t("flight.result.goBack")}
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
