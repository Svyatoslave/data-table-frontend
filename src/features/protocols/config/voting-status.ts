import type { SelectOptions } from "@/shared/types/select";

export const protocolVotingStatusOptions: SelectOptions<number> = [
  {
    label: "Завершено",
    value: 0,
  },
  {
    label: "На согласовании",
    value: 1,
  },
  {
    label: "Подписание членами комиссии",
    value: 2,
  },
  {
    label: "Подписание председателем",
    value: 3,
  },
];
