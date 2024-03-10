import type { IWord } from "../models";

const key = "pasa_thay_0310";

export async function load(): Promise<{ words: IWord[] }>{
  if (!globalThis.localStorage) {
    return {words: []};
  }

  return JSON.parse(globalThis.localStorage.getItem(key) || '{"words":[]}')
}

export async function save(words: IWord[]) {
  if (!globalThis.localStorage) {
    return;
  }

  globalThis.localStorage.setItem(key, JSON.stringify({words}));
}
