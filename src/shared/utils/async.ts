export const later = <T>(delay: number, value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), delay));
