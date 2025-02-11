<template>
  <div>
    <div class="row">
      <div class="col-12" v-if="addButtonStore.btnTitle.label">
        <div v-for="page in header.Headers" :key="page.label">
          <div v-if="studyStore.selectedStudy != 'select study'">
            <button v-if="page.name === routerPath" @click="navigateTo(page)" class="add-btn">
              {{ addButtonStore.btnTitle.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import { watchEffect } from 'vue'
let routerPath = ''
import { useAddButtonStore } from '../stores/addButtonStore';
import { useStudyStore } from '../stores/studyStore';
import header from '../Constants/header';
import { useBatchListStore } from '../stores/batchListStore';
const addButtonStore = useAddButtonStore();
const studyStore = useStudyStore();
const batchStore = useBatchListStore();

const navigateTo = (path) => {
  if (path.name === routerPath) {
    if (path.label === 'Add Patient') {
      localStorage.setItem('subjectId', '')
      router.push({ name: 'patient', params: { path: 'create' } })
    } else if (path.label === 'Order New Test') {
      localStorage.setItem('subjectId', '')
      localStorage.setItem('accessionId', '')
      router.push({ name: 'orderTest', params: { path: 'create' } })
    } else {
      router.push(path.navTo)
    }
    const getvalue = localStorage.getItem('lipTab');
    let data = '';
    if ( getvalue === 'day1' && path.name === 'libBatchList') {
          data = 'DNA_ISOLATION_PASSED';
          localStorage.setItem('sampleStatus', 'DNA_ISOLATION_PASSED');
        }
        else if (getvalue === 'day2' && path.name === 'libBatchList') {
          data = 'LIB_PREP_DAY1_PASSED';
          localStorage.setItem('sampleStatus', 'LIB_PREP_DAY1_PASSED');
        }
        else {
          data = path.sampleStatus;
          localStorage.setItem('sampleStatus', data);
        }
        addButtonStore.getsampleStatus(data);
  }
}
watchEffect(
  () => {
    const selectedStudy = router.currentRoute;
    const sampleStatus = localStorage.getItem('sampleStatus');
    if (
      (selectedStudy && addButtonStore.sampleStatus) ||
      (addButtonStore.sampleStatus === undefined) || (addButtonStore.sampleStatus === '')
    ) {
      header.Headers.forEach(value => {
        let pageTitle = '';
        let batchNumber = value.batchNumber ? batchStore.batchNumber : ''
        if (value.name === router.currentRoute.value.name) {
          if (Array.isArray(value.pageTitle) && value.pageTitle.length > 0) {
            value.pageTitle.forEach(item => {
              if (item.status === sampleStatus) {
                pageTitle = item.title;
              }
            });
          } else {
            pageTitle = value.pageTitle;
          }
          addButtonStore.success(value.label, pageTitle,batchNumber);
        }
      });
      routerPath = router.currentRoute.value.name
    }
  },
  { immediate: true }
)
</script>
<style scoped>
.add-btn {
  background: white;
  border: none;
  font-size: 14px;
  font-weight: 400;
  color: #007bff;
  height: 35px;
  width: 100%;
  padding: 0px 5px;
}
</style>
