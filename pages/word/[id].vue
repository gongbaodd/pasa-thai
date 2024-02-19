<script setup lang="ts">
import { IonCard, IonCardHeader, IonPage, IonCardTitle, IonCardContent, IonCardSubtitle, IonNote } from '@ionic/vue';
import Header from '../../components/Header.vue';
import { words } from "../../packages/models"
import { useRoute } from 'vue-router';

const route = useRoute()

const word = words.value.find(w => w.local_id === route.params.id)
</script>

<template>
    <IonPage>
        <Header :title="word?.Chinese"></Header>
        <div id="container">
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
        </div>
    </IonPage>
</template>

<style scoped>
    #container {
        flex: 1;
    }
</style>
