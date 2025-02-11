<script setup>
import { FormKit } from '@formkit/vue';
import RunConfigurationView from './RunConfigurationView.vue';
import RunReview from './RunReview.vue'
import {useRunStore} from '../../stores/runStore';
import { useRouter } from 'vue-router';
const router = useRouter();
const runStore = useRunStore();

const createCharacter = async () => {
    await new Promise((r) => setTimeout(r, 1000))
}
 const navTo=()=>{
    runStore.configView1Next()
 }
 const navToConfig2=()=>{
   runStore.configView2Next()
 }
</script>
<template>
    <div class="container-fluid p-3" style="height: 100%;overflow-y: auto;">
        <FormKit type="form" :incomplete-message="false" :actions="false" @submit="createCharacter"
            style="background-color: white;">
            <div v-if="runStore.createRunView" class="run-title">Run Settings</div>
            <div v-if="runStore.configView1" class="run-title">Configuration</div>
            <div v-if="runStore.configView2" class="run-title">Configuration: Illumina DRAGEN FASTQ Generation - 3.8.4
            </div>
            <div v-if="runStore.createRunView" class="form-block">
                <div class="col">
                    <div class="col mb-4">
                        <FormKit type="text" name="runName" id="runName" validation="required" placeholder="Enter Run Name Here"
                            label="Run Name*" />
                    </div>
                    <div class="col mb-4">
                        <FormKit type="text" name="runDescription" id="runDescription" placeholder="Enter Run Description Here"
                            label="Run Description" />
                    </div>
                    <div class="col mb-4">
                        <FormKit type="select" name="instrumentPlatform" id="instrumentPlatform" placeholder="Select Instrument Platform"
                        :options="['Yes', 'No',]"  label="Instrument Platform*" validation="required" />
                    </div>
                    <div>
                    <div>Secondary Analysis*</div>
                    <div class="row row-cols-2 pt-2">
                        <div class="col mb-4">
                            <FormKit type="radio" name="contactPerson" id="contactPerson" label="Base Space" />
                            <p class="radio-sub">Storage and Compute iCredit charges may apply</p>
                        </div>
                        <div class="col mb-4">
                            <FormKit type="radio" name="contactNumber" id="contactNumber" label="Local" />
                        </div>
                    </div>
                </div>
                    <div class="col mb-4">
                        <FormKit type="text" name="libraryTubeID" id="libraryTubeID" placeholder="Enter Library Tube ID Here"
                            label="Library Tube ID" />
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-center my-3">
                    <div class="d-flex align-items-center">
                        <button type="button" class="btn border-btn mx-2" @click="router.push('/NGSRuns')"> Close</button>
                        <button type="button" class="btn filled-btn mx-2" @click="navTo()">Next</button>
                    </div>
                </div>
            </div>
            <div v-if="runStore.configView1" class="form-block">
                <div class="col">
                    <div class="col mb-4">
                        <FormKit type="select" name="runName" id="runName" validation="required"  :options="['Illumina DRAGEN FASTQ Generation - 3.8.4', 'Illumina DRAGEN FASTQ Generation - 3.8.4',]" placeholder="Select Application"
                            label="Application*" />
                    </div>
                    <div class="col mb-4">
                        <FormKit type="text" name="runDescription" id="runDescription" placeholder="Enter Description Here"
                            label="Description" />
                    </div>
                    <div class="col mb-4">
                        <FormKit type="select" name="instrumentPlatform" id="instrumentPlatform" placeholder="Select Library Prep Kit"
                        :options="['Yes', 'No',]"  label="Library Prep Kit" />
                    </div>
                    <div class="col mb-4">
                        <FormKit type="select" name="libraryTubeID" id="libraryTubeID" placeholder="Select Index Adapter Kit"
                        :options="['Yes', 'No',]" label="Index Adapter Kit" />
                    </div>
                </div>
               
                <div class="d-flex align-items-center justify-content-center my-3">
                    <div class="d-flex align-items-center">
                        <button type="button" class="btn border-btn mx-2" @click="runStore.configView1Close()"> Close</button>
                        <button type="button" class="btn filled-btn mx-2" @click="navToConfig2()">Next</button>
                    </div>
                </div>
            </div>
            <div v-if="runStore.configView2" class="pt-3" :class="{ 'ht': runStore.configView2 === true }">
                <RunConfigurationView />
                </div>
                <div v-if="runStore.runView" class="pt-3 form-block" :class="{ 'ht': runStore.runView === true }">
               <RunReview></RunReview>
                </div>
        </FormKit>
    </div>
</template>

<style scoped>
.radio-sub{
    font-size: 8px;
    color: #A9A9A9;
    padding-left: 27px;
    margin-bottom: 0px;
}
.run-title{
    font-weight: 500;
    font-size: 22px;
}
.form-block{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    max-width: 500px;
}
.ht{
    max-width: 100%;
}
</style>