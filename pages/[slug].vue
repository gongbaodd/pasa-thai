<script setup lang="ts">
import WordList from "../components/WordList.vue"
import { filterWordsByType } from '../packages/models/words';
import { useRoute } from "vue-router"

const route = useRoute()

const words = filterWordsByType(route.params.slug as string)

</script>
<template>
        <WordList :words="words" :title="($route.params.slug as string)"></WordList>
</template>