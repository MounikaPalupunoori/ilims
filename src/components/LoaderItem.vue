<template>
    <div class="loaderPos" v-if="loader">
        <div class="loaderCenter">
            <v-progress-circular style="z-index: 111111;" indeterminate color="blue"></v-progress-circular>
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useLoaderStore } from '../stores/loaderStore';
const loaderStore = useLoaderStore();
const { loader } = storeToRefs(loaderStore);
</script>
<style scoped>
.loaderPos {
    width: 100%;
    height: 100%;
    position: absolute;
    background: #ebb2b200;
}

.loaderCenter {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}</style>