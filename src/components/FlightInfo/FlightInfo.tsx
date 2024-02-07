import { useTranslation } from "next-i18next";
import { FlightInfoProps } from "./FlightInfo.types";
import styles from "./FlightInfo.module.css";

export const FlightInfo = ({ flight }: FlightInfoProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.flightInfoFrom}>
        <p className={styles.timeDisplay}>{flight.arrivalDateTimeDisplay}</p>
        <p className={styles.cityCode}>{flight.originAirport.city.code}</p>
        <p className={styles.cityName}>{flight.originAirport.city.name}</p>
      </div>
      <hr className={styles.horizontalLine} />
      <div className={styles.flightInfoTo}>
        <p className={styles.timeDisplay}>{flight.departureDateTimeDisplay}</p>
        <p className={styles.cityCode}>{flight.destinationAirport.city.code}</p>
        <p className={styles.cityName}>{flight.destinationAirport.city.name}</p>
      </div>
      <div className={styles.flightTime}>
        <p className={styles.cityName}>{t("flight.list.flightTime")}</p>
        <p className={styles.flightDuration}>{flight.flightDuration}</p>
      </div>
    </div>
  );
};
