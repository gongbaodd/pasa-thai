<script setup lang="ts">
import { type IWord } from '../packages/models';
import { useRouter } from "vue-router";
import { IonList, IonItem, IonLabel } from "@ionic/vue";

const router = useRouter()

function onItemPress(word: IWord) {
    return () => {
        router.push(`/word/${word.local_id}`)
    }
}

defineProps<{ words: IWord[], title?: string }>()

</script>

<template>
    <IonPage>
        <Header :title="title ?? 'Words'"></Header>

        <IonContent :fullscreen="true">
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">{{ $route.params.id }}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <div id="container">
                <IonList>
                    <IonItem v-for="word in words" :button="true" :onclick="onItemPress(word)">
                        <ionBadge v-if="!word.known" slot="end">1</ionBadge>
                        <IonLabel>{{ word.Chinese }}</IonLabel>
                    </IonItem>
                </IonList>
            </div>
        </IonContent>
    </IonPage>
</template>
