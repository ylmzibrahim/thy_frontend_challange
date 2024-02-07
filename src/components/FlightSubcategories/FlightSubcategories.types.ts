import { FareCategories, Subcategory } from "models/FlightType";

export type FlightSubcategoriesProps = {
  subcategories: Subcategory[];
  fareCategory: FareCategories;
};
