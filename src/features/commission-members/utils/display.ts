import { isNonNullable } from "@/shared/utils/equal";

import type { CommissionMember } from "@/features/commission-members";

export const displayMembersCommissionFullName = (
  сommissionMember: CommissionMember
): string =>
  isNonNullable(сommissionMember.name) &&
  isNonNullable(сommissionMember.patronymic)
    ? `${сommissionMember.surname} ${сommissionMember.name} ${сommissionMember.patronymic}`
    : сommissionMember.surname;

export const optionsMembersCommissionFullName = (
  сommissionMembers: CommissionMember[]
) =>
  сommissionMembers.map((сommissionMember) => ({
    label: displayMembersCommissionFullName(сommissionMember),
    value: сommissionMember.id,
  }));
