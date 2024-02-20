<script setup lang="ts">
import { IonCard, IonCardHeader, IonPage, IonCardTitle, IonCardContent, IonCardSubtitle, IonNote, IonContent } from '@ionic/vue';
import Header from '../../components/Header.vue';
import { words } from "../../packages/models"
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const word = words.value.find(w => w.local_id === route.params.id)
const goBack = () => router.back()

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
    </IonContent>
    </IonPage>
</template>

<style scoped>
    #container {
        flex: 1;
    }
</style>
