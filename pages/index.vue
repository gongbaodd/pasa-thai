<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <WordList :words="allWords"></WordList>
</template>

<script setup lang="ts">
import { words } from "../packages/models/words"
import WordList from "../components/WordList.vue"
import { computed } from "vue";

const allWords = computed(() => words)
</script>
