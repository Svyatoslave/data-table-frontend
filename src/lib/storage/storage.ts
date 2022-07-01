import type { Optional } from "@/shared/types/utility";

export interface InnerStorage {
  getItem(key: string): Optional<string>;
}

const EXPIRED_KEY = "expired";

export class Storage {
  constructor(private readonly innerStorage: InnerStorage) {}

  public getExpired(): Optional<string> {
    return this.innerStorage.getItem(EXPIRED_KEY);
  }
}
