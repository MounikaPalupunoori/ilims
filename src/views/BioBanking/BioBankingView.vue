<template>
    <div class="d-flex justify-content-between flex-column page-view-ht">
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
                    <td>{{ item.sampleID }}</td>
                    <td>{{ item.libraryPoolID }}</td>
                    <td>{{ item.libraryID }}</td>
                    <td>{{ item.boxID }}</td>
                    <td>{{ item.wellLocation }}</td>
                    <td class="pointer" @click="router.push('/QCReport')"><img src="../../assets/Images/actions.png" /></td>
                </tr>
            </tbody>
        </v-table>
        <div class="d-flex align-items-center justify-content-center p-3">
            <div class="d-flex align-items-center">
                <button type="button" class="btn border-btn m-2"> Close</button>
                <button type="submit" class="btn filled-btn m-2" @click="router.push('/patientList')">Save</button>
            </div>
        </div>
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
import customPagination from '../../components/PaginationItem.vue';
const router = useRouter();

const headers = [
    'Sample ID',
    'Library Pool ID',
    'Library ID',
    'Box ID',
    'Well Location',
    'Action',
]
const patients = [
    {
        sampleID: "RUN012",
        libraryPoolID: "02/07/2022",
        libraryID: "85",
        boxID: "38",
        wellLocation: "390",
    },
    {
        sampleID: "RUN012",
        libraryPoolID: "02/07/2022",
        libraryID: "85",
        boxID: "38",
        wellLocation: "390",
    },
    {
        sampleID: "RUN012",
        libraryPoolID: "02/07/2022",
        libraryID: "85",
        boxID: "38",
        wellLocation: "390",
    },
]
</script>
<style scoped></style>