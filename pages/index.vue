<template>
    <IonPage>
        <Header title="Words"></Header>

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

<script setup lang="ts">
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, IonBadge } from "@ionic/vue";
import { type IWord, words } from "../packages/models"
import Header from "../components/Header.vue"
import { useRouter } from "vue-router";

const router = useRouter()

function onItemPress(word: IWord) {
    return () => {
        router.push(`/word/${word.local_id}`)
    }
}
</script>
