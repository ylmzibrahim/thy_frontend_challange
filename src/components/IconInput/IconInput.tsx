import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "next-i18next";
import { IconInputProps } from "./IconInput.types";
import styles from "./IconInput.module.css";

export const IconInput = ({
  icon,
  text,
  value,
  handleChange,
}: IconInputProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={icon} className={styles.icon} />
      <input
        type="text"
        placeholder={t(text)}
        defaultValue={value ?? ""}
        className={styles.input}
        onChange={handleChange}
      />
    </div>
  );
};
