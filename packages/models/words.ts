import { load, save } from "../storage";
import words from "../words"
import { computed, reactive, watchEffect } from "vue"

export type IWord = {
    lastRememberedDate: Date | null;
    lastUpdateDate: Date | null;
} & typeof words[number]

const raw = words.map((word) => {
    return {
        ...word,
        lastRememberedDate: null,
        lastUpdateDate: null,
    }
})

const data = reactive<IWord[]>(raw)

loadStoredWords()

export {
    data as words,
    findWordById,
    getTypes,
    filterWordsByType,
    seenWordById,
    moveWordToBottomById,
    rememberWordById,
}

function findWordById(id: string) {
    return data.find(word => word.uuid === id)
}

function getTypes() {
    const types = new Set<string>()
    words.forEach(word => types.add(word.type))
    return Array.from(types)
}

function filterWordsByType(type: IWord["type"]) {
    return computed(() => data.filter(word => word.type === type))
}

function seenWordById(id: string) {
    const index = data.findIndex(word => word.uuid === id)
    data[index] = {
        ...data[index],
        lastUpdateDate: new Date(),
    }
}

function moveWordToBottomById(id: string) {
    const word = raw.find(word => word.uuid === id)!
    data.splice(data.findIndex(word => word.uuid === id), 1)
    data.push(word)
}

function rememberWordById(id: string) {
    const index = data.findIndex(word => word.uuid === id)
    data[index] = {
        ...data[index],
        lastRememberedDate: new Date(),
    }
}

async function loadStoredWords() {
    const stored = await load()

    const rest = raw.filter(word => !stored.find(storedWord => storedWord.uuid === word.uuid))

    data.splice(0, data.length, ...stored, ...rest)
}

watchEffect(() => {
    save(data)
})