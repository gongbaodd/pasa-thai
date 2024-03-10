<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { filteredWords } from "../packages/vmodels/daily"
</script>

<template>
    <WordList :words="filteredWords" title="daily"></WordList>
</template>