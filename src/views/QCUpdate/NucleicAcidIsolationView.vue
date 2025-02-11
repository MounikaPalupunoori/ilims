<template>
  <div class="d-flex justify-content-between flex-column page-view-ht">
    <!-- <Filters :filterButtons="filterButtons" :filterTitle="filterTitle" /> -->
    <div class="d-flex align-items-center m-2">
      <div class="input-group m-2">
        <v-text-field
          density="compact"
          placeholder="Search Eg:PatientId=ODX371,SampleType=tissue fluid "
          v-model="searchTerm"
          class="custom-append-inner"
          label="Search"
          variant="outlined"
        >
          <template v-slot:append-inner v-if="searchTerm">
            <v-icon icon="mdi-close" @click="ClearSearch"></v-icon>
          </template>
        </v-text-field>
      </div>
      <button
        @click="handleSearch"
        :disabled="!searchTerm"
        style="margin-bottom: 21px"
        class="btn filled-btn btn-wd"
      >
        Search
      </button>
      <button
        v-if="searchTerm"
        @click="ClearSearch"
        style="margin-bottom: 21px; white-space: nowrap"
        class="btn filled-btn btn-wd"
      >
        Clear Search
      </button>
    </div>

    <v-table class="table-ht br-bt">
      <thead>
        <tr class="tr-bg">
          <th>
            <div class="d-flex align-items-center justify-content-center" style="font-weight: 600">
              <input type="checkbox" v-model="selectAll" @click="checkAll()" />
              <div class="pl-2 th-txt">Sample Barcode</div>
            </div>
          </th>
          <th v-for="(header, index) in headers" :key="index" scope="col" class="th-txt">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in displayList" class="tr-txt" :key="index">
          <td>
            <div class="d-flex align-items-center">
              <div class="pr-2">
                <input
                  type="checkbox"
                  :value="item"
                  v-model="selectedItems"
                  @change="updateCheckall()"
                />
              </div>
              <div>{{ item.sampleBarcode ? item.sampleBarcode : '' }}</div>
            </div>
          </td>
          <td>{{ item.suid ? item.suid : '-' }}</td>
          <td>{{ item.full_name ? item.full_name : '-' }}</td>
          <td>-</td>
          <td>{{ item.testNames ? item.testNames : '-' }}</td>
          <td>-</td>
          <td>{{ item.gender ? item.gender : '-' }}</td>
          <td>{{ item.sample_type ? item.sample_type : '-' }}</td>
          <td>
            <select
              style="padding: 5px; border: 0.1px solid grey"
              v-model="item.dna_isolation_sample_qc_status"
            >
              <option value="Not Specified">Not Specified</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
            </select>
          </td>
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
    <v-snackbar :timeout="7000" location="top" v-model="showAlert" color="#dc3545">
      {{ alertMessage }}
      <template v-slot:actions>
        <v-icon @click="showAlert = false" icon="mdi mdi-close-circle-outline" />
      </template>
    </v-snackbar>
  </div>
  <EsignatureModal
    v-if="viewStore.eSignatureModal"
    :handleSubmit="handleSubmit"
    text="I am updating DNA isolation QC"
  />
</template>
<script setup>
import { useRouter } from 'vue-router'
import { SampleController } from '../../Controllers/sampleController'
import { usePaginationStore } from '../../stores/paginationStore'
import { useStudyStore } from '../../stores/studyStore'
import { ref, watch, computed } from 'vue'
import { useViewStore } from '../../stores/viewStore'
import EsignatureModal from '../../components/EsignatureModal.vue'
import { LibPrepartionController } from '../../Controllers/libPrepartionController'
import { getAttributeValue, searchKeyValue } from '../../Utils/helperFunctions'
const router = useRouter()
import { useAlertStore } from '../../stores/alertStore'
const paginationStore = usePaginationStore()
const studyStore = useStudyStore()
const selectedItems = ref([])
const selectAll = ref(false)
const viewStore = useViewStore()
const showAlert = ref(false)
const alertMessage = ref('')
const searchTerm = ref('')
const alertStore = useAlertStore()
const sampleList = ref([])
const headers = [
  'Patient ID',
  'Name',
  'Test Code',
  'Test Name',
  'Booked Date',
  'Gender',
  'Sample Type',
  'Status'
]
const saveSelection = () => {
  if (selectedItems.value.length === 0) {
    showAlert.value = true
    alertMessage.value = 'Please choose atleast one sample to create batch'
  } else {
    viewStore.getEsignatureModal(true)
  }
}
function checkAll() {
  selectAll.value = !selectAll.value
  if (selectAll.value) {
    for (const sample of sampleList.value) {
      sample.currentPage = paginationStore.currentPage
      selectedItems.value.push(sample)
    }
  } else {
    selectedItems.value = selectedItems.value.filter(
      (sample) => sample.currentPage !== paginationStore.currentPage
    )
  }
}

function updateCheckall() {
  if (selectedItems.value.length === sampleList.value.length) {
    selectAll.value = true
  } else {
    selectAll.value = false
  }
}

const handleSearch = () => {
  fetchBatchList()
}
const search = async (value) => {
  const headers = [
    'SampleBarcode',
    'PatientId',
    'Name',
    'Gender',
    'SampleType',
    'TestName',
    'TestCode',
    'Status',
    'BookedDate'
  ]
  const paramMappings = [
    { key: 'SampleType', param: 'sample_type' },
    { key: 'Gender', param: 'gender' },
    { key: 'Name', param: 'full_name' },
    { key: 'PatientId', param: 'suid' },
    { key: 'TestName', param: 'test_name' },
    { key: 'TestCode', param: 'test_code' },
    { key: 'BookedDate', param: 'booked_date' },
    { key: 'Status', param: 'sample_status' },
    { key: 'SampleBarcode', param: 'sampleBarcode' }
  ]
  const { urlParams, errorKeys } = searchKeyValue(headers, searchTerm.value, paramMappings)
  if (errorKeys.length > 0) {
    alertStore.error(`Keys ${errorKeys.join(', ')} do not match`)
  } else {
    const inputModel = {
      caseSampleModel: {
        studyFilter: [studyStore.selectedStudy],
        pagination: {
          sort: 'asc.case_sample_id',
          search: `caseSampleIds=${value.join(',')}&${urlParams}`
        },
        includeMeta: true,
        includeSubjectMeta: true,
        includeAccessionMeta: true
      }
    }
    const caseSampleResponse = await SampleController.getSamples(inputModel)
    if (caseSampleResponse) {
      sampleList.value = caseSampleResponse.data.map((sample) => ({
        ...sample,
        dna_isolation_sample_qc_status: 'Not Specified'
      }))
    }
  }
}
const removeDuplicates = (arr) => Array.from(new Set(arr))

const fetchBatchList = async () => {
  const inputModel = {
    batchModel: {
      studyId: [studyStore.selectedStudy],
      pagination: {
        sort: 'desc.batchId',
        search: 'batchType=DNA_ISOLATION&batchStatus=SUBMITTED'
      }
    }
  }
  const response = await LibPrepartionController.getLibEntityIds(inputModel)
  if (response) {
    const uniqueEntityIds = []
    response.data.forEach((item) => {
      item.entityIds.split(',').forEach((entityId) => {
        const trimmedEntityId = entityId.trim()
        if (trimmedEntityId !== '' && !uniqueEntityIds.includes(trimmedEntityId)) {
          uniqueEntityIds.push(trimmedEntityId)
        }
      })
    })
    if (uniqueEntityIds.length > 0) {
      if (searchTerm.value) {
        search(uniqueEntityIds)
      } else {
        const inputModel = {
          caseSampleModel: {
            studyFilter: [studyStore.selectedStudy],
            pagination: {
              sort: 'asc.case_sample_id',
              search: `caseSampleIds=${uniqueEntityIds.join(',')}`
            },
            includeTest: true,
            includeMeta: true,
            includeSubjectMeta: true,
            includeAccessionMeta: true
          }
        }
        const caseSampleResponse = await SampleController.getSamples(inputModel)
        if (caseSampleResponse) {
          response.data.forEach((obj) => {
            const entityIds = removeDuplicates(obj.entityIds.split(',').map(Number))
            entityIds.forEach((casesample) => {
              const matchedItem = caseSampleResponse.data.find(
                (item) => item.caseSampleId === casesample
              )
              if (matchedItem) {
                sampleList.value.push({
                  ...matchedItem,
                  batchId: obj.batchId,
                  dna_isolation_sample_qc_status: 'Not Specified'
                })
              }
            })
          })
        }
      }
    }
  }
}
const ClearSearch = () => {
  searchTerm.value = ''
  fetchBatchList()
}
const handleSubmit = async () => {
  const caseSamples = []
  var batchEntityAttributeVal = []
  if (selectedItems.value && selectedItems.value.length > 0) {
    selectedItems.value.forEach((item) => {
      const exists = caseSamples.some((sample) => sample.caseSampleId === item.caseSampleId)
      if (!exists) {
        caseSamples.push({ caseSampleId: item.caseSampleId })
      }
      var batchEntityAttribute = {
        batchEntityAttributeValId: null,
        batchId: item.batchId,
        entityId: item.caseSampleId,
        attributeName: getAttributeValue(
          studyStore.entityStudyAttributeModel,
          'dna_isolation_sample_qc_status'
        ),
        attributeValue: item.dna_isolation_sample_qc_status
      }
      batchEntityAttributeVal.push(batchEntityAttribute)
    })
  }
  const inputModel = {
    batchModel: {
      studyId: [studyStore.selectedStudy],
      batch: {
        batchId: null,
        batchName: null,
        batchNumber: null,
        batchType: 'DNA_ISOLATION',
        batchStatus: 'SUBMITTED',
        entityName: 'CASE_SAMPLE',
        caseSamples: caseSamples
      },
      batchAttributes: [
        {
          attributeName: 'generated_by',
          attributeValue: viewStore.eSignatureForm.username
        },
        {
          attributeName: 'generated_on',
          attributeValue: new Date().getTime()
        }
      ],
      batchEntityAttributeVal: batchEntityAttributeVal
    },
    eSignatureModel: {
      username: viewStore.eSignatureForm.username,
      password: viewStore.eSignatureForm.password,
      changeReasonDetail: viewStore.eSignatureForm.changeReasonDetail
    }
  }
  await SampleController.updateBatch(inputModel, router, '/libbatchlist')
}
const displayList = computed(() => {
  const data = sampleList.value
  return data
})
watch(
  () => studyStore.selectedStudy,
  () => {
    fetchBatchList()
  },
  { immediate: true }
)
</script>
<style scoped></style>
