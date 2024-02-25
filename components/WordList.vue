<script setup lang="ts">
import { type IWord, seenWordByLocalId } from '../packages/models/words';
import { useRouter } from "vue-router";
import { IonList, IonItem, IonLabel } from "@ionic/vue";
import day from "dayjs";

const router = useRouter()

function onItemPress(word: IWord) {
    return () => {
        router.push(`/word/${word.local_id}`)
        seenWordByLocalId(word.local_id)
    }
}

defineProps<{ words: IWord[], title?: string }>()

</script>

<template>
    <IonPage>
        <Header :title="(title ?? 'Words') + `(${words.length})`"></Header>

        <IonContent :fullscreen="true">
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">{{ $route.params.id }}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <div id="container">
                <IonList>
                    <IonItem v-for="word in words" :key="word.local_id" :button="true" :onclick="onItemPress(word)">
                        <ionBadge slot="end">{{ word.lastRememberedDate ? day(word.lastRememberedDate).diff(Date.now(), 'day') :"∞"}}</ionBadge>
                        <IonLabel>{{ word.Chinese }}</IonLabel>
                    </IonItem>
                </IonList>
            </div>
        </IonContent>
    </IonPage>
</template>
