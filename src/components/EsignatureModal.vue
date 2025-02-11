<template>
    <v-row justify="center">
        <v-dialog v-model="viewStore.eSignatureModal" transition="dialog-top-transition" persistent width="auto">
            <v-card>
                <v-toolbar class="toolbar">
                    <div style="width: 100%;display: flex;">
                        <div class="display-flex align-items-center justify-content-center" style="width: 100%;">
                            <h5>Electronic Signature</h5>
                        </div>
                        <div class="close-icon" :style="{ 'pointer-events': loaderStore.loader ? 'none' : 'auto' }" @click="viewStore.getEsignatureModal(false)"><v-icon
                                icon="mdi mdi-close"></v-icon></div>
                    </div>
                </v-toolbar>
                <FormKit type="form" :incomplete-message="false"  #default="{ state: { valid } }" :actions="false" :style="{ 'pointer-events': loaderStore.loader ? 'none' : 'auto'}" style="padding: 0px;" v-model="formData"
                    @submit="submit">
                    <div class="container-fluid">
                        <div class="col mb-4 pt-2">
                            <FormKit type="text" name="changeReasonDetail" id="changeReasonDetail" minlength="6"
                                placeholder="Enter reason for this operation" label="Enter reason for this operation"
                                validation="required|length:6" validation-visibility="none"/>
                        </div>
                        <p>{{props.text}}</p>
                        <div class="row row-cols-2 row-cols-sm-2 row-cols-md-2 pt-2">
                            <div class="col mb-4">
                                <FormKit type="text" v-model="UserEmail" readOnly disabled="true" name="username"
                                    id="username" placeholder="john@xyz.com" label="Username" />
                            </div>
                            <div class="col mb-4">
                                <FormKit name="password" type="password"  id="password" placeholder="***********" label="Password"
                                    validation="required" />
                            </div>
                        </div>
                    </div>
                    <v-card-actions class="justify-end">
                        <FormKit 
                        style="height: 38px;
                        background-color: #007bffff !important;
                        align-items: center;
                        border-radius: 6px;
                        letter-spacing: 0.8px"
                       :disabled="!valid"
                        type="submit" label="Submit" />
                    </v-card-actions>
                </FormKit>

            </v-card>
        </v-dialog>
    </v-row>
</template>
<script setup>
import { FormKit } from '@formkit/vue';
import { useViewStore } from '../stores/viewStore';
import { useLoaderStore } from '../stores/loaderStore';
const viewStore = useViewStore();
const loaderStore = useLoaderStore();
const UserEmail = localStorage.getItem('userName');
let formData = {}
const props = defineProps({
    searchResults: Array,
    handleSubmit: {
        type: Function
    },
    totalCount: Number,
    text:String
})
const submit = async (fields) => {
    viewStore.getEsignatureForm(formData);
    props.handleSubmit();
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