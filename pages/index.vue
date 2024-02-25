<template>
    <WordList :words="words"></WordList>
</template>

<script setup lang="ts">
import { words } from "../packages/models/words"
import WordList from "../components/WordList.vue"

</script>
