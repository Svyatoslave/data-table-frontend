import type { SelectOptions } from "@/shared/types/select";

export const applicationFormStatusOptions: SelectOptions<number> = [
  {
    label: "Заявка принята",
    value: 1,
  },
  {
    label: "Повестка",
    value: 2,
  },
  {
    label: "Протокол",
    value: 3,
  },
];
