export const createMeasurableProp = (
  value: number,
  measurement = "px"
): string => (value !== 0 ? `${value}${measurement}` : "0");
