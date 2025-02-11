<template>
  <div style="height:100%;overflow: hidden;">
    <div class="row justify-content-center" style="height: 80%;overflow-y: scroll;">
      <FormKit
        type="form"
        :incomplete-message="false"
        :actions="false"
        style="padding: 0px"
        v-model="formData"
        @submit="searchResultsApi"
      >
        <div>
          <div
            class="form-card-title py-2 px-5 br-bt d-flex justify-content-between align-items-center"
          >
            <span v-if="!viewStore.searchResultsBlock" class="form-card-title br-bt-0"
              >Search Samples</span
            >
            <span v-if="viewStore.searchResultsBlock" class="form-card-title br-bt-0"
              >Search Results</span
            >
            <div>
              <button
                type="submit"
                v-if="viewStore.searchResultsBlock"
                class="btn filled-btn btn-wd"
                @click="paginationStore.resetPage(1)"
              >
                Search Sample
              </button>
            </div>
          </div>
          <v-container>
            <v-row>
              <v-col sm="12" md="6" cols="12">
                  <v-row class="align-items-center">
                    <v-col cols="3" style="margin-top: -21px;">Disease</v-col>
                    <v-col>
                      <v-autocomplete
                      clearable
                  :items="disease_name"
                  variant="solo-filled"
                  density="compact"
                  item-title="name"
                  item-value="name"
                  @update:modelValue="handleChange"
                  placeholder="Select Diseases"
                  v-model="selected_disease"
                >
                  <template v-slot:item="{ props, item }">
                    <v-list-item style="min-height: 40px;padding:0px 4px;"
                      v-bind="props"
                      :title="item.raw.name"
                    ></v-list-item>
                  </template>
                </v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row class="align-items-center" style="margin-top: -21px">
                    <v-col cols="3">Sample Barcode</v-col>
                    <v-col>
                      <FormKit type="text" 
                        @change="handleChange" placeholder="Enter Sample Barcode" :name="getSampleStatus === 'Accessioned' ? 'sampleBarcode' : 'sample_barcode'" id="samplebarcode" v-model="samplebarcode" style="height: 45px;"/>
                    </v-col>
                  </v-row>
                  <v-row class="align-items-center">
                    <v-col cols="3">{{getSampleStatus === 'Accessioned' ? 'Sample Status':'Batch Sample Status'}}</v-col>
                    <v-col>
                      <FormKit
                        type="select"
                        name="status"
                        style="height: 45px;"
                        v-model="getSampleStatus"
                        id="status"
                        disabled="true"
                        :options="sampleStatus"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              <v-col offset-sm-0 offset-0></v-col>
              <v-col sm="12" md="5" cols="12">
                <v-row class="align-items-start">
                  <v-col cols="3">Sample Type</v-col>
                  <v-col class="d-flex align-items-center justify-content-between position-relative">
                    <div style="width:100%">
                    <FormKit
                      style="margin: 0px !important;height: 45px;"
                      v-model="selectSampleType"
                      @input="handleSampleType"
                      @change="handleChange()"
                      placeholder="Select Sample type"
                      type="select"
                      name="sample_type"
                      id="sample_type"
                      :options="sampleTypes"
                    />
                    </div>
                    <div v-if="selectSampleType" class="position-absolute pointer" style="right:42px" @click="clearSelect('sampleType')">
                      <v-icon icon="mdi mdi-close" size="20"/>
                    </div>
                  </v-col>
                </v-row>
                <v-row class="align-items-start">
                  <v-col cols="3">Specimen</v-col>
                  <v-col class="d-flex align-items-center justify-content-between position-relative">
                    <div style="width:100%">
                      <FormKit
                      style="margin: 0px !important;height: 45px;max-width:100%"
                      v-model="selectSpecimen"
                      placeholder="Select Specimen"
                      @change="handleChange()"
                      type="select"
                      name="specimen"
                      id="specimen"
                      :options="specimenList"
                    />
                    </div>
                    <div v-if="selectSpecimen" class="position-absolute pointer" style="right:42px" @click="clearSelect('specimen')">
                      <v-icon icon="mdi mdi-close" size="20"/>
                    </div>
                    
                  </v-col>
                </v-row>
                <v-row class="align-items-center">
                  <v-col cols="3">Sort By</v-col>
                  <v-row class="justify-content-around">
                    <FormKit
                      style="margin: 0px !important;height: 45px;"
                      type="select"
                      name="headers"
                      id="headers"
                      @change="handleChange"
                      v-model="sorting"
                      placeholder="Select"
                      :options="sortingHeaders"
                    />
                    <FormKit
                      style="margin: 0px !important;height: 45px;"
                      type="select"
                      name="sort_by"
                      @change="handleChange"
                      id="sort_by"
                      value="desc"
                      :options="[
                        { label: 'Ascending Order', value: 'asc', },
                        { label: 'Descending Order', value: 'desc', },
                      ]"
                    />
                  </v-row>
                </v-row>
              </v-col>
            </v-row>
            <div
              v-if="!viewStore.searchResultsBlock"
              class="d-flex align-items-center justify-content-center pt-3 mt-3 br-bt"
            >
              <div class="d-flex align-items-center">
                <button type="submit" @click="searchTerm = '';paginationStore.resetPage(1)" class="btn filled-btn btn-wd m-2">
                  Search Sample
                </button>
              </div>
            </div>
          </v-container>
        </div>
      </FormKit>
      <div v-if="viewStore.searchResultsBlock" >
        <div class="filter-br-bt">
          <GridSearch :fetchData="filterSearch" :clearSelectedSamples="clearSelectedSamples()"/>
          </div>
      </div>
      <div class="pt-1 px-0" v-if="viewStore.searchResultsBlock">
        <v-table>
        <thead>
          <tr class="tr-bg">
            <th>
              <div class="d-flex align-items-center justify-content-start" style="font-weight: 600">
                <input type="checkbox"   @click="checkAll()" v-model="batchStore.isCheckAll" />
                <div class="pl-2 th-txt">Sample Barcode</div>
              </div>
            </th>
            <th v-for="(header, index) in displayedHeaders" :key="index" scope="col" class="th-txt">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody v-if="(filteredResults && filteredResults.length > 0)">
          <tr v-for="(item, index) in filteredResults" class="tr-txt" :key="index">
            <td>
              <div class="d-flex align-items-center">
                <div class="pr-2" v-if="viewStore.searchResultsBlock">
                  <input type="checkbox" :value="item" v-model="selectedSamples"  @change="updateCheckall(item,index)" />
                </div>
                <div>{{ item.sampleBarcode ? item.sampleBarcode : item.sample_barcode ? item.sample_barcode:'-' }}</div>
              </div>
            </td>
            <SearchSamplesTable :item="item"/>
          </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="12" class="no-data-txt text-center" >No data found</td> 
        </tr>
      </tbody>
      </v-table>
     
      </div>
    </div>
    <div class="d-flex flex-column justify-content-between" v-if="viewStore.searchResultsBlock">
      <div class="d-flex align-items-center justify-content-end br-bt pag-div-ht">
        <div class="d-flex align-items-center">
          <customPagination :totalItems="totalCount" :fetchData="showFilter === true ? filterSearch: searchResultsApi"> </customPagination>
        </div>
      </div>
      <div class="d-flex align-items-center justify-content-center br-bt" style="padding:11px 0px" v-if="viewStore.searchResultsBlock">
        <div class="">
          <button type="button" class="btn border-btn" @click="handleClose()">Close</button>
          <button class="btn filled-btn btn-wd" @click="saveSelection">
            Save Selection
          </button>
        </div>
      </div>
    </div>
   
  </div>
  <v-snackbar :timeout="2000" location="top" v-model="showAlert" color="#dc3545">{{ alertMessage }}
    <template v-slot:actions>
      <v-icon @click="showAlert = false" icon="mdi mdi-close-circle-outline" />
    </template>
  </v-snackbar>
  <v-dialog v-model="dialog" width="500" persistent>
    <v-card>
      <v-card-title class="headline">Informative Message</v-card-title>
      <v-card-text>
         <div class="d-flex flex-wrap">
        <p v-for="(item, index) in selectedSampleIds" class="tr-txt" :key="index">{{ item }},&nbsp;</p></div>
            Samples have already been selected for batch creation
      </v-card-text>
      <v-card-actions>
       <v-spacer></v-spacer>
        <v-btn @click="confirmChange" class="btn filled-btn m-2 btn-wd">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref, computed, onMounted ,reactive,watch, watchEffect} from 'vue';
import { SampleController } from '../../Controllers/sampleController';
import { useRouter } from 'vue-router';
import { usePaginationStore } from '../../stores/paginationStore';
import { useBatchListStore } from '../../stores/batchListStore';
import { useStudyStore } from '../../stores/studyStore';
import { useViewStore } from '../../stores/viewStore';
import { useKitStore } from '../../stores/kitStore';
import { StudyListController } from '../../Controllers/studyListController';
import customPagination from '../../components/PaginationItem.vue';
import GridSearch from '../../components/GridSearch.vue';
import { useFilterStore } from '../../stores/filterStore';
import SearchSamplesTable from './SearchSamplesTable.vue';
import { searchGridHeaders ,sortHeaders} from '../../Constants/searchGridHeaders';
import { filterList } from '../../Constants/searchFilter';
const batchStore = useBatchListStore();
const paginationStore = usePaginationStore();
const studyStore = useStudyStore();
const kitStore = useKitStore();
const router = useRouter();
const viewStore = useViewStore();
const filterStore = useFilterStore();
let formData = {}
const totalCount = ref(0);
const searchTerm = ref('');
const sampleTypes = ref({});
const specimenList = ref({});
const selectSampleType = ref(null);
const selectSpecimen = ref(null);
const getSampleStatus = localStorage.getItem('sampleStatus')
const entitySampleIds = ref([]);
const libPrepSample = ref([]);
const selected_disease = ref(null);
const disease_name = ref([])
const isCheckAll = ref(false);
const searchResults = ref({});
const selectedSamples = ref([]);
const showAlert = ref(false);
const alertMessage = ref("");
const dialog = ref(false);
const selectedSampleIds = ref([]);
const paginationdata = ref([]);
const samplebarcode = ref('');
const sorting = ref(getSampleStatus === 'Accessioned' ? 'accessionNumber' : 'batch_number');
const showFilter = ref(false);
const selected_samples=ref([]);
const parentParams = ref(false);
const displayedHeaders = computed(() => {
  return searchGridHeaders().allHeaders[getSampleStatus] || [];
});
const sortingHeaders=computed(()=>{
  return sortHeaders().allSortHeaders[getSampleStatus] || [];
})
const sampleStatus = [
  { value: 'Accessioned', label: 'Accessioned' },
  { value: 'DNA_ISOLATION_PASSED', label: 'DNA ISOLATION PASSED' },
  { value: 'LIB_PREP_DAY1_PASSED', label: 'LIB_PREP_DAY1_PASSED' },
  { value: 'LIB_PREP_DAY2_PASSED', label: 'LIB_PREP_DAY2_PASSED' }
]

const handleChange=()=>{
  viewStore.getSearchResultsBlock(false);
}

const handleSampleType = async (e) => {
  selectSpecimen.value = ''
  if(e != ''){
    const inputModal = {
      sampleTypeId: e[0]
    }
    const response = await SampleController.getSpecimenList(inputModal)
    if (response?.data?.length > 0) {
      specimenList.value = 
       (response?.data?.map((item) => ({
          value: [item.discreteAttributeId, item.attributeValue],
          label: item.attributeValue
        })) || [])
    }
  }
}
const confirmChange = () => {
  if (getSampleStatus != 'Accessioned') {
    const selectedIds = new Set(batchStore.searchSampleData.map(item => item.batch_entity_id));
    const uniqueData = selected_samples.value.filter(item => !selectedIds.has(item.batch_entity_id));
    batchStore.getSearchSampleData({ value: uniqueData, router: router });
  }
  else {
    const selectedIds = new Set(batchStore.searchSampleData.map(item => item.accessionId));
    const uniqueData = selected_samples.value.filter(item => !selectedIds.has(item.accessionId));
    batchStore.getSearchSampleData({ value: uniqueData, router: router });
  }
}

const clearSelect = (type) => {
  viewStore.getSearchResultsBlock(false);
  if (type === 'specimen') {
    selectSpecimen.value = ''
  }
  else {
    selectSampleType.value = ''
  }
}
const clearSelectedSamples=()=>{
  selectedSamples.value = [];
}
const filterSearch = async () => {
  showFilter.value = true;
  filterStore.sucess('');
  batchStore.getisCheckAll(false);
  if (getSampleStatus != 'Accessioned') {
    parentParams.value = true;
    searchBatchEntity(filterStore.filterParams)
  } else {
    const inputModel = {
      caseSampleModel: {
        studyFilter: [studyStore.selectedStudy],
        pagination: {
          count: 10,
          page: paginationStore.currentPage,
          sort:formData.sort_by+'.'+formData.headers,
          search: `${filterStore.filterParams ? filterStore.filterParams : ''}${filterStore.parentFilterParams ? '&'+filterStore.parentFilterParams : ''}`
        },
        includeMeta: true,
        includeTest: true,
        includeSubjectMeta: true,
        includeAccessionMeta: true
      }
    }
    const responseData = await SampleController.getSamples(inputModel)
    if (responseData?.data) {
      viewStore.getSearchResultsBlock(true)
      searchResults.value = responseData.data
      searchResults.value = responseData.data.map(item => {
        return {
          ...item,
          isSelected:false,
          currentPage: paginationStore.currentPage
        };
      })||[]
      totalCount.value = responseData.totalCount
    }
  }
}

const filteredResults = computed(() => {
  let isCheckAll = true; 
  if (selectedSamples.value.length > 0) {
    const currentPageSelectedItems = selectedSamples.value.filter(item => item.currentPage === paginationStore.currentPage);
    isCheckAll = currentPageSelectedItems.length === searchResults.value.length;
    batchStore.getisCheckAll(isCheckAll);
    return searchResults.value.map(value => {
      const selectedItem = selectedSamples.value.find(item => item.currentPage === value.currentPage);
      if (selectedItem && selectedItem.isSelected) {
        return { ...value, isSelected: true };
      } else {
        return value;
      }
    });
  } else {
    return searchResults.value;
  }
});


const getSamplesType = async () => {
  const response = await SampleController.getSampleTypes()
  if (response?.data?.length > 0) {
    sampleTypes.value =
      response.data.map((item) => ({
        value: [item.discreteAttributeId, item.attributeValue],
        label: item.attributeValue
      }))
  }
}

function checkAll() {
  const currentPageItems = searchResults.value.filter(item => item.currentPage === paginationStore.currentPage);
  batchStore.getisCheckAll(!batchStore.isCheckAll);
  if (batchStore.isCheckAll) {
    for (const lang of currentPageItems) {
      if (!lang.isSelected) {
        lang.isSelected = true;
        lang.currentPage = paginationStore.currentPage;
        selectedSamples.value.push({ ...lang });
      }
    }
  } else {
    for (const lang of searchResults.value) {
      if (lang.currentPage === paginationStore.currentPage) {
        lang.isSelected = false;
        lang.currentPage = paginationStore.currentPage;
      }
    }
    selectedSamples.value = selectedSamples.value.filter(lang => lang.currentPage != paginationStore.currentPage);
  }
}

const updateCheckall = (item, index) => {
  searchResults.value[index].isSelected = !searchResults.value[index].isSelected;
  if (searchResults.value.length > 0) {
    const allSwitchStatesTrue = searchResults.value.every(item => item.isSelected);
    if (allSwitchStatesTrue) {
      batchStore.getisCheckAll(true);
    } else {
      batchStore.getisCheckAll(false);
    }
  }
};


const searchBatchEntity = async (urlParams) => {
  let batchEntityStatus = ''
  switch (getSampleStatus) {
    case 'DNA_ISOLATION_PASSED':
      batchEntityStatus = 'DNA Isolation Passed'
      break
    case 'LIB_PREP_DAY1_PASSED':
      batchEntityStatus = 'LIB Prep Day 1 Passed'
      break
    case 'LIB_PREP_DAY2_PASSED':
      batchEntityStatus = 'LIB Prep Day 2 Passed'
      break
    default:
      break
  }
  let search = ''
  if(parentParams.value === true) {
    search = `entityIds=${entitySampleIds.value}&batch_entity_status=${batchEntityStatus}${urlParams ? '&' + urlParams : ''}${filterStore.parentFilterParams ? '&' + filterStore.parentFilterParams : ''}`
  } else {
    search = `entityIds=${entitySampleIds.value}&batch_entity_status=${batchEntityStatus}${urlParams ? '&' + urlParams : ''}`
  }
  const inputModel = {
    searchModel: {
      studyId: [studyStore.selectedStudy],
      pagination: {
        count: 10,
        page: paginationStore.currentPage,
        sort:formData.sort_by+'.'+formData.headers,
        search: search
      }
    }

  }
  const response = await SampleController.getSearchBatchEntity(inputModel);
  if (response) {
    totalCount.value = response.totalCount;
    viewStore.getSearchResultsBlock(true)
    searchResults.value = response.data.map(item => {
      return {
        ...item,
        isSelected: false,
        currentPage: paginationStore.currentPage
      };
    });
  }
}
const getBatchEntityStatus = async () => {
  let batchEntityStatus = ''
  switch (getSampleStatus) {
    case 'DNA_ISOLATION_PASSED':
      batchEntityStatus = 'DNA Isolation Passed'
      break
    case 'LIB_PREP_DAY1_PASSED':
      batchEntityStatus = 'LIB Prep Day 1 Passed'
      break
    case 'LIB_PREP_DAY2_PASSED':
      batchEntityStatus = 'LIB Prep Day 2 Passed'
      break
    default:
      break
  }
  const inputModel = {
    batchModel: {
      studyId: [studyStore.selectedStudy],
      pagination: {
        sort: "asc.batch_entity_id",
        search: `batchEntityStatus=${batchEntityStatus}`
      }
    }
  }
  const response = await SampleController.getBatchEntityDetails(inputModel);
  if (response && response.data.length > 0) {
    libPrepSample.value = response?.data
    const uniqueIdsWithoutCommas = Array.from(
      new Set(
        response?.data.map((item) => {
          if (item.entityId != null) {
            return item.entityId.toString().replace(',', '')
          }
          return null
        })
      )
    ).filter((id) => id !== null)
    const resultString = uniqueIdsWithoutCommas.join(',')
    entitySampleIds.value = resultString
  } else {
    viewStore.getSearchResultsBlock(true)
  }
}
const searchResultsApi = async () => {
  viewStore.getSearchResultsBlock(true)
  filterStore.gridSearchHeaders.forEach(header => {
        header.isAdded = false;
  });
  filterStore.setShowFilter(false);
  batchStore.getisCheckAll(false);
  const formattedData = {
    ...formData,
    disease_name: selected_disease.value,
    sample_type:formData?.sample_type != null ? formData?.sample_type[1] : '',
    specimen:formData?.specimen != null ?  formData?.specimen[1] : '',
    status: getSampleStatus,
  }
  let urlParams = Object.entries(formattedData)
  .filter(([key, value]) => (
    value !== undefined &&
    value !== 'Any' &&
    value !== '' &&
    value !== null &&
    key !== 'sort_by' &&  key !== 'headers' &&
    (key !== 'status' || getSampleStatus === 'Accessioned')
    ))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
    if (getSampleStatus != 'Accessioned') {
      parentParams.value = false;
      filterStore.setParentFilterParams(urlParams)
      searchBatchEntity(urlParams)
    } else {
    filterStore.setParentFilterParams(urlParams);
    const inputModel = {
      caseSampleModel: {
        studyFilter: [studyStore.selectedStudy],
        pagination: {
          count: 10,
          page: paginationStore.currentPage,
          sort:formData.sort_by+'.'+formData.headers,
          search: urlParams ? urlParams
            : ''
        },
        includeMeta: true,
        includeTest: true,
        includeSubjectMeta: true,
        includeAccessionMeta: true
      }
    }
    const response = await SampleController.getSamples(inputModel)
    if (response) {
      viewStore.getSearchResultsBlock(true)
      searchResults.value = response.data.map(item => {
        return {
          ...item,
          isSelected:false,
          currentPage: paginationStore.currentPage
        };
      })||[]
      totalCount.value = response.totalCount
    }
  }
}

const saveSelection = () => {
  selected_samples.value = selectedSamples.value;
  if (selectedSamples.value.length === 0) {
    showAlert.value = true;
    alertMessage.value = 'Please select at least one sample';
  } else {
    let hasDuplicate = false;
    batchStore.searchSampleData.forEach((item) => {
      selectedSamples.value.forEach((select) => {
        if (getSampleStatus != 'Accessioned') {
          if (item.batch_entity_id === select.batch_entity_id) {
            hasDuplicate = true;
            selectedSampleIds.value.push(select.sample_barcode)
          }
        }
        else {
          if (getSampleStatus === 'Accessioned') {
            if (item.accessionId === select.accessionId) {
              hasDuplicate = true;
              selectedSampleIds.value.push(select.sampleBarcode)
            }
          }
        }
      });
    })
    if (hasDuplicate) {
      dialog.value = true
    } else {
      batchStore.getSearchSampleData(({ value: selectedSamples.value, router: router }));
    }
  }
};
const getDiseases = async () => {
  let inputModal = {
    entityStudyAttributeModel: {
      studyId: [studyStore.selectedStudy],
      entity: "subject",
      sort: 'asc.displayOrder, asc.displayName'
    }
  }
  const response = await StudyListController.getEntityeMasterList(inputModal);
  if (response && response.data && response.data.data && response.data.data.length > 0) {
    const data = response.data.data;
    data.map((item) => {
      if (item.attributeName === 'disease_name') {
        let convertToArray = item.value.split(',');
        let arrayOfObjects = convertToArray.map(item => ({ name: item }));
        arrayOfObjects.sort((a, b) => a.name.localeCompare(b.name));
        disease_name.value = arrayOfObjects
      }
    })
  }
}
const resetValue=()=>{
  selectSampleType.value = null;
  selectSpecimen.value = null;
  samplebarcode.value = '';
  selected_disease.value = null;
}
const handleClose=()=>{
  viewStore.getSearchResultsBlock(false);
  paginationStore.resetPage(1);
  resetValue();
}

onMounted(() => {
  getSamplesType();
  getDiseases();
  paginationStore.resetPage(1);
  if (getSampleStatus !== 'DNA_ISOLATION_PASSED') {
    kitStore.resetStore();
  }
  let filterKeys = filterList().allfilterKeys[getSampleStatus] || [];
  filterStore.setGridSearch(filterKeys)
  if (getSampleStatus != 'Accessioned') {
    getBatchEntityStatus()
  }
})
</script>
<style scoped>
.page-ht {
  height: 100%;
  overflow-y: auto;
}

.br-bt-0 {
  border: 0px;
}
.filter-br-bt{
  border-bottom: 1px solid #F4F3F3;
}
</style>
