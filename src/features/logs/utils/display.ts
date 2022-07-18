import type { LogAction } from "@/features/logs";

export const displayLogAction = (logAction: LogAction): string => {
  switch (logAction) {
    case "create":
      return "Создание";
    case "update":
      return "Обновление";
    case "delete":
      return "Удаление";
  }
};
