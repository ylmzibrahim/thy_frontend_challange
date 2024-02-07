import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent } from "react";

export type IconInputProps = {
  icon: IconDefinition;
  text: string;
  value: string | null;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
