<script setup lang="ts" >
import { IonBackButton, IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar } from "@ionic/vue";

defineProps<{ title?: string, goBack?: () => void }>()
</script>

<template>
    <IonHeader :translucent="true">
        <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton v-if="goBack" @click="goBack" color="primary"></IonBackButton>
                <IonMenuButton v-else color="primary"></IonMenuButton>
            </IonButtons>

            <IonTitle>{{ title ?? $route.params.id }}</IonTitle>
        </IonToolbar>
    </IonHeader>
</template>