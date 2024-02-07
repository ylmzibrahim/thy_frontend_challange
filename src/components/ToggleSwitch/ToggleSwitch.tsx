import { ChangeEvent, useEffect, useState } from "react";
import { ToggleSwitchProps } from "./ToggleSwitch.types";

export const ToggleSwitch = ({ handleChange }: ToggleSwitchProps) => {
  const [toggleChecked, setToggleChecked] = useState<boolean>(false);

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    setToggleChecked(event.target.checked);
    handleChange(event.target.checked);
  };

  return (
    <label className="relative inline-block w-16 h-8">
      <input
        type="checkbox"
        className="opacity-0 w-0 h-0"
        onChange={handleToggle}
      />
      <span
        className={
          "absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-400 rounded-full before:absolute before:h-6 before:w-6 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transform" +
          (toggleChecked
            ? " before:translate-x-8 before:transition-all !bg-blue-500"
            : "")
        }
      ></span>
    </label>
  );
};
