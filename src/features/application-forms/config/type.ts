import type { SelectOptions } from "@/shared/types/select";

export const applicationFormTypeOptions: SelectOptions<number> = [
  {
    label: "Досрочное прекращение пользования недрами",
    value: 1,
  },
  {
    label: "Изменение границ участков недр",
    value: 2,
  },
  {
    label: "Внесение изменений",
    value: 3,
  },
];
