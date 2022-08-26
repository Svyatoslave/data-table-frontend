import type {
  ApplicationFormStatus,
  ApplicationFormType,
} from "@/features/application-forms";

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

export const displayApplicationTypeStatus = (
  type: ApplicationFormType
): string => {
  switch (type) {
    case "earlyTermination":
      return "Досрочное прекращение пользования недрами";
    case "changeArea":
      return "Изменение границ участков недр";
    case "makingChanges":
      return "Внесение изменений";
  }
};
