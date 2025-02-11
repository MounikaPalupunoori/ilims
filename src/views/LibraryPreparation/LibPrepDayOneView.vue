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
          <td>{{ item.library_id ?item.library_id  : '-'}}</td>
          <td>{{ item.sampleBarcode ? item.sampleBarcode : '-'}}</td>
          <td> <input class="td-inp" type="text" :disabled="batchStatus === 'QC COMPLETED'"  @input="handleNumberInput($event, item, 'qubit_ng_ul')"
              v-model="item.lib_prep_day1_sample_qubit_ng_ul" /></td>
          <td><input class="td-inp" type="text" :disabled="batchStatus === 'QC COMPLETED'" @input="handleNumberInput($event, item, 'input_dna_conc')"
              v-model="item.lib_prep_day1_sample_input_dna_conc" /></td>
          <td><input class="td-inp" type="text" :disabled="batchStatus === 'QC COMPLETED'"  @input="handleNumberInput($event, item, 'final_dilution_volume')"
              v-model="item.lib_prep_day1_sample_final_dilution_volume" /></td>
          <td><input class="td-inp" type="text" disabled="true" readonly v-model="item.lib_prep_day1_sample_dna" /></td>
          <td><input class="td-inp" type="text" disabled="true" readonly v-model="item.lib_prep_day1_sample_nfw_rsb" />
          </td>
          <td><input class="td-inp" type="text" :disabled="batchStatus === 'QC COMPLETED'"  v-model="item.lib_prep_day1_sample_dilution_well_id"
             @input="handleTextInput($event, item, 'lib_prep_day1_sample_dilution_well_id')" /></td>
          <td>
            <v-autocomplete class="libprep-select"
            v-model="item.well_id"
                  :items="wellIdList"
                  variant="outlined"
                  density="compact"
                  item-title="name"
                  item-value="name"
                  placeholder="Select"
                  :disabled="batchStatus === 'QC COMPLETED'" 
                  @update:modelValue="handleWellId(item)"
                >
                  <template v-slot:item="{ props, item }">
                    <v-list-item style="min-height: 10px;padding:0px 4px;"
                      v-bind="props"
                      :title="item.raw.name"
                    ></v-list-item>
                  </template>
                </v-autocomplete>
          </td>
          <td>
            <v-autocomplete class="libprep-select"
            v-model="item.primer_name"
            :items="item.primer_name_options"
                  variant="outlined"
                  density="compact"
                  item-title="name"
                  item-value="name"
                  placeholder="Select"
                  :disabled="batchStatus === 'QC COMPLETED'" 
                  @update:modelValue="handlePrimeName(item)"
                >
                  <template v-slot:item="{ props, item }">
                    <v-list-item style="min-height: 10px;padding:0px 4px;"
                      v-bind="props"
                      :title="item.raw.name"
                    ></v-list-item>
                  </template>
                </v-autocomplete>
           </td>
          <td>
            <input class="td-inp" type="text" 
            :disabled="batchStatus === 'QC COMPLETED'" @input="handleNumberInput($event, item, 'wg_conc')"  v-model="item.lib_prep_day1_sample_wg_conc" />
          </td>
          <td>
            <input class="td-inp" type="text" 
            :disabled="batchStatus === 'QC COMPLETED'" @input="handleNumberInput($event, item, 'lib_size')" v-model="item.lib_prep_day1_sample_lib_size" />
          </td>
          <td> <select :disabled="batchStatus === 'QC COMPLETED'" class="dropdown" v-model="item.lib_prep_day1_sample_qc_status">
              <option value="LIB Prep Day 1 not Specified">Not Specified</option>
              <option value="LIB Prep Day 1 Passed">Passed</option>
              <option value="LIB Prep Day 1 Failed">Failed</option>
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
    <EsignatureModal v-if="viewStore.eSignatureModal" :handleSubmit="handleSubmit" text="I am updating LIB_PREP_DAY1" />
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
import { useFilterStore } from '../../stores/filterStore';
import EsignatureModal from '../../components/EsignatureModal.vue';
import { useViewStore } from '../../stores/viewStore';
import { getAttributeValue } from '../../Utils/helperFunctions';
const router = useRouter();
const filterStore = useFilterStore();
const studyStore = useStudyStore();
const viewStore = useViewStore();
const batchListById = ref([]);
const showAlert = ref(false);
const alertMessage = ref("");
const props = defineProps({
  batchNo: String
});
const batchStatus = ref('');
const batchId = ref(localStorage.getItem('batchId'));
const libPrepDayBatchData = ref([]);
const wellIdList=ref([]);
const kitDetails=ref([]);
const headers = [
  'Sr.No',
  'Batch No',
  'Library ID',
  'Sample Barcode',
  'Qubit(ng/ul)',
  'Input DNA Concentration',
  'Final Dilution Volume',
  'DNA',
  'NFW/RSB',
  'Dilution Well ID',
  'Index Well ID',
  'Primer Name',
  'WG Concentration',
  'Library Size',
  'QC Status'
]

onMounted(()=> {
  filterStore.setParams('');
})
const handleChnage = (item) => {
  const inputDNAConc = Number(item.lib_prep_day1_sample_input_dna_conc) || null;
  const dnsIsolation = Number(item.lib_prep_day1_sample_qubit_ng_ul) || null;
  const result_sample_dna = (inputDNAConc / dnsIsolation).toFixed(2);
  if(isNaN(result_sample_dna)){
    item.lib_prep_day1_sample_dna = null;
  }
  else{
    item.lib_prep_day1_sample_dna = result_sample_dna
  }
  const finalDilutionVolume = Number(item.lib_prep_day1_sample_final_dilution_volume) || null;
  const DNA = Number(item.lib_prep_day1_sample_dna) || null;
  item.lib_prep_day1_sample_nfw_rsb = (finalDilutionVolume - DNA).toFixed(2);
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
      libPrepDayBatchData.value = response.data[0];
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
    alert(error)
  }
};



const handleWellId = (item) => {
  item.primer_name_options=[];
  item.p7_index=[];
  item.p5_index_reverse=[];
  item.p5_index_forwards=[];
  item.primer_name=null;
  kitDetails?.value?.forEach((value) => {
    if (value.wellId === item.well_id) {
      item.primer_name_options.push({
          name:value.primerName 
        })
      item.p7_index.push(value.p7Index);
      item.p5_index_reverse.push(value.p5IndexReverse);
      item.p5_index_forwards.push(value.p5IndexForwards);
    }
  });
};

const handlePrimeName=(item)=>{
  kitDetails?.value?.forEach((value) => {
    if (value.wellId === item.well_id && value.primerName === item.primer_name) {
      item.p7_index= value.p7Index;
      item.p5_index_reverse =value.p5IndexReverse;
      item.p5_index_forwards=value.p5IndexForwards;
    }
  });
}
const handleNumberInput = (event, item, field) => {
  let fieldPrefix = 'lib_prep_day1_sample_'
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
const displayBatchList = computed(() => {
  const data = batchListById.value
  if (data) {
    return data?.map((item) => {
      return reactive({
        ...item,
        p7_index:getAttributeData(item.batchEntityId, "p7_index"),
        p5_index_forwards:getAttributeData(item.batchEntityId, "p5_index_forwards"),
        p5_index_reverse:getAttributeData(item.batchEntityId, "p5_index_reverse"),
        library_id: getAttributeData(item.batchEntityId, "library_id"),
        [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day1_sample_qubit_ng_ul')]: getAttributeData(item.batchEntityId, "lib_prep_day1_sample_qubit_ng_ul") ? getAttributeData(item.batchEntityId, "lib_prep_day1_sample_qubit_ng_ul") : getAttributeData(item.batchEntityId, "dna_isolation_sample_qubit_conc_ng_ul"),
        [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day1_sample_input_dna_conc')]: getAttributeData(item.batchEntityId, "lib_prep_day1_sample_input_dna_conc"),
        [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day1_sample_final_dilution_volume')]: getAttributeData(item.batchEntityId, "lib_prep_day1_sample_final_dilution_volume"),
        [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day1_sample_dna')]: getAttributeData(item.batchEntityId, "lib_prep_day1_sample_dna"),
        [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day1_sample_nfw_rsb')]: getAttributeData(item.batchEntityId, "lib_prep_day1_sample_nfw_rsb"),
        [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day1_sample_dilution_well_id')]: getAttributeData(item.batchEntityId, "lib_prep_day1_sample_dilution_well_id"),
        [getAttributeValue(studyStore.entityStudyAttributeModel, 'well_id')]: getAttributeData(item.batchEntityId, "well_id"),
        [getAttributeValue(studyStore.entityStudyAttributeModel, 'primer_name')]: getAttributeData(item.batchEntityId, "primer_name"),
        [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day1_sample_wg_conc')]: getAttributeData(item.batchEntityId, "lib_prep_day1_sample_wg_conc"),
        lib_prep_day1_sample_lib_size: getAttributeData(item.batchEntityId, "lib_prep_day1_sample_lib_size"),
        lib_prep_day1_sample_qc_status: getAttributeData(item.batchEntityId, "lib_prep_day1_sample_qc_status") ? getAttributeData(item.batchEntityId, "lib_prep_day1_sample_qc_status") : "LIB Prep Day 1 not Specified",
        primer_name_options: getPrimerNamesForWellId(getAttributeData(item.batchEntityId, "well_id")),
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
      attributeName === "lib_prep_day1_sample_dna" ||
      attributeName === "lib_prep_day1_sample_nfw_rsb"
    ) {
      const numericValue = parseFloat(attributeValue).toFixed(2);
      return ((isNaN(attributeValue) || !isFinite(numericValue)) ? null : numericValue);
    } else {
      return attributeValue;
    }
  } else {
    return null;
  }
};
const getPrimerNamesForWellId = (wellId) => {
  return kitDetails?.value?.filter(item => item.wellId === wellId)
    .map(item => ({ name: item.primerName}));
};
const getKitDetails=async()=>{
  const inputModel = {
      batchId: Number(batchId.value)
    };
    const response = await SampleController.getKitDetails(inputModel);
    if(response?.data){
      kitDetails.value = response?.data?.index_plate_subtypes
      wellIdList.value =  response?.data?.index_plate_subtypes?.map((item)=>{
             return{
              name:item.wellId,
             }
       })
    }
}

const handleSave = () => {
  if (batchStatus.value === 'QC COMPLETED') {
    showAlert.value = true;
    alertMessage.value = "QC is completed you can't update the values"
  }
  else {
    for (const item of displayBatchList.value) {
        if ((item.lib_prep_day1_sample_qc_status === 'LIB Prep Day 1 Passed') &&
            ((item.well_id === '' ||  item.well_id === null) || (item.primer_name === '' || item.primer_name === null) )) {
              showAlert.value = true;
              alertMessage.value='Please provide the Index Well ID and Primer Name to ensure that the samples pass the QC.'
          return;
        }
      }
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
            if (key === 'lib_prep_day1_sample_qc_status' || key === 'primer_name' 
            || key === 'well_id' || key=== 'p7_index' 
            || key === 'p5_index_forwards' || key === 'p5_index_reverse' || key === 'lib_prep_day1_sample_dilution_well_id') {
              batchEntityAttributeVal.push({
                batchEntityId: item.batchEntityId,
                attributeName: key,
                attributeValue: id[key] != null ? id[key].toString()  : id[key]
              });
            }
            else if (key.startsWith("lib_prep_day1_sample")) {
              let attributeValue = null;
              if (key === 'lib_prep_day1_sample_dna') {
                const inputDnaConc = (id['lib_prep_day1_sample_input_dna_conc']);
                const qubitNgUl = (id['lib_prep_day1_sample_qubit_ng_ul']);
                const result_sample_dna = (inputDnaConc / qubitNgUl).toFixed(2);
                if (isNaN(result_sample_dna)) {
                  attributeValue = null;
                }
                else {
                  attributeValue = result_sample_dna
                }
              } else if (key === 'lib_prep_day1_sample_nfw_rsb') {
                const finalDilutionVolume = (id['lib_prep_day1_sample_final_dilution_volume']);
                const sampleDna = (id['lib_prep_day1_sample_dna']);
                if (finalDilutionVolume === null && sampleDna === null) {
                  attributeValue = null
                }
                else {
                  attributeValue = finalDilutionVolume - sampleDna;
                }
              }
              else {
                attributeValue = id[key];
              }
              batchEntityAttributeVal.push({
                batchEntityId: item.batchEntityId,
                attributeName: key,
                attributeValue: (attributeValue === null || attributeValue === '') ? null : Number(attributeValue)
              });
            }
          });
          var batchEntityObj = {
            batchId: Number(batchId.value),
            entityId: item.entityId,
            entityName: "CASE_SAMPLE",
            batchEntityId: item.batchEntityId,
            batchEntityStatus: id.lib_prep_day1_sample_qc_status
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
        batchType: "LIB_PREP_DAY1",
        batchNumber: libPrepDayBatchData.value.batch[0].batchNumber,
        batchStatus: displayBatchList.value.some((item) => item.lib_prep_day1_sample_qc_status === 'LIB Prep Day 1 not Specified')
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

watch(
  () => studyStore.selectedStudy,
  () => {
    batchListById.value = []
    fetchBatchListById();
    getKitDetails()
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
}
.dropdown{
  padding: 5px; 
  border:0.1px solid grey;
}

</style>
  