<script setup lang="ts" >
import { IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar } from "@ionic/vue";

defineProps<{ title?: string }>()
</script>

<template>
    <IonHeader :translucent="true">
        <IonToolbar>
            <IonButtons slot="start">
                <IonMenuButton color="primary"></IonMenuButton>
            </IonButtons>
            <IonTitle>{{ title ?? $route.params.id }}</IonTitle>
        </IonToolbar>
    </IonHeader>
</template>