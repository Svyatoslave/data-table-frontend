import { Storage } from "./storage";
import { cookiesStorageImpl } from "./cookies-storage";

export const storage = new Storage(cookiesStorageImpl);
