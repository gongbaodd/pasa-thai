import words from "../words"
import { ref } from "vue"

export type IWord = {
    local_id: string   
} & typeof words[number]

const data = ref(words.map((word, index) => {
    return {
        local_id: index.toString(),
        ...word
    }
}))

export { data as words }