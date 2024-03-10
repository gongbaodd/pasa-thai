<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from "vue";
import { filteredWords, finishedDays } from "../packages/vmodels/daily"
import { IonDatetime } from "@ionic/vue";

const words = computed(() => filteredWords)

</script>

<template>
    <WordList :words="words" title="daily">
        <slot>
            <section class="date">
                <IonDatetime  display-format="YYYY-MM-DD" :day-values="finishedDays.join(',')"></IonDatetime>
            </section>
        </slot>
    </WordList>
</template>

<style scoped>
.date {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
}
</style>
