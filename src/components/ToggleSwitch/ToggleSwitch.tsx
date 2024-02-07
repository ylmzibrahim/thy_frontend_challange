import { ChangeEvent, useState } from "react";
import { ToggleSwitchProps } from "./ToggleSwitch.types";
import styles from "./ToggleSwitch.module.css";

export const ToggleSwitch = ({ handleChange }: ToggleSwitchProps) => {
  const [toggleChecked, setToggleChecked] = useState<boolean>(false);

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    setToggleChecked(event.target.checked);
    handleChange(event.target.checked);
  };

  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        className={styles.checkboxInput}
        onChange={handleToggle}
      />
      <span
        className={
          styles.checkboxInnerButton +
          " " +
          (toggleChecked ? styles.checkboxInnerButtonChecked : "")
        }
      ></span>
    </label>
  );
};
