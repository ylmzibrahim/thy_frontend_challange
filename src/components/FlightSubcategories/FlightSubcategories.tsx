import { FlightSubcategoriesProps } from "./FlightSubcategories.types";
import { SubcategoryInfo } from "components/SubcategoryInfo/SubcategoryInfo";

export const FlightSubcategories = ({
  subcategories,
  fareCategory,
}: FlightSubcategoriesProps) => {
  return (
    <div className="flex flex-row w-full p-3 space-x-2 mt-3 bg-white">
      {subcategories.map((subcategory) => (
        <SubcategoryInfo
          subcategory={subcategory}
          fareCategory={fareCategory}
        />
      ))}
    </div>
  );
};
