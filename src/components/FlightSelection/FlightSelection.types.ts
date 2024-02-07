import { FareCategories, Flight } from "models/FlightType";

export type FlightSelectionProps = {
  flight: Flight;
  fareCategory: FareCategories;
  handleChange: (checked: boolean) => void;
};
