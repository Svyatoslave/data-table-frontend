import { displayDate } from "@/shared/utils/display";

type LogLevel = "info" | "error";

type ConsoleFn = (...args: unknown[]) => void;

const getOutByLogLevel = (lvl: LogLevel): ConsoleFn => {
  switch (lvl) {
    case "info":
      return console.info;
    case "error":
      return console.error;
  }
};

const displayLogLevel = (lvl: LogLevel): string => {
  switch (lvl) {
    case "info":
      return "[INFO]";
    case "error":
      return "[ERROR]";
  }
};

const log = (lvl: LogLevel, ...args: unknown[]) => {
  const out = getOutByLogLevel(lvl);
  const date = new Date();

  out(
    `${displayDate(date, "YYYY/MM/DD HH:mm:ss")} ${displayLogLevel(lvl)}`,
    ...args
  );
};

export const info = (...args: unknown[]) => log("info", ...args);

export const error = (...args: unknown[]) => log("error", ...args);
