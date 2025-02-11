<template>
    <v-row justify="center">
        <v-dialog v-model="viewStore.confirmationBox" transition="dialog-top-transition" persistent width="420px">
            <v-card>
                <v-toolbar class="toolbar">
                    <div style="width: 100%;display: flex;">
                        <div class="display-flex flex-row align-items-center justify-content-center" style="width: 100%;">
                            <h5>Confirmation</h5>
                        </div>
                        <div class="close-icon" :style="{ 'pointer-events': loaderStore.loader ? 'none' : 'auto' }"
                            @click="viewStore.getConfirmationBox(false)"><v-icon icon="mdi mdi-close"></v-icon></div>
                    </div>
                </v-toolbar>
                <v-card-text>
                    <div class="">This action will initiate the Pipeline job for the current run. Are you sure you want to proceed?</div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <button type="button" class="btn border-btn m-2" @click="handleOk">Yes</button>
                    <button type="button" @click="handleClose" class="btn border-btn m-2">No</button>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { useLoaderStore } from '../stores/loaderStore';
import { useViewStore } from '../stores/viewStore';
const loaderStore = useLoaderStore();
const viewStore = useViewStore();
const router = useRouter();
const handleOk = async () => {
    viewStore.getEsignatureModal(true)
    viewStore.getConfirmationBox(false)
}
const handleClose = async () => {
   viewStore.getConfirmationBox(false)
}
</script>
<style scoped>
.close-icon {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
}

.toolbar {
    text-align: center;
    width: 100%;
    background-color: #007bffff;
    color: white;
}
</style>