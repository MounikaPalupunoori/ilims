<template>
    <div>
        <div class="d-flex align-items-center justify-content-between bg-color">
            <div>Run Review</div>
            <div class="pointer" @click="runStore.configView1Close()"><v-icon icon="mdi mdi-book-edit"></v-icon></div>
        </div>
        <div>
            <div class="row tr-bg-clr">
                <div class="col-4">Run Name</div>
                <div class="col-8">Run037</div>
            </div>
            <div class="row tr-bg-clr">
                <div class="col-4">Instrument Platform</div>
                <div class="col-8">NextSeq 1000/2000</div>
            </div>
            <div class="row tr-bg-clr">
                <div class="col-4">Read Lengths</div>
                <div class="col-8">
                    <div class="row">
                        <div class="col">
                            <div>Read 1</div>
                            <div>12</div>
                        </div>
                        <div class="col">
                            <div>Read 1</div>
                            <div>12</div>
                        </div>
                        <div class="col">
                            <div>Read 1</div>
                            <div>12</div>
                        </div>
                        <div class="col">
                            <div>Read 1</div>
                            <div>12</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row tr-bg-clr">
                <div class="col-4">Instrument Platform</div>
                <div class="col-8">NextSeq 1000/2000</div>
            </div>
        </div>
        <div class="d-flex align-items-center justify-content-between bg-color">
            <div>Configuration: Illumina DRAGEN FASTQ Generation - 3.8.4</div>
            <div class="pointer" @click="runStore.configView2Next()"><v-icon icon="mdi mdi-book-edit"></v-icon></div>
        </div>
        <div>
            <div class="row tr-bg-clr">
                <div class="col-4">Library Prep Kit</div>
                <div class="col-8">Not Specified</div>
            </div>
            <div class="row tr-bg-clr">
                <div class="col-4">Index Adapter Kit</div>
                <div class="col-8">Not Specified</div>
            </div>
            <div class="row tr-bg-clr">
                <div class="col-4">Samples</div>
                <div class="col-8">1 Samples</div>
            </div>
        </div>
        <div class="d-flex align-items-center justify-content-center my-3 py-3">
            <div class="d-flex align-items-center flex-wrap">
                <button type="button" class="btn border-btn mx-2" @click="runStore.runViewClose()"> Close</button>
                <button type="button" class="btn filled-btn mx-2 btn-wd">Save As Draft</button>
                <button type="button" class="btn filled-btn mx-2">Export</button>
                <button type="button" class="btn filled-btn mx-2 btn-wd">Save As Planned</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRunStore } from '../../stores/runStore';
const runStore = useRunStore();

</script>
<style scoped>
.bg-color {
    background-color: #007bff;
    color: white;
    padding: 5px;
}

.tr-bg-clr {
    background-color: #F4F3F3;
    margin: 2px 0px !important;
    padding: 3px 0px;
}
</style>