import { load, save } from "../storage";
import words from "../words"
import { computed, ref, watchEffect } from "vue"

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

const data = ref<IWord[]>(raw)

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
    return data.value.find(word => word.uuid === id)
}

function getTypes() {
    const types = new Set<string>()
    words.forEach(word => types.add(word.type))
    return Array.from(types)
}

function filterWordsByType(type: IWord["type"]) {
    return computed(() => data.value.filter(word => word.type === type))
}

function seenWordById(id: string) {
    const index = data.value.findIndex(word => word.uuid === id)

    data.value[index] = {
        ...data.value[index], lastUpdateDate: new Date()
    }
    data.value = [...data.value]
}

function moveWordToBottomById(id: string) {
    const index = data.value.findIndex(word => word.uuid === id)
    const word = data.value[index]
    data.value.splice(index, 1)
    data.value.push(word)
    data.value = [...data.value]
}

function rememberWordById(id: string) {
    const index = data.value.findIndex(word => word.uuid === id)
    data.value[index] = {
        ...data.value[index],
        lastRememberedDate: new Date(),
    }
    data.value = [...data.value]
}

async function loadStoredWords() {
    const { words: stored } = await load()
    const rest = raw.filter(word => !stored.find(storedWord => storedWord.uuid === word.uuid))

    data.value = [...rest, ...stored]
}

watchEffect(() => {
    save(data.value)
})