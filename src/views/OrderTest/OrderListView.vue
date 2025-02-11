<template>
  <div class="d-flex justify-content-between" style="flex-direction: column; height: 100%">
    <div style="width:100%;padding:5px">
       <GridSearch :fetchData="fetchdata"/>
      </div>
    <div>
      <Filters :filterButtons="filterButtons" />
    </div>
    <v-table class="table-ht br-bt">
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index" scope="col" class="th-txt">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody v-if="(displayList && displayList.length > 0)">
        <tr v-for="(item, index) in displayList" class="tr-txt" :key="index">
          <td class="id-text pointer" @click="navTo(item.accessionId, `orderTest`)">
            {{ item.accessionNumber ? item.accessionNumber : '' }}
          </td>
          <td>
            {{
              `${item.first_name ? item.first_name : ''}` +
              `${item.middle_name ? ' ' + item.middle_name : ''}` +
              `${item.last_name ? ' ' + item.last_name : ''}`
            }}
          </td>
          <td>{{ item.date_of_birth ? moment(item.date_of_birth).format('MM-DD-YYYY') : '-' }}</td>
          <td>{{ item.gender ? item.gender : '-' }}</td>
          <td>{{ item.physician_name ? item.physician_name : '-' }}</td>
          <td>{{ item.facility ? item.facility : '-' }}</td>
          <td>{{ item.collection_date ? moment(item.collection_date).format('MM-DD-YYYY hh:mm A') : '-' }}</td>
          <td>{{ item.received_date ? moment(item.received_date).format('MM-DD-YYYY hh:mm A') : '-' }}</td>
          <td>{{ item.status ? item.status : '-' }}</td>
          <td class="pointer">
            <img
              v-if="item.status === 'Ordered'"
              @click="navTo(item.accessionId, `sampleCollection`)"
              src="../../assets/Images/Ordered.png"
              alt="Ordered"
            />
            <img
              v-if="item.status === 'Closed'"
              src="../../assets/Images/collected.png"
              alt="Collected"
            />
            <img
              v-if="item.status === 'Accessioned'"
              src="../../assets/Images/Accessioned.png"
              alt="In Progress"
            />
            <img
              v-if="item.status === 'Collected'"
              @click="navTo(item.accessionId, `Accession`)"
              src="../../assets/Images/Accessioned.png"
              alt="In Progress"
            />
          </td>
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
import Filters from '../../components/FilterByItem.vue';
import { useRouter } from 'vue-router';
import { computed, watch, ref,onMounted} from 'vue';
import customPagination from '../../components/PaginationItem.vue';
import { usePaginationStore } from '../../stores/paginationStore';
import { useStudyStore } from '../../stores/studyStore';
import { patientController } from '../../Controllers/patientController';
import { useFilterStore } from '../../stores/filterStore';
import GridSearch from '../../components/GridSearch.vue';
import { useViewStore } from '../../stores/viewStore';
import moment from 'moment';
const router = useRouter();
const orderList = ref([]);
const totalCount = ref(0);
const studyStore = useStudyStore();
const paginationStore = usePaginationStore();
const filter = useFilterStore();
const viewStore = useViewStore();
const headers = [
  'Order No.',
  'Patient Name',
  'DOB',
  'Gender',
  'Requesting Physician',
  'Requesting Hospital',
  'Collection TimeStamp',
  'Received TimeStamp',
  'Status',
  'Actions'
]
const filterButtons = [
  {
    status: 'All',
    text: 'All',
    color: 'black'
  },
  {
    status: 'Ordered',
    text: 'Ordered',
    color: '#1AAF02'
  },
  {
    status: 'Collected',
    text: 'Collected',
    color: '#DCD300'
  },
  {
    status: 'Accessioned',
    text: 'Accessioned',
    color: '#0657F5'
  }
]
const displayList = computed(() => {
  return orderList.value.data || []
})
const filterHeaders=[
  { key: 'Order No', param: 'accessionNumber' ,isAdded:false},
  { key: 'Patient Name', param: 'full_name',isAdded:false },
  { key: 'Gender', param: 'gender' ,isAdded:false}, 
  { key: 'Requesting Physician', param: 'physician_name' ,isAdded:false},
  { key: 'Requesting Hospital', param: 'facility',isAdded:false },
  { key: 'Status', param: 'status',isAdded:false },
]

const fetchdata = async (urlParams) => {
  let data = ''
  switch (filter.filterValue) {
    case "All":
    case "":
      data = `${filter.filterParams ? `${filter.filterParams}` : ''}`;
      break;
    default:
      data = `status=${filter.filterValue}${filter.filterParams ? `&${filter.filterParams}` : ''}`;
      break;
  }
  const inputModel = {
    orderTestModel: {
      pagination: {
        keySearch:true,
        count: 10,
        page: paginationStore.currentPage || 1,
        sort: 'desc.accessionId',
        search: data
      },
      includeMeta: true,
      studyFilter: [studyStore.selectedStudy]
    }
  }
  const response = await patientController.getOrderList(inputModel)
  if (response) {
    orderList.value = response ? response : []
    totalCount.value = response.totalCount
  }
}
const navTo = (value, route) => {
  localStorage.setItem('accessionId', value)
  router.push({ name: route, params: { path: 'edit' } })
  filter.sucess('All');
}
onMounted(() => {
  filter.sucess('All');
  filter.setGridSearch(filterHeaders)
})


watch(
  [() => studyStore.selectedStudy, () => filter.filterValue],
  ([newStudy, newFilterValue], [oldStudy, oldFilterValue]) => {
    if (newStudy !== oldStudy || newFilterValue !== oldFilterValue) {
      fetchdata();
    }
  },
  { immediate: true }
);
</script>
