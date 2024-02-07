import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "next-i18next";
import { IconInputProps } from "./IconInput.types";

export const IconInput = ({
  icon,
  text,
  value,
  handleChange,
}: IconInputProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row bg-white text-slate-800 p-2 space-x-2">
      <FontAwesomeIcon icon={icon} className="w-4 aspect-square" />
      <input
        type="text"
        placeholder={t(text)}
        defaultValue={value ?? ""}
        className="outline-none"
        onChange={handleChange}
      />
    </div>
  );
};
