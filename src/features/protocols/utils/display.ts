import type { ProtocolVotingStatus } from "@/features/protocols";

export const displayProtocolVotingStatus = (
  votingStatus: ProtocolVotingStatus
): string => {
  switch (votingStatus) {
    case "completed":
      return "Завершено";
    case "forApproval":
      return "На согласовании";
    case "signingByMemberCommission":
      return "Подписание членами комиссии";
    case "signingByChairman":
      return "Подписание председателем";
  }
};
