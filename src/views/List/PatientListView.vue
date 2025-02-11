<template>
    <div class="d-flex justify-content-between" style="flex-direction: column; height: 100%">
      <div style="width:100%;padding:5px">
       <GridSearch :fetchData="fetchdata"/>
      </div>
  <v-table class="table-ht br-bt">
    <thead>
      <tr>
        <th v-for="(header, index) in headers" :key="index" scope="col" class="th-txt">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody v-if="(displayedPatients && displayedPatients.length > 0)">
      <tr v-for="(item, index) in displayedPatients" class="tr-txt" :key="index">
        <td class="id-text pointer" @click="editPatient(item.subjectId)">
          {{ item.suid ? item.suid : '' }}
        </td>
        <td>{{ item.full_name ? item.full_name : '-' }}</td>
        <td>{{ item.date_of_birth ? moment(item.date_of_birth).format('MM-DD-YYYY') : '-' }}</td>
        <td>{{ item.gender ? item.gender : '-' }}</td>
        <td>{{ item.email_id ? item.email_id : '-' }}</td>
        <td>{{ item.city ? item.city : '-' }}</td>
        <td>{{ item.mobile ? item.mobile : '-' }}</td>
        <td>{{ item.createdBy ? item.createdBy : '-' }}</td>
      </tr>
    </tbody>
    <tbody v-else>
        <tr>
          <td colspan="8" class="no-data-txt text-center" >No data found</td> 
        </tr>
      </tbody>
  </v-table>
  <div class="d-flex align-items-center justify-content-end br-bt pag-div-ht">
    <div class="d-flex align-items-center">
      <customPagination :totalItems="totalCount" :fetchData="fetchdata"> </customPagination>
    </div>
  </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import customPagination from '../../components/PaginationItem.vue';
import { usePaginationStore } from '../../stores/paginationStore';
import { computed, ref ,onMounted} from 'vue';
import { patientController } from '../../Controllers/patientController';
import { useStudyStore } from '../../stores/studyStore';
import { watch} from 'vue';
import { useFilterStore } from '../../stores/filterStore';
import GridSearch from '../../components/GridSearch.vue';
import moment from 'moment'
const router = useRouter();
const studyStore = useStudyStore();
const paginationStore = usePaginationStore();
const headers = ['PUID', 'Name', 'DOB', 'Gender', 'Email', 'City', 'Mobile No', 'Registered By'];
const data = ref([]);
const totalCount = ref(0)
const filterStore = useFilterStore();
const displayedPatients = computed(() => {
  return data.value.data
})

const filterHeaders=[
  { key: 'PUID', param: 'suid',value:'' ,isAdded:false},
  { key: 'Name', param: 'full_name' ,value:'',isAdded:false},
  { key: 'Gender', param: 'gender' ,value:'',isAdded:false}, 
  { key: 'Email', param: 'email_id',value:'',isAdded:false },
  { key: 'City', param: 'city' ,value:'',isAdded:false},
  { key: 'Mobile No', param: 'mobile' ,value:'',isAdded:false},
]

const fetchdata = async (params) => {
  const inputModel = {
    subjectModel: {
      pagination: {
        keySearch:true,
        count: 10,
        page: paginationStore.currentPage || 1,
        sort: 'desc.subjectId',
        search:  filterStore.filterParams ? filterStore.filterParams : ''
      },
      includeMeta: true,
      studyFilter: [studyStore.selectedStudy]
    }
  }
  const response = await patientController.getPatients(inputModel)
  if (response) {
    data.value = response ? response : [];
    totalCount.value = data.value.totalCount;
  }
}

const editPatient = (value) => {
  localStorage.setItem('subjectId', value)
  router.push({ name: 'patient', params: { path: 'edit' } })
}
onMounted(()=>{
  filterStore.setGridSearch(filterHeaders)
})
watch(
  () => studyStore.selectedStudy,
  (newStudy) => {
    fetchdata();
  },
  { immediate: true }
)
</script>
<style scoped>
.th-txt {
  font-size: 16px;
  font-weight: 500;
  color: #007bff;
  text-align: center;
}

.tr-txt {
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  text-align: center;
}
</style>
