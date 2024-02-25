import { load, save } from "../storage";
import words from "../words"
import { computed, reactive, watchEffect } from "vue"

export type IWord = {
    local_id: string;
    lastRememberedDate: Date | null;
    lastUpdateDate: Date | null;
} & typeof words[number]

const raw = words.map((word, index) => {
    return {
        local_id: index.toString(),
        ...word,
        lastRememberedDate: null,
        lastUpdateDate: null,
    }
})

const data = reactive<IWord[]>(raw)

loadStoredWords()

export {
    data as words,
    findWordByLocalId,
    getTypes,
    filterWordsByType,
    seenWordByLocalId,
    moveWordToBottomByLocalId,
    rememberWordByLocalId,
}

function findWordByLocalId(local_id: string) {
    return data.find(word => word.local_id === local_id)
}

function getTypes() {
    const types = new Set<string>()
    words.forEach(word => types.add(word.type))
    return Array.from(types)
}

function filterWordsByType(type: IWord["type"]) {
    return computed(() => data.filter(word => word.type === type))
}

function seenWordByLocalId(local_id: string) {
    const index = data.findIndex(word => word.local_id === local_id)
    data[index] = {
        ...data[index],
        lastUpdateDate: new Date(),
    }
}

function moveWordToBottomByLocalId(local_id: string) {
    const word = raw.find(word => word.local_id === local_id)!
    data.splice(data.findIndex(word => word.local_id === local_id), 1)
    data.push(word)
}

function rememberWordByLocalId(local_id: string) {
    const index = data.findIndex(word => word.local_id === local_id)
    data[index] = {
        ...data[index],
        lastRememberedDate: new Date(),
    }
}

async function loadStoredWords() {
    const stored = await load()

    const rest = raw.filter(word => !stored.find(storedWord => storedWord.local_id === word.local_id))

    data.splice(0, data.length, ...stored, ...rest)
}

watchEffect(() => {
    save(data)
})