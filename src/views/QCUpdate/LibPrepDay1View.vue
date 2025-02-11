<template>
  <div class="d-flex justify-content-between flex-column page-view-ht">
    <Filters :filterButtons="filterButtons" :filterTitle="filterTitle" />
    <v-table class="table-ht br-bt">
      <thead>
        <tr class="tr-bg">
          <th v-for="(header, index) in headers" :key="index" scope="col" class="th-txt">
            <v-row no-gutters align="center">
              <v-col v-if="header === 'Patient ID'"><v-checkbox hide-details></v-checkbox></v-col>
              <v-col>{{ header }}</v-col>
            </v-row>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in patients" class="tr-txt" :key="index">
          <td>
            <v-row no-gutters align="center">
              <v-col><v-checkbox style="color: #007bff" hide-details></v-checkbox></v-col>
              <v-col>{{ item.patientID }}</v-col>
            </v-row>
          </td>
          <td>{{ item.sampleID }}</td>
          <td>{{ item.indexAdapterKit }}</td>
          <td>{{ item.index1 }}</td>
          <td>{{ item.index2 }}</td>
          <td>{{ item.testCode }}</td>
          <td>{{ item.testName }}</td>
          <td>{{ item.indexAdapterKit }}</td>
          <td>{{ item.gender }}</td>
          <td>{{ item.sampleType }}</td>
        </tr>
      </tbody>
    </v-table>
    <div class="d-flex align-items-center justify-content-center p-3">
      <div class="d-flex align-items-center">
        <button type="button" class="btn filled-btn m-2">Save</button>
        <button type="submit" class="btn filled-btn m-2 btn-wd" @click="saveSelection">
          Save & Proceed
        </button>
      </div>
    </div>
    <div class="d-flex align-items-center justify-content-end br-bt pag-div-ht">
      <div class="d-flex align-items-center">
        <customPagination :totalItems="patients.length"> </customPagination>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import customPagination from '../../components/PaginationItem.vue'
import Filters from '../../components/FilterByItem.vue'
const router = useRouter()
const saveSelection = () => {
  router.push('/batchCreation')
}

const filterTitle = 'Search Filters'
const filterButtons = [
  {
    text: 'Sample ID',
    color: '#A9A9A9'
  },
  {
    text: 'Patient ID',
    color: '#A9A9A9'
  },
  {
    text: 'Pending',
    color: '#A9A9A9'
  },
  {
    text: 'Submitted',
    color: '#A9A9A9'
  },
  {
    text: 'gender',
    color: '#A9A9A9'
  },
  {
    text: 'Panel',
    color: '#A9A9A9'
  }
]
const headers = [
  'Patient ID',
  'Sample ID',
  'Index Adapter Kit',
  'Index 1',
  'Index 2',
  'Test Code',
  'Test Name',
  'Booked Date',
  'testName',
  'Sample Type'
]
const patients = [
  {
    patientID: 'ODX04',
    sampleID: '1587',
    indexAdapterKit: 'SSXTHS2_1_96_A01',
    index1: 'ACACAGAA',
    index2: 'CAACCACA',
    testCode: 'OC0124',
    testName: 'OncoIndx1000',
    bookedDate: '12-01-2022',
    gender: 'Male',
    sampleType: 'FFPE'
  },
  {
    patientID: 'ODX04',
    sampleID: '1587',
    indexAdapterKit: 'SSXTHS2_1_96_A01',
    index1: 'ACACAGAA',
    index2: 'CAACCACA',
    testCode: 'OC0124',
    testName: 'OncoIndx1000',
    bookedDate: '12-01-2022',
    gender: 'Female',
    sampleType: 'FFPE'
  },
  {
    patientID: 'ODX04',
    sampleID: '1587',
    indexAdapterKit: 'SSXTHS2_1_96_A01',
    index1: 'ACACAGAA',
    index2: 'CAACCACA',
    testCode: 'OC0124',
    testName: 'OncoIndx1000',
    bookedDate: '12-01-2022',
    gender: 'Male',
    sampleType: 'FFPE'
  }
]
</script>
<style scoped></style>
