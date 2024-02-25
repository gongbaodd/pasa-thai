import type { IWord } from "../models"

const key = "pasa_thay_word_list_0225"

export async function load() {
    return JSON.parse(localStorage.getItem(key) || "[]") as IWord[]
}

export async function save(words: IWord[]) {
    localStorage.setItem(key, JSON.stringify(words))
}