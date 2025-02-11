<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<template>
  <div class="d-flex justify-content-between flex-column page-view-ht">
    <div style="width:100%;padding:5px">
       <GridSearch :fetchData="fetchBatchList"/>
      </div>
    <div>
      <Filters :filterButtons="props.batchType !== 'NGS' ? filterButtons : ngsFilter" :batchType="props.batchType"/>
    </div>
    <div>
      <v-tabs v-model="tab" background-color="transparent" slider-color="#007bff" color="#007bff" v-if="(props.batchType != 'DNA_ISOLATION') && props.batchType != 'NGS'">
        <v-tab value="day1" @click="handleTab">LIB_PREP_DAY1</v-tab>
        <v-divider class="ms-3" inset vertical></v-divider>
        <v-tab value="day2" @click="handleTab">LIB_PREP_DAY2</v-tab>
      </v-tabs>
    </div>
    <v-table class="table-ht br-bt" v-if="(tab == 'day1' || tab == 'day2' || tab == null)">
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index" scope="col" class="th-txt">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody v-if="(displayBatchList && displayBatchList.length > 0)">
        <tr v-for="(item, index) in displayBatchList" class="tr-txt" :key="index">
          <td>{{ index + 1 }}</td>
          <td class="id-text pointer" @click="navTo(capitalize(item.batchStatus), item)">
            {{ item.batchNumber }}
          </td>
          <td v-if="props.batchType === 'NGS'">
            {{ getAttributeValue(item, 'run_id') }}
          </td>
          <td>{{ item.noOfSamples }}</td>
          <td>
            {{ getAttributeValue(item, 'generated_by') }}
          </td>
          <td>
            {{ getAttributeValue(item, 'generated_on') }}
          </td>
          <td v-if="props.batchType != 'NGS'">
            {{ getAttributeValue(item, 'accepted_by') }}
          </td>
          <td v-if="props.batchType != 'NGS'">
            {{ getAttributeValue(item, 'accepted_on') }}
          </td>
          <td :style="getStatusStyle(capitalize(item.batchStatus))" style="font-weight: 600">
            {{ item.batchStatus }}
          </td>
          <td v-if="props.batchType === 'NGS'">
            <img class="mx-2" v-if="item.batchAttributes.find(attr => attr.attributeName === 'ngs_input_file_ids' && !(attr.attributeValue == '' || attr.attributeValue == null))" title="Download Run" color="blue-darken-2" @click="handleDownload(item, 'ngs_input_file_ids')" src="../../assets/Images/csvIcon.png" style="width:28px;height:28px" alt="Download Run"/>
            <img v-if="item.batchAttributes.find(attr => attr.attributeName === 'meta_file_id' && !(attr.attributeValue == '' || attr.attributeValue == null))" title="Download Meta"  @click="handleDownload(item, 'meta_file_id')" src="../../assets/Images/excelIcon.png" style="width:28px;height:28px" alt="Download Meta"/>
          </td>
        </tr>
      </tbody>
      <tbody v-else if="">
        <tr>
          <td colspan="8" class="no-data-txt text-center" >No data found</td> 
        </tr>
      </tbody>
    </v-table>
    <EsignatureModal v-if="viewStore.eSignatureModal" :handleSubmit="downloadMetaFile"
    :text=EsignatureText() />
    <div class="d-flex align-items-center justify-content-end br-bt pag-div-ht">
      <div class="d-flex align-items-center">
        <customPagination :totalItems="totalCount" :fetchData="fetchBatchList"> </customPagination>
      </div>
    </div>
  </div>
</template>
<script setup>
import Filters from '../../components/FilterByItem.vue';
import customPagination from '../../components/PaginationItem.vue';
import { usePaginationStore } from '../../stores/paginationStore';
import { useStudyStore } from '../../stores/studyStore';
import { useRouter } from 'vue-router';
import { SampleController } from '../../Controllers/sampleController';
import EsignatureModal from '../../components/EsignatureModal.vue';
import { useViewStore } from '../../stores/viewStore';
import instance from '../../Utils/axiosInterceptors';
import { useLoaderStore } from '../../stores/loaderStore';
import { useAlertStore } from '../../stores/alertStore';
import { ref } from 'vue';
import { useKitStore } from '../../stores/kitStore';
import { computed, watchEffect ,onMounted,watch} from 'vue';
import { useFilterStore } from '../../stores/filterStore';
import { capitalize,} from '../../Utils/helperFunctions';
import GridSearch from '../../components/GridSearch.vue';
import moment from 'moment';
import {useBatchListStore} from '../../stores/batchListStore'
const filterStore = useFilterStore();
const props = defineProps({
  batchType: String,
});
const loaderStore = useLoaderStore();
const alertStore = useAlertStore();
const viewStore = useViewStore();
const kitStore = useKitStore();
const router = useRouter()
const paginationStore = usePaginationStore()
const studyStore = useStudyStore()
const batchList = ref([])
const totalCount = ref(0)
const filter = useFilterStore();
const tabValue = localStorage.getItem('lipTab');
const tab = ref(tabValue);
const batchStore = useBatchListStore()
const signedURLs = [];
const filterButtons = [
  {
    status: 'All',
    text: 'All',
    color: 'black'
  },
  {
    status: 'Accepted',
    text: 'Accepted',
    color: '#1AAF02'
  },
  {
    status: 'Pending',
    text: 'Pending',
    color: '#DCD300'
  },
  {
    status: 'Submitted',
    text: 'Submitted',
    color: '#0657F5'
  },
  {
    status: 'Qc completed',
    text: 'QC completed',
    color: 'Purple'
  }
]
const ngsFilter=[
{
    status: 'All',
    text: 'All',
    color: 'black'
  },
  {
    status: 'Pending',
    text: 'Pending',
    color: '#DCD300'
  },
  {
    status: 'Submitted',
    text: 'Submitted',
    color: '#0657F5'
  },
]
const getStatusStyle = (status) => {
  switch (status) {
    case 'Pending':
      return 'color: #DCD300;'
    case 'Accepted':
      return 'color: #1AAF02;'
    case 'Submitted':
      return 'color: #0657F5;'
    case 'Denied':
      return 'color: #C60C0C;'
    case 'Qc completed':
      return 'color: Purple;'
    default:
      return 'color:black'
  }
}
const headers = [
  'Sr.No',
  'Batch No',
  props.batchType === 'NGS' && 'Run Id',
  '#Samples',
  'Generated By',
  'Generated On',
  props.batchType !== 'NGS' && 'Accepted By',
  props.batchType !== 'NGS' && 'Accepted On',
  'Status',
  props.batchType === 'NGS' && 'Actions',
].filter(Boolean)

const filterHeaders=[
{ key: 'Batch No', param: 'batchNumber',value:'' ,isAdded:false},
{ key: 'Run Id', param: 'run_id',value:'',isAdded:false},
    { key: 'Generated By', param: 'generated_by' ,value:'',isAdded:false},
    ...(props.batchType !== 'NGS' ? [{ key: 'Accepted By', param: 'accepted_by', value: '', isAdded: false }] : []),
    { key: 'Status', param: 'batchStatus',value:'',isAdded:false},
    { key: 'Actions', param: '',value:'',isAdded:false},
]
let storageIdsValues;
const navTo = (status,item) => {
  localStorage.setItem('batchId',item.batchId);
  batchStore.setBatchNumber(item.batchNumber)
  switch (status) {
    case 'Pending':
      if (props.batchType === 'DNA_ISOLATION') {
        router.push({
          name: 'batchListById',
        });
      } else if (props.batchType === 'LIB_PREP_LIST' && tab.value === 'day1') {
        router.push({
          name: 'libsampleVerify',
        });
      } else if (props.batchType === 'LIB_PREP_LIST' && tab.value === 'day2') {
        router.push({
          name: 'libPrepDay2Verify',
        })
      }
      else if (props.batchType === 'NGS') {
        router.push({
          name: 'NGSverify',
        });
      }
      break;

    case 'Accepted':
    case 'Submitted':
    case 'Qc completed':
      if (props.batchType === 'DNA_ISOLATION') {
        router.push({
          name: 'dnaIsolation',
        });
      } else if (props.batchType === 'LIB_PREP_LIST' && tab.value === 'day1') {
        router.push({
          name: 'libpreday1',
        });
      } else if (props.batchType === 'LIB_PREP_LIST' && tab.value === 'day2') {
        router.push({
          name: 'libprepday2',
        })
      }
      else if (props.batchType === 'NGS') {
        router.push({
          name: 'NGSverify',
        });
      }
      break
    default:
      break
  }
}

const fetchBatchList = async () => {
  let data = "";
  let batchType = (props.batchType == 'LIB_PREP_LIST' && tab.value == 'day1') ? 'LIB_PREP_DAY1' : (props.batchType == 'LIB_PREP_LIST' && tab.value == 'day2') ? 'LIB_PREP_DAY2' : props.batchType;
  switch (filter.filterValue) {
  case "All":
  case "":
    data = `batchType=${batchType}${filter.filterParams ? `&${filter.filterParams}` : ''}`;
    break;
  default:
    data = `batchType=${batchType}&batchStatus=${filter.filterValue.toUpperCase()}${filter.filterParams ? `&${filter.filterParams}` : ''}`;
    break;
}
  const inputModel = {
    batchModel: {
      studyId: studyStore.selectedStudy,
      pagination: {
        count: 10,
        page: paginationStore.currentPage,
        sort: 'desc.batchId',
        search: data
      },
      includeMeta: true
    }
  }
  const response = await SampleController.getBatchList(inputModel);
  totalCount.value = response?.totalCount;
  if (response?.data?.length > 0) {
    batchList.value = response.data
  }
  else {
     batchList.value = [];
  }
};

const displayBatchList = computed(() => {
  const data = batchList.value && batchList.value && batchList.value
  return data
})

const getAttributeValue = (batch, attributeName) => {
  const attribute =
    batch.batchAttributes &&
    batch.batchAttributes?.find((attr) => attr.attributeName === attributeName);
  if (attribute?.attributeValue != null) {
    if (attributeName === 'accepted_on' || attributeName === 'generated_on') {
      const formattedDate = moment(attribute.attributeValue).format('MM-DD-YYYY hh:mm A');
      if(formattedDate != 'Invalid date'){
        return formattedDate;
      }
    } else {
      return attribute.attributeValue;
    }
  }
  return '-';
};

const handleTab=()=>{
  localStorage.setItem('lipTab',tab.value);
  paginationStore.resetPage(1);
  fetchBatchList();
}
const EsignatureText = () => {
    return 'I am downloading files'
}

const handleDownload = (item, attributeName) => {
  const attribute = item.batchAttributes && item.batchAttributes?.find((attr) => attr.attributeName === attributeName);
  storageIdsValues = attribute.attributeValue.split(',').map(number => parseInt(number.trim(), 10));
  viewStore.getEsignatureModal(true);
}
const downloadMetaFile = async () => {
  loaderStore.showLoader(true);
  const username = viewStore.eSignatureForm.username;
  const password = viewStore.eSignatureForm.password;
  const changeReasonDetail = viewStore.eSignatureForm.changeReasonDetail;
  const isDownloadBySignedURL = storageIdsValues && storageIdsValues.length > 1 ? true : false;
  try {
    await instance({
      method: 'POST',
      url: '/api/v1/storage/downloadFiles',
      data: {
        username,
        password,
        changeReasonDetail,
        storageId: storageIdsValues,
        isDownloadBySignedURL: isDownloadBySignedURL,
      }

    })
      .then((resp) => {
        if (resp.signedURL) {
          window.open(resp.signedURL);
          loaderStore.showLoader(false);
          alertStore.success('Files downloaded successfully');
          viewStore.getEsignatureModal(false);
        }
      })
      .catch((error) => {
        loaderStore.showLoader(false);
        viewStore.getEsignatureModal(false);
        alertStore.error('Error downloading file:', error);
      });
  } catch (error) {
    loaderStore.showLoader(false);
    console.error('Error downloading files:', error);
  }
};

onMounted(()=>{
  if(localStorage.getItem('sampleStatus') !== 'DNA_ISOLATION_PASSED') {
    kitStore.resetStore();
  }
 filterStore.setGridSearch(filterHeaders)
})

watch(
  [() => studyStore.selectedStudy, () => filter.filterValue],
  ([newStudy, newFilterValue], [oldStudy, oldFilterValue]) => {
    if (newStudy !== oldStudy || newFilterValue !== oldFilterValue) {
      fetchBatchList();
    }
  },
  { immediate: true }
);
</script>
