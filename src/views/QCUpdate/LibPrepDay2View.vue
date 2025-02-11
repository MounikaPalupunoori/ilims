<template>
  <div class="d-flex justify-content-between flex-column page-view-ht">
    <Filter :filterButtons="filterButtons" :filterTitle="filterTitle" />
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
              <v-col>{{ item.bareCode }}</v-col>
            </v-row>
          </td>
          <td>{{ item.PUID }}</td>
          <td>{{ item.SampleType }}</td>
          <td>{{ item.CollectionDate }}</td>
          <td>{{ item.ReceiptDate }}</td>
          <td>{{ item.bookedDate }}</td>
          <td>{{ item.gender }}</td>
          <td>{{ item.sampleType }}</td>
          <td>{{ item.status }}</td>
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
import Filter from '../../components/FilterByItem.vue'
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
    text: 'Status',
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
  'Pool ID',
  'Library ID',
  'Index Make,Type and Well ID',
  'Index 1',
  'Index 2',
  'Test Code',
  'Test Name'
]
const patients = [
  {
    bareCode: 'ODX04',
    PUID: '1587',
    SampleType: 'LPOOL027',
    CollectionDate: 'OC0124',
    ReceiptDate: 'OncoIndx1000',
    bookedDate: 'ACACAGAA',
    gender: ' CAACCACA',
    sampleType: 'OC0124',
    status: 'OncoIndx1000'
  },
  {
    bareCode: 'ODX04',
    PUID: '1587',
    SampleType: 'LPOOL027',
    CollectionDate: 'OC0124',
    ReceiptDate: 'OncoIndx1000',
    bookedDate: 'ACACAGAA',
    gender: ' CAACCACA',
    sampleType: 'OC0124',
    status: 'OncoIndx1000'
  },
  {
    bareCode: 'ODX04',
    PUID: '1587',
    SampleType: 'LPOOL027',
    CollectionDate: 'OC0124',
    ReceiptDate: 'OncoIndx1000',
    bookedDate: 'ACACAGAA',
    gender: ' CAACCACA',
    sampleType: 'OC0124',
    status: 'OncoIndx1000'
  }
]
</script>
<style scoped></style>
