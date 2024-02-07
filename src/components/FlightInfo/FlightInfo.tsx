import { useTranslation } from "next-i18next";
import { FlightInfoProps } from "./FlightInfo.types";

export const FlightInfo = ({ flight }: FlightInfoProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row items-center bg-white shadow-xl drop-shadow-2xl space-x-2 px-3 py-5 rounded-sm">
      <div className="flex flex-col items-start">
        <p className="font-bold">{flight.arrivalDateTimeDisplay}</p>
        <p className="text-sm font-semibold text-gray-600">
          {flight.originAirport.city.code}
        </p>
        <p className="text-xs font-semibold text-gray-600">
          {flight.originAirport.city.name}
        </p>
      </div>
      <hr className="w-56 border-gray-600 border-0.5 " />
      <div className="flex flex-col items-end">
        <p className="font-bold">{flight.departureDateTimeDisplay}</p>
        <p className="text-sm font-semibold text-gray-600">
          {flight.destinationAirport.city.code}
        </p>
        <p className="text-xs font-semibold text-gray-600">
          {flight.destinationAirport.city.name}
        </p>
      </div>
      <div className="flex items-center justify-center flex-col !ml-8">
        <p className="text-xs font-semibold text-gray-600">
          {t("flight.list.flightTime")}
        </p>
        <p className="text-xs font-bold">{flight.flightDuration}</p>
      </div>
    </div>
  );
};
