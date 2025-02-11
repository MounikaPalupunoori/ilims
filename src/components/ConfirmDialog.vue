<template>
    <v-row justify="center">
        <v-dialog v-model="props.showDialog" transition="dialog-top-transition" width="420px">
            <v-card>
                <v-toolbar class="toolbar">
                    <div style="width: 100%;display: flex;">
                        <div class="display-flex flex-row align-items-center justify-content-center" style="width: 100%;">
                            <h5>Warning</h5>
                        </div>
                        <div class="close-icon" :style="{ 'pointer-events': loaderStore.loader ? 'none' : 'auto' }"
                            @click="props.closeDialog()"><v-icon icon="mdi mdi-close"></v-icon></div>
                    </div>
                </v-toolbar>
                <v-card-text>
                    <div class="">Your changes will not be saved, if you choose to exit this page.</div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <button type="button" @click="handleClose" class="btn border-btn m-2">Close</button>
                    <button type="button" class="btn filled-btn m-2 btn-wd" @click="handleOk">
                        Leave Page
                    </button>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { useLoaderStore } from '../stores/loaderStore';
const loaderStore = useLoaderStore();
const routers = useRouter();
const props = defineProps({
    closeDialog: {
        type: Function
    },
    router: String,
    showDialog: Boolean
})
const handleOk = async () => {
    routers.push(props.router)
}
const handleClose = async () => {
    props.closeDialog()
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