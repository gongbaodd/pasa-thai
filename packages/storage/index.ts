import type { IWord } from "../models";

const key = "pasa_thay_word_list_0225";

export async function load() {
  if (!globalThis.localStorage) {
    return [];
  }

  return JSON.parse(globalThis.localStorage.getItem(key) || "[]") as IWord[];
}

export async function save(words: IWord[]) {
  if (!globalThis.localStorage) {
    return;
  }

  globalThis.localStorage.setItem(key, JSON.stringify(words));
}
