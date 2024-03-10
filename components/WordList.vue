<script setup lang="ts">
import { type IWord, seenWordById } from '../packages/models/words';
import { useRouter } from "vue-router";
import { IonList, IonItem, IonLabel } from "@ionic/vue";
import day from "dayjs";
import { computed, type Ref } from 'vue';

const router = useRouter()

function onItemPress(word: IWord) {
    return () => {
        router.push(`/word/${word.uuid}`)
        seenWordById(word.uuid)
    }
}

const { words } = defineProps<{ words: Ref<IWord[]>, title?: string }>()

const sorted = computed(() => {
    return [...words.value].sort((a, b) => {
        if (a.lastRememberedDate && b.lastRememberedDate) {
            return a.lastRememberedDate > b.lastRememberedDate ? 1 : -1
        }
        if (a.lastRememberedDate) {
            return 1
        }
        if (b.lastRememberedDate) {
            return -1
        }
        return 0
    })
})

</script>

<template>
    <IonPage>
        <Header :title="(title ?? 'Words') + `(${words.value.length})`"></Header>

        <IonContent :fullscreen="true">
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">{{ $route.params.id }}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <div id="container">
                <IonList>
                    <IonItem v-for="word in sorted" :key="word.uuid" :button="true" :onclick="onItemPress(word)">
                        <ionBadge slot="end">{{ word.lastRememberedDate ?
            Math.abs(day(word.lastRememberedDate).diff(Date.now(), 'day')) : "∞" }}</ionBadge>
                        <IonLabel>{{ word.Chinese }}</IonLabel>
                    </IonItem>
                </IonList>
            </div>
        </IonContent>
    </IonPage>
</template>
