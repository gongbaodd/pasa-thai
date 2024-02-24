<script setup lang="ts">
import { IonCard, IonCardHeader, IonPage, IonCardTitle, IonCardContent, IonCardSubtitle, IonNote, IonContent, IonButton } from '@ionic/vue';
import Header from '../../components/Header.vue';
import { useRoute, useRouter } from 'vue-router';
import { findWordByLocalId, toggleWordKnownState } from '../../packages/models/words';

const route = useRoute()
const router = useRouter()

const localId = route.params.id as string

const word = findWordByLocalId(localId)
const goBack = () => router.back()

function markAsKnown() {
    if (word?.known) {
        return
    }

    toggleWordKnownState(localId)
}

function markAsUnknown() {
    if (!word?.known) {
        return
    }

    toggleWordKnownState(localId)
}

</script>

<template>
    <IonPage>
        <Header :title="word?.Chinese" :go-back="goBack"></Header>
        <IonContent>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>
                        {{ word?.Chinese }}
                    </IonCardTitle>
                    <IonCardSubtitle>
                        {{ word?.Thai }}
                    </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonNote>
                        {{ word?.phonetic }}
                    </IonNote>
                    <p>
                        {{ word?.English }}
                    </p>
                </IonCardContent>
            </IonCard>
            <IonCard class="button">
                <IonButton expand="block" @click="markAsKnown">I know</IonButton>
            </IonCard>
            <IonCard class="button">
                <IonButton expand="block" fill="outline" @click="markAsUnknown">I don't know</IonButton>
            </IonCard>
    </IonContent>
    </IonPage>
</template>

<style scoped>
    #container {
        flex: 1;
    }

    .buttoon {
        box-shadow: none;
    }
</style>
