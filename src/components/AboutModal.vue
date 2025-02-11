<template>
    <v-row justify="center">
        <v-dialog v-model="props.showModal" transition="dialog-top-transition" persistent width="auto" height="60%">
            <v-card style="height: 100%;" class="p-2">
                <div class="d-flex justify-end close-icon" :style="{ 'pointer-events': loaderStore.loader ? 'none' : 'auto' }" @click="props.closeModal"><v-icon
                                icon="mdi mdi-close"></v-icon></div>
                <div class="div-flex">
                    <div>
                    <div class="img-flex"><img src="../assets/Images/itracker.svg" alt=""/></div>
                    <div class="d-flex align-items-center justify-center"><h3>iLIMS</h3></div>
                    <p>Laboratory Information Management System</p>
                <v-table class="mt-5">
                    <t-body>
                        <tr>
                            <td>Product Version:</td>
                            <td class="pr-td">{{productVersion}}</td>
                        </tr>
                        <tr>
                            <td>Build Number:</td>
                            <td class="pr-td">{{ buildNumber }}</td>
                        </tr>
                        <tr>
                            <td>Build Date:</td>
                            <td class="pr-td">{{ buildDate }}</td>
                        </tr>
                    </t-body>
                </v-table>
                </div>
                <p class="copy-right">Coyright 2022 iNDX.Ai. 20380 Town Center Lane #218, Cupertino, CA 95014. All rights reserved. Email: support@indxtechnology.com</p>
            </div>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script setup>
import { useLoaderStore } from '../stores/loaderStore';
const loaderStore = useLoaderStore();
const productVersion = import.meta.env.VITE_APP_BUILD_VERSION;
const buildNumber = import.meta.env.VITE_APP_BUILD_NUMBER;
const buildDate = import.meta.env.VITE_APP_BUILD_DATE;
const props = defineProps({
    showModal:Boolean,
    closeModal: {
        type: Function
    },
})

</script>
<style scoped>
.div-flex{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%
}
.close-icon{
    cursor: pointer;
}
.copy-right{
    font-size: 0.8rem;
    color: rgb(92, 104, 115);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0px 1rem; 
}
.pr-td{
    padding: 0px 1rem;
}
.img-flex{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>