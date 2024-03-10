<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { IonCard, IonCardHeader, IonPage, IonCardTitle, IonCardContent, IonCardSubtitle, IonNote, IonContent, IonButton } from '@ionic/vue';
import Header from '../../components/Header.vue';
import { useRoute, useRouter } from 'vue-router';
import { findWordById, moveWordToBottomById, rememberWordById } from '../../packages/models/words';
import { removeDailyWordById } from '../../packages/vmodels/daily';

const route = useRoute()
const router = useRouter()

const localId = route.params.id as string

const word = findWordById(localId)
const goBack = () => router.back()

function markAsKnown() {
    rememberWordById(localId)
    moveWordToBottomById(localId)
    removeDailyWordById(localId)
    goBack()
}

function markAsUnknown() {
    moveWordToBottomById(localId)
    goBack()
}

function read() {
    const msg = new SpeechSynthesisUtterance()
    const voices = window.speechSynthesis.getVoices()
    const voice = voices.find(voice => voice.lang === 'th-TH')

    if (voice) {
        msg.voice = voice
        msg.volume = 1
        msg.rate = 1
        msg.pitch = 1
        msg.text = word!.Thai
        msg.lang = 'th-TH'
        speechSynthesis.speak(msg)
        return
    }
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
                        <span>{{ word?.Thai }}</span>
                        <IonButton fill="clear" size="small" @click="read">
                            read
                        </IonButton>
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

    .button {
        -webkit-box-shadow: none;
        box-shadow: none;
    }
</style>
