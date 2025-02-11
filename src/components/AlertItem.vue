<script setup>
import { storeToRefs } from 'pinia';

import { useAlertStore } from '../stores/alertStore';

const alertStore = useAlertStore();

</script>

<template>
   <v-snackbar
      v-model="alertStore.alert" :timeout="alertStore.timeout" :location="alertStore.position" :color="alertStore.color"
    >
      {{ alertStore.message }}
      <template v-slot:actions>
        <v-icon @click="alertStore.close" icon="mdi mdi-close-circle-outline"/>
      </template>
    </v-snackbar>

</template>