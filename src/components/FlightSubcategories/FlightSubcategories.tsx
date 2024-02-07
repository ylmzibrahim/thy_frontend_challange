import { FlightSubcategoriesProps } from "./FlightSubcategories.types";
import { SubcategoryInfo } from "components/SubcategoryInfo/SubcategoryInfo";
import styles from "./FlightSubcategories.module.css";

export const FlightSubcategories = ({
  subcategories,
  fareCategory,
}: FlightSubcategoriesProps) => {
  return (
    <div className={styles.container}>
      {subcategories.map((subcategory) => (
        <SubcategoryInfo
          subcategory={subcategory}
          fareCategory={fareCategory}
        />
      ))}
    </div>
  );
};
