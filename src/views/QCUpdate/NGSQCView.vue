<template>
    <div class="d-flex justify-content-between flex-column page-view-ht">
        <Filter :filterButtons="filterButtons" :filterTitle="filterTitle" />
        <v-table class="table-ht br-bt">
            <thead>
                <tr class="tr-bg">
                    <th v-for="(header, index) in headers" :key="index" scope="col" class="th-txt">
                        {{ header }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index ) in patients" class="tr-txt" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.bareCode }}</td>
                    <td>{{ item.PUID }}</td>
                    <td>{{ item.SampleType }}</td>
                    <td>{{ item.CollectionDate }}</td>
                    <td>{{ item.ReceiptDate }}</td>
                    <td>{{ item.bookedDate }}</td>
                    <td>{{ item.gender }}</td>
                    <td>{{ item.sampleType }}</td>
                    <td class="pointer" @click="router.push('/QCReport')"><img src="../../assets/Images/actions.png" /></td>
                </tr>
            </tbody>
        </v-table>
        <div class="d-flex align-items-center justify-content-end br-bt pag-div-ht">
            <div class="d-flex align-items-center">
                <customPagination :totalItems="patients.length">
                </customPagination>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import Filter from '../../components/FilterByItem.vue';
import customPagination from '../../components/PaginationItem.vue';
const router = useRouter();
const filterTitle = "Search Filters"
const filterButtons = [
    {
        text: "Run ID",
        color: "#A9A9A9"
    },
    {
        text: "Starting Date",
        color: "#A9A9A9"
    },
    {
        text: "End Date",
        color: "#A9A9A9"
    },
    {
        text: "Score",
        color: "#A9A9A9"
    },
];
const headers = [
    'SR No.',
    'Patient ID',
    'Run ID',
    'Starting Date',
    'End Date',
    'No.of Samples',
    'Data Generated',
    'Q30 Score',
    'Passing Filter',
    'Action',
]
const patients = [
    {
        bareCode: "RUN012",
        PUID: "02/07/2022",
        SampleType: "02/10/2022",
        CollectionDate: "85",
        ReceiptDate: "38",
        bookedDate: "390",
        gender: " 95",
        sampleType: "85",
        status: "38",
    },
    {
        bareCode: "RUN012",
        PUID: "02/07/2022",
        SampleType: "02/10/2022",
        CollectionDate: "85",
        ReceiptDate: "38",
        bookedDate: "390",
        gender: " 95",
        sampleType: "85",
        status: "38",
    },
    {
        bareCode: "RUN012",
        PUID: "02/07/2022",
        SampleType: "02/10/2022",
        CollectionDate: "85",
        ReceiptDate: "38",
        bookedDate: "390",
        gender: " 95",
        sampleType: "85",
        status: "38",
    },
]
</script>
<style scoped></style>