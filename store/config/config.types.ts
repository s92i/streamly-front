import type { TypeBaseColor } from "@/lib/constants/colors.constants";

export interface ConfigStore {
  theme: TypeBaseColor;
  setTheme: (theme: TypeBaseColor) => void;
}
