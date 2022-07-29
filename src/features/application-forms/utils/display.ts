import type { ApplicationFormStatus } from "@/features/application-forms";

export const displayApplicationFormStatus = (
  status: ApplicationFormStatus
): string => {
  switch (status) {
    case "applicationAccepted":
      return "Заявка принята";
    case "summon":
      return "Повестка";
    case "protocol":
      return "Протокол";
  }
};
