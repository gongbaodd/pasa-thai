import type { IWord } from "../models";

const key = "pasa_thay_0310";
const initial: { words: IWord[], daily: Record<string, IWord[] | null> } = {words: [], daily: {}};

export async function load(): Promise<typeof initial>{

  if (!globalThis.localStorage) {
    return initial;
  }

  return {
    ...initial,
    ...(JSON.parse(globalThis.localStorage.getItem(key) || JSON.stringify(initial)))
  }
}

export async function save(words: IWord[]) {
  if (!globalThis.localStorage) {
    return;
  }

  const data = await load();

  globalThis.localStorage.setItem(key, JSON.stringify({...data, words}));
}

export async function saveDaily(date: string, words: IWord[] | null) {
  if (!globalThis.localStorage) {
    return;
  }

  const data = await load();

  globalThis.localStorage.setItem(key, JSON.stringify({...data, daily: {...data.daily, [date]: words}}));
}