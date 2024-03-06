<template>
    <ion-app>
      <ion-split-pane content-id="main-content">
        <ion-menu content-id="main-content" type="reveal">
          <ion-content>
            <ion-list id="inbox-list">
              <ion-list-header></ion-list-header>
  
              <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
                <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                  <ion-label>{{ p.title }}</ion-label>
                </ion-item>
              </ion-menu-toggle>
            </ion-list>
  
          </ion-content>
        </ion-menu>
        <slot/>

      </ion-split-pane>
    </ion-app>
  </template>
  
<script lang="ts" setup>
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonLabel,
} from '@ionic/vue';
import { getTypes } from "../packages/models/words"

const wordTypes = getTypes()

const appPages = [
  {
    title: 'ALL',
    url: '/',
  },
  {
    title: "Daily",
    url: "/daily"
  },
  ...wordTypes.map((type) => ({
    title: type,
    url: `/${type}`
  }))
];

let selectedIndex = 0
</script>