import { computed } from "vue"
import { words } from "../models/words"
import dayjs from "dayjs"


const filteredWords = computed(() => {
    const ws = words.filter(word => {
        // find words that not been remembered in 7 days
        if (!word.lastRememberedDate) return true

        return dayjs().diff(dayjs(word.lastRememberedDate), 'day') > 7
    }).toReversed()

    return ws.slice(0, 20);
}) 

export {
    filteredWords
}


