import type { ApplicationForm } from "@/features/application-forms";

export const isNonApplicationFormAccepted = (
  applicationForm: ApplicationForm
) => applicationForm.status !== "applicationAccepted";
