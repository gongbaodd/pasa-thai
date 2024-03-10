import { ref, watchEffect } from "vue";
import { words, type IWord } from "../models/words";
import dayjs from "dayjs";
import { load, saveDaily } from "../storage";

const FORMAT = "YYYY-MM-DD";
export const filteredWords = ref<IWord[]>([]);
export const finishedDays = ref<string[]>([]);

init();

export function removeDailyWordById(id: string) {
    const index = filteredWords.value.findIndex((word) => word.uuid === id);

    if (index === -1) return;

    filteredWords.value.splice(index, 1);
    filteredWords.value = [...filteredWords.value];
}

async function init() {
  const { daily: storedWords, finishedDays: finished } = await loadStored();

  finishedDays.value = finished;

  if (storedWords.length > 0) {
    filteredWords.value = storedWords;
    return;
  }

  const ws = words.value
    .filter((word) => {
      // find words that not been remembered in 7 days
      if (!word.lastRememberedDate) return true;

      return dayjs().diff(dayjs(word.lastRememberedDate), "day") > 7;
    })
    .toReversed();

  filteredWords.value = ws.slice(0, 20);
}

async function loadStored() {
  const today = dayjs().format(FORMAT);
  const data = await load();
  const daily = data.daily[today] || [];
  const finishedDays: string[] = [];

  let cursor = dayjs().startOf("month")
  do {
    const date = cursor.format("D");
    if (data.daily[date] && data.daily[date].length === 0) {
      finishedDays.push(date);
    }
    cursor = cursor.add(1, "day");
  } while (cursor.isBefore(dayjs().startOf("day")));

  return { daily, finishedDays };
}

watchEffect(() => {
  saveDaily(dayjs().format(FORMAT), filteredWords.value);
});
