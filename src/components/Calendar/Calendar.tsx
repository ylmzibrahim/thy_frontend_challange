import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "next-i18next";

export const Calendar = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row space-x-2 p-3 items-center bg-slate-800">
      <p>{t("flight.query.date")}</p>
      <FontAwesomeIcon icon={faCalendar} className="w-5 aspect-square" />
    </div>
  );
};
