import Cookies from "js-cookie";

import type { InnerStorage } from "./storage";

export const cookiesStorageImpl: InnerStorage = {
  getItem: (key) => Cookies.get(key),
};
