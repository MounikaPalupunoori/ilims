<template>
    <div class="page-view-ht">
        <div class="row g-0 page-view-ht">
            <div class="col col-md-2 card box-shadow ht-100" style="border-color: white;">
                <div class="pg-title row1-br">Summary Report</div>
                <div class="d-flex  py-2 px-3" style="flex-direction: column;">
                    <div class="pb-3"><input class="search-in" type="search" placeholder="Search" /></div>
                    <div @click="navTo()" class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>
                    <div class="search-result">0400_</div>


                </div>
            </div>
            <div v-if="!fastQC" class="col col-md-10 ht-100">
                <div class="d-flex row1-br align-items-center px-3">
                    <div class="col col-md-8 pg-title align-items-center justify-content-center d-flex">Summary Report _
                        MappingMetrics Table</div>
                    <div class="col col-md-4"><input class="search-in" type="search" placeholder="Search" /></div>
                </div>
                <v-table>
                    <thead>
                        <tr class="tr-bg">
                            <th v-for="(header, index) in headers" :key="index" scope="col" class="th-txt">
                                {{ header }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index ) in patients" class="tr-txt" :key="index">
                            <td>{{ item.sample }}</td>
                            <td>{{ item.totalInputReads }}</td>
                            <td>{{ item.nofUniqueReads }}</td>
                            <td>{{ item.QCFailedReads }}</td>
                            <td>{{ item.MappedReads }}</td>
                            <td>{{ item.TotalBases }}</td>
                            <td>{{ item.MappedBasesR1 }}</td>
                            <td>{{ item.Q30Bases }}</td>
                            <td>{{ item.status }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </div>
            <div v-else class="col col-md-10">
                <div class="d-flex row1-br align-items-center px-3 justify-content-between">
                    <div class="fast-btn">
                        Fast QC</div>
                    <div class="pg-title">Sample: 0400_</div>
                    <div></div>
                </div>
                <div class="p-5">Graph view</div>
                <div class="d-flex align-items-center justify-content-center p-3 br-bt">
                    <div class="d-flex align-items-center">
                        <button type="button" class="btn filled-btn m-2">Save</button>
                        <button type="submit" class="btn filled-btn m-2 btn-wd"> Save &
                            Proceed</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
const fastQC = ref(false)
const headers = [
    'Sample',
    'Total Input Reads',
    'No. of Unique Reads',
    'QC Failed Reads',
    'Mapped Reads',
    'Total Bases',
    'Mapped Bases R1',
    'Q30 Bases',
    'Status',
]
const patients = [
    {
        sample: "0400_",
        totalInputReads: "2205096",
        nofUniqueReads: "2205096",
        QCFailedReads: "0",
        MappedReads: "27088109",
        TotalBases: "3451119496",
        MappedBasesR1: " 2045121199",
        Q30Bases: "3287180720",
        status: "Not Specified",
    },
    {
        sample: "0400_",
        totalInputReads: "2205096",
        nofUniqueReads: "2205096",
        QCFailedReads: "0",
        MappedReads: "27088109",
        TotalBases: "3451119496",
        MappedBasesR1: " 2045121199",
        Q30Bases: "3287180720",
        status: "Failed",
    },
    {
        sample: "0400_",
        totalInputReads: "2205096",
        nofUniqueReads: "2205096",
        QCFailedReads: "0",
        MappedReads: "27088109",
        TotalBases: "3451119496",
        MappedBasesR1: " 2045121199",
        Q30Bases: "3287180720",
        status: "Passed",
    },
    {
        sample: "0400_",
        totalInputReads: "2205096",
        nofUniqueReads: "2205096",
        QCFailedReads: "0",
        MappedReads: "27088109",
        TotalBases: "3451119496",
        MappedBasesR1: " 2045121199",
        Q30Bases: "3287180720",
        status: "Passed",
    },
    {
        sample: "0400_",
        totalInputReads: "2205096",
        nofUniqueReads: "2205096",
        QCFailedReads: "0",
        MappedReads: "27088109",
        TotalBases: "3451119496",
        MappedBasesR1: " 2045121199",
        Q30Bases: "3287180720",
        status: "Passed",
    },
    {
        sample: "0400_",
        totalInputReads: "2205096",
        nofUniqueReads: "2205096",
        QCFailedReads: "0",
        MappedReads: "27088109",
        TotalBases: "3451119496",
        MappedBasesR1: " 2045121199",
        Q30Bases: "3287180720",
        status: "Passed",
    },
    {
        sample: "0400_",
        totalInputReads: "2205096",
        nofUniqueReads: "2205096",
        QCFailedReads: "0",
        MappedReads: "27088109",
        TotalBases: "3451119496",
        MappedBasesR1: " 2045121199",
        Q30Bases: "3287180720",
        status: "Passed",
    },
    {
        sample: "0400_",
        totalInputReads: "2205096",
        nofUniqueReads: "2205096",
        QCFailedReads: "0",
        MappedReads: "27088109",
        TotalBases: "3451119496",
        MappedBasesR1: " 2045121199",
        Q30Bases: "3287180720",
        status: "Passed",
    },
    {
        sample: "0400_",
        totalInputReads: "2205096",
        nofUniqueReads: "2205096",
        QCFailedReads: "0",
        MappedReads: "27088109",
        TotalBases: "3451119496",
        MappedBasesR1: " 2045121199",
        Q30Bases: "3287180720",
        status: "Passed",
    },
]
const navTo = () => {
    fastQC.value = !fastQC.value
}
</script>
<style scoped>
.pg-title {
    color: #007bff;
    font-weight: 500;
    font-size: 16px;
    padding: 1rem;
    text-align: center;
}

.row1-br {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.search-in {
    border: 1px solid #A9A9A9;
    padding: 5px;
    color: #A9A9A9;
    width: 100%;

}

.search-result {
    color: #2996FB;
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
}

.fast-btn {
    background-color: #2996FB;
    color: white;
    padding: 2px 5px;
}
.ht-100{
    height: 100%;
    overflow-y: auto;
}
</style>