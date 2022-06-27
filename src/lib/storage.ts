import type { Nullable } from "@/shared/types/utility";

const TOKEN_KEY = "token";

interface InnerStorage {
  getItem(key: string): Nullable<string>;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

class Storage {
  constructor(private readonly innerStorage: InnerStorage) {}

  public getToken(): Nullable<string> {
    return this.innerStorage.getItem(TOKEN_KEY);
  }

  public setToken(token: string) {
    return this.innerStorage.setItem(TOKEN_KEY, token);
  }

  public clearToken() {
    return this.innerStorage.removeItem(TOKEN_KEY);
  }
}

export const storage = new Storage(window.localStorage);
