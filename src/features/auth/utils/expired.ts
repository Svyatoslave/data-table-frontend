import { dayjs } from "@/lib/day-js";

const FORMAT_EXPIRED = "MM/DD/YYYY HH:mm:ss";

export const parseExpired = (expired: string): Date =>
  dayjs.utc(expired, FORMAT_EXPIRED).toDate();

export const isBeforeExpired = (expired: Date): boolean =>
  dayjs(expired).isBefore(new Date());
