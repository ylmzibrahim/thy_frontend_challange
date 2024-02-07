import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "next-i18next";
import styles from "./Calendar.module.css";

export const Calendar = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <p>{t("flight.query.date")}</p>
      <FontAwesomeIcon icon={faCalendar} className={styles.calendarIcon} />
    </div>
  );
};
