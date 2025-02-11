<script setup>
import { FormKit } from '@formkit/vue';
import {useRunStore} from '../../stores/runStore';
const runStore = useRunStore();


const createCharacter = async () => {
    await new Promise((r) => setTimeout(r, 1000))
}

</script>
<template>
    <div>
        <FormKit type="form" :incomplete-message="false" :actions="false" @submit="createCharacter"
            style="background-color: white;">
            <div class="form-block">
                <div class="row row-cols-1 pt-2 justify-content-around  row-cols-sm-1 row-cols-md-2">
                    <div class="col-12 col-sm-12 col-md-5">
                        <div class="col mb-4">
                            <FormKit type="text" name="runName" id="runName" placeholder="Enter Description Here"
                                label="Description" />
                        </div>
                        <div class="col mb-4">
                            <FormKit type="select" name="runDescription" id="runDescription"
                                placeholder="Select Lib Prep Kit" :options="['Yes', 'No',]" label="Library Prep Kit" />
                        </div>
                        <div class="col mb-4">
                            <FormKit type="select" name="instrumentPlatform" id="instrumentPlatform"
                                placeholder="Select Index Adapter Kit" :options="['Yes', 'No',]"
                                label="Index Adapter Kit" />
                        </div>
                        <div>
                            <div>Secondary Analysis*</div>
                            <div class="row row-cols-3 pt-2">
                                <div class="col mb-4">
                                    <FormKit type="radio" name="contactPerson" id="contactPerson" label="No index" />

                                </div>
                                <div class="col mb-4">
                                    <FormKit type="radio" name="contactNumber" id="contactNumber" label="1 index" />
                                </div>
                                <div class="col mb-4">
                                    <FormKit type="radio" name="contactNumber" id="contactNumber" label="2 indexes" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>Read Type</div>
                            <div class="row row-cols-2 pt-2">
                                <div class="col mb-4">
                                    <FormKit type="radio" name="contactPerson" id="contactPerson" label="Single Read" />

                                </div>
                                <div class="col mb-4">
                                    <FormKit type="radio" name="contactNumber" id="contactNumber" label="Paired End" />
                                </div>
                            </div>
                        </div>
                        <div class="col mb-4">
                            <div>Read lengths</div>
                            <div class="row row-cols-4 pt-2">
                                <FormKit type="text" name="runName" id="runName" placeholder="Enter" label="Read 1" />
                                <FormKit type="text" name="runName" id="runName" placeholder="Enter" label="Index 1" />
                                <FormKit type="text" name="runName" id="runName" placeholder="Enter" label="Index 2" />
                                <FormKit type="text" name="runName" id="runName" placeholder="Enter" label="Read 2" />
                            </div>
                        </div>
                        <div class="col mb-4">
                            <FormKit type="text" name="libraryTubeID" id="libraryTubeID"
                                placeholder="Enter Library Tube ID Here" label="Library Tube ID" />
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-5">
                        <div class="pb-3 analysis-txt">Analysis Setting</div>
                        <div class="col">
                            <div class="col mb-4">
                                <FormKit type="text" name="runName" id="runName" validation="required"
                                    placeholder="Enter Adapter Read 1 Here" label="Adapter Read 1" />
                            </div>
                            <div class="col mb-4">
                                <FormKit type="text" name="runDescription" id="runDescription"
                                    placeholder="Enter Adapter Read 2 Here" label="Adapter Read 2" />
                            </div>
                            <div>
                                <div>Barcode Mismatches Index 1</div>
                                <div class="row row-cols-3 pt-2">
                                    <div class="col mb-4">
                                        <FormKit type="radio" name="contactPerson" id="contactPerson" label="0" />
                                    </div>
                                    <div class="col mb-4">
                                        <FormKit type="radio" name="contactNumber" id="contactNumber" label="1" />
                                    </div>
                                    <div class="col mb-4">
                                        <FormKit type="radio" name="contactNumber" id="contactNumber" label="2" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>Barcode Mismatches Index 2</div>
                                <div class="row row-cols-3 pt-2">
                                    <div class="col mb-4">
                                        <FormKit type="radio" name="contactPerson" id="contactPerson" label="0" />
                                    </div>
                                    <div class="col mb-4">
                                        <FormKit type="radio" name="contactNumber" id="contactNumber" label="1" />
                                    </div>
                                    <div class="col mb-4">
                                        <FormKit type="radio" name="contactNumber" id="contactNumber" label="2" />
                                    </div>
                                </div>
                            </div>
                            <div class="col mb-4">
                                <FormKit type="text" name="runName" id="runName" validation="required"
                                    placeholder="Enter Override Cycles Here" label="Override Cycles" />
                            </div>
                            <div>
                                <div>FASTQ Compression Format</div>
                                <div class="row row-cols-2 pt-2">
                                    <div class="col mb-4">
                                        <FormKit type="radio" name="contactPerson" id="contactPerson" label="gzip" />
                                    </div>
                                    <div class="col mb-4">
                                        <FormKit type="radio" name="contactNumber" id="contactNumber" label="DRAZEN" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-center my-3">
                    <div class="d-flex align-items-center">
                        <button type="button" class="btn border-btn mx-2" @click="runStore.configView2Close()"> Close</button>
                        <button type="button" class="btn filled-btn mx-2" @click="runStore.runViewNext()">Next</button>
                    </div>
                </div>
            </div>
        </FormKit>
    </div>
</template>

<style scoped>
.radio-sub {
    font-size: 8px;
    color: #A9A9A9;
    padding-left: 27px;
    margin-bottom: 0px;
}

.run-title {
    font-weight: 500;
    font-size: 22px;
}

.form-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
}

.analysis-txt {
    font-weight: 500;
    font-size: 20px;
}
</style>