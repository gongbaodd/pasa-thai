import words from "../words"
import { reactive } from "vue"

export type IWord = {
    local_id: string;
    known: boolean;
} & typeof words[number]

const data = reactive(words.map((word, index) => {
    return {
        local_id: index.toString(),
        ...word,
        known: false
    }
}))

export {
    data as words,
    findWordByLocalId,
    toggleWordKnownState,
    getTypes,
    filterWordsByType,
}

function findWordByLocalId(local_id: string) {
    return data.find(word => word.local_id === local_id)
}

function toggleWordKnownState(local_id: string) {
    const word = findWordByLocalId(local_id)
    if (word) {
        word.known = !word.known
    }
}

function getTypes() {
    const types = new Set<string>()
    words.forEach(word => types.add(word.type))
    return Array.from(types)
}

function filterWordsByType(type: IWord["type"]) {
    return data.filter(word => word.type === type)
}