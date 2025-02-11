<template>
  <div class="d-flex justify-content-between flex-column page-view-ht">
    <v-table class="table-ht br-bt">
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index" scope="col" class="th-txt">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in displayBatchList" class="tr-txt" :key="index">
          <td class="id-text">{{ index + 1 }}</td>
          <td>{{ libPrepDayBatchData.batch[0].batchNumber }}</td>
          <td>{{ item.pool_id ? item.pool_id : '-' }}</td>
          <td>{{ item.sampleBarcode ? item.sampleBarcode : '-' }}</td>
          <td>{{ item.library_id ? item.library_id : '-' }}</td>
          <td><input class="td-inp" type="text" :disabled="batchStatus === 'QC COMPLETED'"
              @input="handleNumberInput($event, item, 'wg_conc')" v-model="item.lib_prep_day2_sample_wg_conc" />
          </td>
          <td><input class="td-inp" type="text" :disabled="batchStatus === 'QC COMPLETED'"
              @input="handleNumberInput($event, item, 'input_dna')" v-model="item.lib_prep_day2_sample_input_dna" />
          </td>
          <td><input class="td-inp" type="text" :disabled="batchStatus === 'QC COMPLETED'"
              @input="handleNumberInput($event, item, 'final_dilution_volume')"
              v-model="item.lib_prep_day2_sample_final_dilution_volume" />
          </td>
          <td><input class="td-inp" type="text" :disabled="batchStatus === 'QC COMPLETED'"
            @input="handleTextInput($event, item, 'lib_prep_day2_sample_wg_well_id')" v-model="item.lib_prep_day2_sample_wg_well_id" />
          </td>
          <td><input class="td-inp" type="text" disabled="true" v-model="item.lib_prep_day2_sample_wg_dna" /></td>
          <td><input class="td-inp" type="text" disabled="true" v-model="item.lib_prep_day2_sample_rsb_nfw" /></td>
          <td><input class="td-inp" type="text" :disabled="batchStatus === 'QC COMPLETED'"
            @input="handleTextInput($event, item, 'lib_prep_day2_sample_well_id')" v-model="item.lib_prep_day2_sample_well_id" />
          </td>
          <td><input class="td-inp" type="text" :disabled="batchStatus === 'QC COMPLETED'"
              @input="handleNumberInput($event, item, 'final_lib_conc')"
              v-model="item.lib_prep_day2_sample_final_lib_conc" /></td>
          <td> <input class="td-inp" type="text" :disabled="batchStatus === 'QC COMPLETED'"
              @input="handleNumberInput($event, item, 'lib_size')" v-model="item.lib_prep_day2_sample_lib_size" /></td>
          <td> <input class="td-inp" type="text" :disabled="batchStatus === 'QC COMPLETED'"
              v-model="item.lib_prep_day2_sample_comment" /></td>
          <td> <select :disabled="batchStatus === 'QC COMPLETED'" style="
                padding: 5px; 
                border:0.1px solid grey" v-model="item.lib_prep_day2_sample_qc_status">
              <option value="LIB Prep Day 2 not Specified">Not Specified</option>
              <option value="LIB Prep Day 2 Passed">Passed</option>
              <option value="LIB Prep Day 2 Failed">Failed</option>
            </select></td>
        </tr>
      </tbody>
    </v-table>
    <div class="p-2 d-flex justify-content-center align-items-center br-bt" style="background-color: white">
      <button type="button" class="btn border-btn m-2" @click="router.push('/libbatchlist')">
        close
      </button>
      <button type="button" :disabled="batchStatus === 'QC COMPLETED'" class="btn filled-btn"
        @click="handleSave()">Save</button>
    </div>
    <EsignatureModal v-if="viewStore.eSignatureModal" :handleSubmit="handleSubmit" text="I am updating LIB_PREP_DAY2" />
    <v-snackbar :timeout="7000" location="top" v-model="showAlert" color="#dc3545">
      {{ alertMessage }}
      <template v-slot:actions>
        <v-icon @click="showAlert = false" icon="mdi mdi-close-circle-outline" />
      </template>
    </v-snackbar>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { SampleController } from '../../Controllers/sampleController';
import { defineProps, ref, watch, computed, reactive, onMounted } from 'vue';
import { useStudyStore } from '../../stores/studyStore';
import EsignatureModal from '../../components/EsignatureModal.vue';
import { useViewStore } from '../../stores/viewStore';
import { useFilterStore } from '../../stores/filterStore';
import { getAttributeValue } from '../../Utils/helperFunctions';
const router = useRouter();
const filterStore = useFilterStore()
const studyStore = useStudyStore();
const viewStore = useViewStore();
const batchListById = ref([]);
const showAlert = ref(false);
const alertMessage = ref("")
const props = defineProps({
  batchNo: String
});
const batchStatus = ref('');
const batchId = ref(localStorage.getItem('batchId'));
const libPrepDayBatchData = ref([]);
const headers = [
  'Sr.No',
  'Batch No',
  'Pool Id',
  'Sample Barcode',
  'Library ID',
  'WG Concentration',
  'Input DNA Concentration',
  'Final Dilution Volume',
  'WG Well ID',
  'WG DNA',
  'RSB/NFW',
  'Well ID',
  'Final Library Concentration',
  'Library Size',
  'Comments',
  'QC Status'
]
onMounted (()=> {
  filterStore.setParams('')
})
const handleChnage = (item) => {
  const inputDNAConc = Number(item.lib_prep_day2_sample_input_dna);
  const wgConc = Number(item.lib_prep_day2_sample_wg_conc) || null;
  const result_sample_wg_dna = (inputDNAConc / wgConc).toFixed(2);
  if(isNaN(result_sample_wg_dna)){
    item.lib_prep_day2_sample_wg_dna = null;
  }
  else{
    item.lib_prep_day2_sample_wg_dna = result_sample_wg_dna
  }
  const finalDilutionVolume = Number(item.lib_prep_day2_sample_final_dilution_volume) || null;
  const wgDna = Number(item.lib_prep_day2_sample_wg_dna) || null;
  item.lib_prep_day2_sample_rsb_nfw = (finalDilutionVolume - wgDna).toFixed(2);
}


const fetchBatchListById = async () => {
  try {
    const inputModel = {
      batchId: Number(batchId.value),
      studyId: studyStore.selectedStudy.toString(),
      sort:"asc.display_order",
    };
    const response = await SampleController.batchListById(inputModel);
    if (response?.data?.length > 0) {
      const batchData = response.data[0];
      libPrepDayBatchData.value = response?.data[0];
      batchStatus.value = batchData?.batch[0]?.batchStatus;
      for (let i = 0; i < batchData.batchEntities.length; i++) {
        const currentCaseSample = batchData.batchEntities[i];
        for (let j = 0; j < batchData.batchSampleDetails.length; j++) {
          const currentDataItem = batchData.batchSampleDetails[j];
          if (currentDataItem.caseSampleId === currentCaseSample.entityId) {
            batchListById.value.push({ ...currentDataItem, ...currentCaseSample });
          }
        }
      }
    }
  } catch (error) {
    console.error("Error fetching batch list by ID:", error);
  }
};

const displayBatchList = computed(() => {
  const data = batchListById.value;
  if (data) {
     return data?.map((item) => {
      return reactive({
        ...item,
        library_id: getAttributeData(item.batchEntityId, "library_id"),
        pool_id: getAttributeData(item.batchEntityId, "pool_id"),
        [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day2_sample_wg_conc')]: getAttributeData(item.batchEntityId, "lib_prep_day2_sample_wg_conc") ? getAttributeData(item.batchEntityId, "lib_prep_day2_sample_wg_conc") : getAttributeData(item.batchEntityId, "lib_prep_day1_sample_wg_conc"),
        [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day2_sample_input_dna')]: getAttributeData(item.batchEntityId, "lib_prep_day2_sample_input_dna"),
        [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day2_sample_final_dilution_volume')]: getAttributeData(item.batchEntityId, "lib_prep_day2_sample_final_dilution_volume"),
        [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day2_sample_wg_well_id')]: getAttributeData(item.batchEntityId, "lib_prep_day2_sample_wg_well_id"),
        [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day2_sample_wg_dna')]: getAttributeData(item.batchEntityId, "lib_prep_day2_sample_wg_dna"),
        [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day2_sample_rsb_nfw')]: getAttributeData(item.batchEntityId, "lib_prep_day2_sample_rsb_nfw"),
        [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day2_sample_well_id')]: getAttributeData(item.batchEntityId, "lib_prep_day2_sample_well_id"),
        [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day2_sample_final_lib_conc')]: getAttributeData(item.batchEntityId, "lib_prep_day2_sample_final_lib_conc"),
        [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day2_sample_lib_size')]: getAttributeData(item.batchEntityId, "lib_prep_day2_sample_lib_size"),
        [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day2_sample_comment')]: getAttributeData(item.batchEntityId, "lib_prep_day2_sample_comment"),
        lib_prep_day2_sample_qc_status: getAttributeData(item.batchEntityId, "lib_prep_day2_sample_qc_status") ? getAttributeData(item.batchEntityId, "lib_prep_day2_sample_qc_status") : "LIB Prep Day 2 not Specified"
      });
    });
  }
  return data;
});

const getAttributeData = (batchEntityId, attributeName) => {
  const attribute = libPrepDayBatchData?.value?.batchEntityAttributes?.find(
    (attrib) =>
      attrib.batchEntityId === batchEntityId && attrib.attributeName === attributeName
  );
  if (attribute) {
    const attributeValue = attribute.attributeValue;
    if (
      attributeName === "lib_prep_day2_sample_wg_dna" ||
      attributeName === "lib_prep_day2_sample_rsb_nfw"
    ) {
      const numericValue = parseFloat(attributeValue).toFixed(2);
      return ((isNaN(attributeValue) || !isFinite(attributeValue)) ? null : numericValue);
    } else {
      return attributeValue;
    }
  } else {
    return null;
  }
};

const handleSave = () => {
  if (batchStatus.value === 'QC COMPLETED') {
    showAlert.value = true;
    alertMessage.value = "QC is completed you can't update the values"
  }
  else {
    viewStore.getEsignatureModal(true);
  }
}

const handleSubmit = async () => {
  let batchEntity = []
  let batchEntityAttributeVal = [];
  if (displayBatchList?.value?.length > 0) {
    libPrepDayBatchData?.value?.batchEntities?.forEach((item) => {
      displayBatchList?.value?.forEach((id) => {
        if (item.batchEntityId === id.batchEntityId) {
          Object.keys(id).forEach((key) => {
            if (key === 'lib_prep_day2_sample_qc_status' || key === 'lib_prep_day2_sample_comment' || key === 'lib_prep_day2_sample_well_id' || key=== 'lib_prep_day2_sample_wg_well_id') {
              batchEntityAttributeVal.push({
                batchEntityId: item.batchEntityId,
                attributeName: key,
                attributeValue: id[key]
              });
            } else if (key.startsWith("lib_prep_day2_sample")) {
              let attributeValue = null;
              if (key === 'lib_prep_day2_sample_wg_dna') {
                attributeValue = (id['lib_prep_day2_sample_input_dna'] / id['lib_prep_day2_sample_wg_conc']).toFixed(2);
              } else if (key === 'lib_prep_day2_sample_rsb_nfw') {
                attributeValue = (id['lib_prep_day2_sample_final_dilution_volume'] - id['lib_prep_day2_sample_wg_dna']).toFixed(2);
              } else {
                attributeValue = id[key];
              }
              batchEntityAttributeVal.push({
                batchEntityId: item.batchEntityId,
                attributeName: key,
                attributeValue: (attributeValue === null || attributeValue === '') ? null : Number(attributeValue)
              });
            }
          });

          let batchEntityObj = {
            batchId: Number(batchId.value),
            entityId: item.entityId,
            entityName: "CASE_SAMPLE",
            batchEntityId: item.batchEntityId,
            batchEntityStatus: id.lib_prep_day2_sample_qc_status
          }
          batchEntity.push(batchEntityObj)
        }
      });
    })
  }
  const inputModel = {
    batchModel: {
      batch: {
        batchId: Number(batchId.value),
        batchName: libPrepDayBatchData.value.batch[0].batchName,
        batchType: "LIB_PREP_DAY2",
        batchNumber: libPrepDayBatchData.value.batch[0].batchNumber,
        batchStatus: displayBatchList.value.some((item) => item.lib_prep_day2_sample_qc_status === 'LIB Prep Day 2 not Specified')
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
  };
  await SampleController.updateBatch(inputModel, router, "/libbatchlist")
}
const handleNumberInput = (event, item, field) => {
  let fieldPrefix = 'lib_prep_day2_sample_'
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
  handleChnage(item);
}
const handleTextInput =(event, item, field)=>{
  const regex = /^[a-zA-Z0-9]*$/;
      const input = event.target.value;
      if (!regex.test(input)) {
        item[field] = input.replace(/[^a-zA-Z0-9]/g, '');
      } else {
        item[field] = input;
      }
}
watch(
  () => studyStore.selectedStudy,
  () => {
    batchListById.value = []
    fetchBatchListById();
  },
  { immediate: true }
);

</script>
  
<style scoped>
.td-inp {
  height: 30px;
  width: 100px;
  text-align: center;
  border: 1px solid #a9a9a9;
}</style>
    