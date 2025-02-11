<template>
  <div class="d-flex justify-content-between flex-column page-view-ht">
    <v-table class="table-ht br-bt">
      <thead>
        <tr>
          <th rowspan="2" class="th-txt">Sr.No</th>
          <th class="th-txt" rowspan="2">Batch No.</th>
          <th class="th-txt" rowspan="2">Sample Barcode</th>
          <th class="th-txt" rowspan="2">Elution Volume</th>
          <th class="th-txt" style="border: none" colspan="3">Nanodrop</th>
          <th class="th-txt" style="border: none" colspan="1">Qubit</th>
          <th class="th-txt" style="border: none" colspan="2">Tapestation</th>
          <th rowspan="2" class="th-txt">QC status</th>
        </tr>
        <tr>
          <th class="th-sub-br-clr th-txt" scope="col">Conc (ng/ul)</th>
          <th class="th-sub-br-clr th-txt br-tb" scope="col">260/280</th>
          <th class="th-sub-br-clr th-txt br-wd-lr" scope="col">260/230</th>
          <th class="th-txt" scope="col">Conc. (ng/ul)</th>
          <th class="th-txt th-sub-br-clr br-tb" style="border-left-width: 1px" scope="col">
            %cfDNA
          </th>
          <th class="th-txt th-sub-br-clr br-wd-lr" scope="col">DIN #</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in displayBatchList" class="tr-txt" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ batchList.batch[0].batchNumber }}</td>
          <td>{{ item.sampleBarcode ? item.sampleBarcode : '-' }}</td>
          <td>
            <input
              class="td-inp"
              type="text"
              @input="handleNumberInput($event,item,'elution_volume')"
              :disabled="batchStatus === 'QC COMPLETED'"
              v-model="item.dna_isolation_sample_elution_volume"
            />
          </td>
          <td>
            <div class="d-flex justify-content-center">
              <input
                class="td-inp"
                type="text"
                :disabled="batchStatus === 'QC COMPLETED'"
                @input="handleNumberInput($event,item,'nanodrop_conc_ng_ul')"
                v-model="item.dna_isolation_sample_nanodrop_conc_ng_ul"
              />
            </div>
          </td>
          <td>
            <div class="d-flex justify-content-center">
              <input
                class="td-inp"
                type="text"
                :disabled="batchStatus === 'QC COMPLETED'"
                @input="handleNumberInput($event,item,'nanodrop_conc_260_280')"
                v-model="item.dna_isolation_sample_nanodrop_conc_260_280"
              />
            </div>
          </td>
          <td>
            <div class="d-flex justify-content-center">
              <input
                class="td-inp"
                type="text"
                :disabled="batchStatus === 'QC COMPLETED'"
                @input="handleNumberInput($event,item,'nanodrop_conc_260_230')"
                v-model="item.dna_isolation_sample_nanodrop_conc_260_230"
              />
            </div>
          </td>
          <td>
            <div class="d-flex justify-content-center">
              <input
                class="td-inp"
                type="text"
                :disabled="batchStatus === 'QC COMPLETED'"
                @input="handleNumberInput($event,item,'qubit_conc_ng_ul')"
                v-model="item.dna_isolation_sample_qubit_conc_ng_ul"
              />
            </div>
          </td>
          <td>
            <div class="d-flex justify-content-center">
              <input
                class="td-inp"
                type="text"
                :disabled="batchStatus === 'QC COMPLETED'"
                @input="handleNumberInput($event,item,'tapestation_cf_dna')"
                v-model="item.dna_isolation_sample_tapestation_cf_dna"
              />
            </div>
          </td>
          <td>
            <div class="d-flex justify-content-center">
              <input
                class="td-inp"
                type="text"
                :disabled="batchStatus === 'QC COMPLETED'"
                @input="handleNumberInput($event,item,'tapestation_din')"
                v-model="item.dna_isolation_sample_tapestation_din"
              />
            </div>
          </td>
          <td>
            <select
              :disabled="batchStatus === 'QC COMPLETED' || isSelectDisabled(item)"
              style="padding: 5px; border: 0.1px solid grey"
              v-model="item.dna_isolation_sample_qc_status"
            >
              <option value="DNA Isolation not Specified">Not Specified</option>
              <option value="DNA Isolation Passed">Passed</option>
              <option value="DNA Isolation Failed">Failed</option>
            </select>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div
      class="p-2 d-flex justify-content-center align-items-center br-bt"
      style="background-color: white"
    >
      <button type="button" class="btn border-btn m-2" @click="router.push('/batchList')">
        close
      </button>
      <button
        :disabled="batchStatus === 'QC COMPLETED'"
        type="button"
        class="btn filled-btn"
        @click="handleSave()"
      >
        Save
      </button>
    </div>
    <div class="d-flex align-items-center justify-content-end br-bt pag-div-ht">
      <div class="d-flex align-items-center">
        <!-- <customPagination :totalItems="data.length"> </customPagination> -->
      </div>
    </div>
  </div>
  <EsignatureModal
    v-if="viewStore.eSignatureModal"
    :handleSubmit="handleSubmit"
    text="I am updating DNA isolation"
  />
  <v-snackbar :timeout="7000" location="top" v-model="showAlert" color="#dc3545">
    {{ alertMessage }}
    <template v-slot:actions>
      <v-icon @click="showAlert = false" icon="mdi mdi-close-circle-outline" />
    </template>
  </v-snackbar>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { SampleController } from '../../Controllers/sampleController'
import { defineProps, ref, watch, computed, reactive, onMounted } from 'vue'
import { useStudyStore } from '../../stores/studyStore'
import EsignatureModal from '../../components/EsignatureModal.vue'
import { useViewStore } from '../../stores/viewStore'
import { useFilterStore } from '../../stores/filterStore'
import { getAttributeValue } from '../../Utils/helperFunctions'
const router = useRouter()
const studyStore = useStudyStore()
const filterStore = useFilterStore();
const viewStore = useViewStore()
const batchListById = ref([])
const showAlert = ref(false)
const alertMessage = ref('')
const props = defineProps({
  batchNo: String
})
const batchStatus = ref('')
const batchId = ref(localStorage.getItem('batchId'))
const batchList = ref([])
const fetchBatchListById = async () => {
  const inputModel = {
    batchId: Number(batchId.value),
    studyId: (studyStore.selectedStudy).toString(),
    sort:"asc.display_order",
  }
  const response = await SampleController.batchListById(inputModel)
  if (response?.data?.length > 0) {
    batchList.value = response.data[0]
    const batchData = response.data[0]
    batchStatus.value = response?.data[0]?.batch[0]?.batchStatus
    for (let i = 0; i < batchData.batchEntities.length; i++) {
      const currentCaseSample = batchData.batchEntities[i]
      for (let j = 0; j < batchData.batchSampleDetails.length; j++) {
        const currentDataItem = batchData.batchSampleDetails[j]
        if (currentDataItem.caseSampleId === currentCaseSample.entityId) {
          batchListById.value.push({ ...currentDataItem, ...currentCaseSample })
          break
        }
      }
    }
  }
}

const isSelectDisabled = (item) => {
  const isDisabled =
    (!item.dna_isolation_sample_elution_volume ||
      item.dna_isolation_sample_elution_volume.trim() === '') &&
    (!item.dna_isolation_sample_nanodrop_conc_ng_ul ||
      item.dna_isolation_sample_nanodrop_conc_ng_ul.trim() === '') &&
    (!item.dna_isolation_sample_nanodrop_conc_260_280 ||
      item.dna_isolation_sample_nanodrop_conc_260_280.trim() === '') &&
    (!item.dna_isolation_sample_nanodrop_conc_260_230 ||
      item.dna_isolation_sample_nanodrop_conc_260_230.trim() === '') &&
    (!item.dna_isolation_sample_qubit_conc_ng_ul ||
      item.dna_isolation_sample_qubit_conc_ng_ul.trim() === '') &&
    (!item.dna_isolation_sample_tapestation_cf_dna ||
      item.dna_isolation_sample_tapestation_cf_dna.trim() === '') &&
    (!item.dna_isolation_sample_tapestation_din ||
      item.dna_isolation_sample_tapestation_din.trim() === '')
  return isDisabled
}

const handleSubmit = async () => {
  let batchEntity = []
  let batchEntityAttributeVal = []
  if (displayBatchList?.value?.length > 0) {
    batchList?.value?.batchEntities?.forEach((item) => {
      displayBatchList?.value?.forEach((id) => {
        if (item.batchEntityId === id.batchEntityId) {
          Object.keys(id).forEach((key) => {
            if (key.startsWith('dna_isolation_sample')) {
              batchEntityAttributeVal.push({
                batchEntityId: item.batchEntityId,
                attributeName: key,
                attributeValue: id[key]
              })
            }
          })
          var batchEntityObj = {
            batchId: Number(batchId.value),
            entityId: item.entityId,
            entityName: 'CASE_SAMPLE',
            batchEntityId: item.batchEntityId,
            batchEntityStatus: id.dna_isolation_sample_qc_status
          }
          batchEntity.push(batchEntityObj)
        }
      })
    })
  }
  const inputModel = {
    batchModel: {
      batch: {
        batchId: Number(batchId.value),
        batchName: batchList.value.batch[0].batchName,
        batchType: 'DNA_ISOLATION',
        batchNumber: batchList.value.batch[0].batchNumber,
        batchStatus: displayBatchList.value.some(
          (item) => item.dna_isolation_sample_qc_status === 'DNA Isolation not Specified'
        )
          ? 'SUBMITTED'
          : 'QC COMPLETED',
        batchEntity: batchEntity,
        batchEntityAttributes: batchEntityAttributeVal
      }
    },
    eSignatureModel: {
      username: viewStore.eSignatureForm.username,
      password: viewStore.eSignatureForm.password,
      changeReasonDetail: viewStore.eSignatureForm.changeReasonDetail
    }
  }
  await SampleController.updateBatch(inputModel, router, '/batchList')
}
const displayBatchList = computed(() => {
  const data = batchListById.value
  if (data) {
    return data?.map((item) => {
      return reactive({
        ...item,
        [getAttributeValue(
          studyStore.entityStudyAttributeModel,
          'dna_isolation_sample_elution_volume'
        )]: getAttributeData(item.batchEntityId, 'dna_isolation_sample_elution_volume'),
        [getAttributeValue(
          studyStore.entityStudyAttributeModel,
          'dna_isolation_sample_nanodrop_conc_ng_ul'
        )]: getAttributeData(item.batchEntityId, 'dna_isolation_sample_nanodrop_conc_ng_ul'),
        [getAttributeValue(
          studyStore.entityStudyAttributeModel,
          'dna_isolation_sample_nanodrop_conc_260_280'
        )]: getAttributeData(item.batchEntityId, 'dna_isolation_sample_nanodrop_conc_260_280'),
        [getAttributeValue(
          studyStore.entityStudyAttributeModel,
          'dna_isolation_sample_nanodrop_conc_260_230'
        )]: getAttributeData(item.batchEntityId, 'dna_isolation_sample_nanodrop_conc_260_230'),
        [getAttributeValue(
          studyStore.entityStudyAttributeModel,
          'dna_isolation_sample_qubit_conc_ng_ul'
        )]: getAttributeData(item.batchEntityId, 'dna_isolation_sample_qubit_conc_ng_ul'),
        [getAttributeValue(
          studyStore.entityStudyAttributeModel,
          'dna_isolation_sample_tapestation_cf_dna'
        )]: getAttributeData(item.batchEntityId, 'dna_isolation_sample_tapestation_cf_dna'),
        [getAttributeValue(
          studyStore.entityStudyAttributeModel,
          'dna_isolation_sample_tapestation_din'
        )]: getAttributeData(item.batchEntityId, 'dna_isolation_sample_tapestation_din'),
        dna_isolation_sample_qc_status: getAttributeData(
          item.batchEntityId,
          'dna_isolation_sample_qc_status'
        )
          ? getAttributeData(item.batchEntityId, 'dna_isolation_sample_qc_status')
          : 'DNA Isolation not Specified'
      })
    })
  }
  return data
})
const handleNumberInput = (event, item, field) => {
  let fieldPrefix = 'dna_isolation_sample_'
  let value = event.target.value;
  value = value.replace(/[^\d.]/g, '');
  const parts = value.split('.');
  if (parts.length > 2) {
    value = parts[0] + '.' + parts[1];
  }
  if (value.split('.').length > 2) {
    const index = value.lastIndexOf('.');
    value = value.substring(0, index) + value.substring(index + 1);
  }
  if (parts[1] && parts[1].length > 2) {
    value = parts[0] + '.' + parts[1].slice(0, 2);
  }
  item[fieldPrefix + field] = value;
}
const getAttributeData = (batchEntityId, attributeName) => {
  const attribute = batchList?.value?.batchEntityAttributes?.find(
    (attrib) => attrib.batchEntityId === batchEntityId && attrib.attributeName === attributeName
  )
  return attribute ? attribute.attributeValue : ''
}
onMounted(()=> {
  filterStore.setParams('');
})
const handleSave = () => {
  if (batchStatus.value === 'QC COMPLETED') {
    showAlert.value = true
    alertMessage.value = "QC is completed you can't update the values"
  } else {
    viewStore.getEsignatureModal(true)
  }
}

watch(
  () => studyStore.selectedStudy,
  () => {
    fetchBatchListById()
  },
  { immediate: true }
)
</script>
<style scoped>
.th-sub-br-clr {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-width: 1px 0px 1px 1px;
}

.br-wd-lr {
  border-width: 1px 1px 1px 0px;
}

.br-tb {
  border-width: 1px 0px 1px 0px;
}

.td-inp {
  width: 70px;
  height: 30px;
  text-align: center;
  border: 1px solid #a9a9a9;
}
</style>
