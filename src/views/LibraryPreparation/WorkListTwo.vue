<template>
    <div class="d-flex justify-content-between flex-column page-view-ht">
      <div class="d-flex justify-content-space-between align-items-center">
        <div class="container-fluid p-3" style="background-color: #d9d9d9">
          <v-row>
            <v-col class="d-flex align-items-center justify-content-flex-start" cols="4">
              <div class="d-flex align-items-center justify-content-center" style="width: 250px">
                <span class="batchNo">Batch No.&nbsp;</span>
                <v-text-field density="compact" variant="outlined" hide-details style="background-color: white"
                :value="batchListById && batchListById[0] && batchListById[0].batchNumber"></v-text-field>
              </div>
            </v-col>
            <!-- <v-spacer></v-spacer> -->
            <v-col class="d-flex align-items-center justify-content-end" cols="8">
              <div class="filter-btn">
                <span :style="{ color: 'black' }">Alloted To</span>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
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
            <td>{{ item.sampleBarcode }}</td>
            <td><input class="td-inp" type="text" v-model="item.lib_prep_day2_sample_lib_pool_id" /></td>
            <td><input class="td-inp" type="text" v-model="item.lib_prep_day2_sample_lib_id" /></td>
            <td><input class="td-inp" type="text" v-model="item.lib_prep_day2_sample_wg_well_id" /></td>
            <td><input class="td-inp" type="text" v-model="item.lib_prep_day2_sample_wg_conc" /></td>
            <td><input class="td-inp" type="text" v-model="item.lib_prep_day2_sample_wg_dna" /></td>
            <td><input class="td-inp" type="text" v-model="item.lib_prep_day2_sample_input" /></td>
            <td><input class="td-inp" type="text" v-model="item.lib_prep_day2_sample_well_id" /></td>
            <td><input class="td-inp" type="text" v-model="item.lib_prep_day2_sample_final_lib_conc" /></td>
            <td><input class="td-inp" type="text" v-model="item.lib_prep_day2_sample_comment" /></td>
            <td>
              <input class="td-inp" type="text" v-model="item.lib_prep_day1_sample_wg_conc" />
            </td>
          </tr>
        </tbody>
      </v-table>
      <div class="p-2 d-flex justify-content-center align-items-center br-bt" style="background-color: white">
        <button type="button" class="btn border-btn m-2" @click="router.push('/libbatchlist')">
          close
        </button>
        <button type="button" class="btn filled-btn" @click="handleSave()">Save</button>
      </div>
      <EsignatureModal v-if="viewStore.eSignatureModal" :handleSubmit="handleSubmit" />
      <v-snackbar :timeout="2000" location="top" v-model="showAlert" color="#dc3545">
      {{ alertMessage }}
      <template v-slot:actions>
        <v-icon @click="showAlert = false" icon="mdi mdi-close-circle-outline"/>
      </template>
    </v-snackbar>
    </div>
  </template>
  <script setup>
  import { defineProps, ref, watchEffect ,watch,computed} from 'vue'
  import { useRouter } from 'vue-router';
  import EsignatureModal from '../../components/EsignatureModal.vue';
  import { useViewStore } from '../../stores/viewStore';
  import { useStudyStore } from '../../stores/studyStore';
  import { SampleController } from '../../Controllers/sampleController';
  import { getAttributeValue } from '../../Utils/helperFunctions';
  const router = useRouter();
  const props = defineProps({
    batchNo: String
  })
  const showAlert = ref(false);
  const alertMessage = ref("")
  const localBatchNo = ref(props.batchNo);
  const viewStore = useViewStore();
  watchEffect(() => {
    localBatchNo.value = props.batchNo
  })
  
  const studyStore = useStudyStore();
  const batchListById = ref([]);
  
  
  const headers = [
    'Sample ID',
    'Library Pool Id',
    'Library Id',
    'WG Well ID',
    'WG Concentration',
    'WG DNA',
    'Input',
    'Well ID',
    'Final Library Concentration',
    'Comment',
    'Action'
  ]
  const handleSubmit = async () => {
    var entityIds = [];
    var batchEntityAttributeVal = [];
    if (displayBatchList.value.length > 0) {
      displayBatchList.value.forEach(item => {
        entityIds.push(item.caseSampleId);
      });
      displayBatchList.value.forEach((item) => {
        Object.keys(item).forEach((key) => {
          if (key.startsWith("lib_prep_day2_sample")) {
            batchEntityAttributeVal.push({
              batchId: Number(localBatchNo.value),
              entityId: item.caseSampleId,
              attributeName: key,
              attributeValue: item[key],
            });
          }
        });
      });
    }
    const inputModel = {
      batchModel: {
        studyId: [studyStore.selectedStudy],
        batch: {
          batchId: Number(localBatchNo.value),
          batchName: batchListById.value[0].batchName,
          batchType: "LIB_PREP_DAY1",
          batchNumber: batchListById.value[0].batchNumber,
          batchStatus: 'COMPLETED',
          entityName: "CASE_SAMPLE",
          entityIds: entityIds.join(','),
          batchEntityAttributeVal: batchEntityAttributeVal
        }
      },
      eSignatureModel: {
        username: viewStore.eSignatureForm.username,
        password: viewStore.eSignatureForm.password,
        changeReasonDetail: viewStore.eSignatureForm.changeReasonDetail
      }
    };
    console.log(inputModel)
    await SampleController.updateBatch(inputModel, router , "/libbatchlist")
  }
  const fetchBatchListById = async () => {
    const inputModel = {
      studyId: Number(studyStore.selectedStudy),
      batchId: Number(localBatchNo.value)
    };
    const response = await SampleController.batchListById(inputModel);
    if (response && response.data && response.data.length > 0) {
      batchListById.value = response.data;
    }
  }
  watch(
    () => studyStore.selectedStudy,
    () => {
      fetchBatchListById();
    },
    { immediate: true }
  );
  const displayBatchList = computed(() => {
    const data = batchListById.value[0] && batchListById.value[0].batchSampleDetails;
  
    if (data) {
      return data.map((item) => {
        return {
          ...item,
          [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day2_sample_lib_pool_id')]: getAttributeData(item.caseSampleId,"lib_prep_day2_sample_lib_pool_id"),
          [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day2_sample_lib_id')]: getAttributeData(item.caseSampleId,"lib_prep_day2_sample_lib_id"),
          [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day2_sample_wg_well_id')]: getAttributeData(item.caseSampleId,"lib_prep_day2_sample_wg_well_id"),
          [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day2_sample_wg_conc')]: getAttributeData(item.caseSampleId,"lib_prep_day2_sample_wg_conc"),
          [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day2_sample_wg_dna')]: getAttributeData(item.caseSampleId,"lib_prep_day2_sample_wg_dna"),
          [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day2_sample_input')]: getAttributeData(item.caseSampleId,"lib_prep_day2_sample_input"),
          [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day2_sample_well_id')]: getAttributeData(item.caseSampleId,"lib_prep_day2_sample_well_id"),
          [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day2_sample_final_lib_conc')]: getAttributeData(item.caseSampleId,"lib_prep_day2_sample_final_lib_conc"),
          [getAttributeValue(studyStore.entityStudyAttributeModel, 'lib_prep_day2_sample_comment')]: getAttributeData(item.caseSampleId,"lib_prep_day2_sample_comment"),
        };
      });
    }
    return data;
  });
  const getAttributeData = (entityId, attributeName) => {
    const data = batchListById.value[0] && batchListById.value[0].batchEntityAttributeVal;
    const attribute = data.find(
      (attrib) =>
        attrib.entityId === entityId && attrib.attributeName === attributeName
    );
    return attribute ? attribute.attributeValue : "";
  };
  const handleSave = () => {
    for (let i = 0; i < displayBatchList.value.length; i++) {
      const obj = displayBatchList.value[i];
      if (
        obj.lib_prep_day2_sample_lib_pool_id === "" ||
        obj.lib_prep_day2_sample_lib_id === "" ||
        obj.lib_prep_day2_sample_wg_well_id === "" ||
        obj.lib_prep_day2_sample_wg_conc === "" ||
        obj.lib_prep_day2_sample_wg_dna === "" ||
        obj.lib_prep_day2_sample_input === "" ||
        obj.lib_prep_day2_sample_well_id === "" ||
        obj.lib_prep_day2_sample_final_lib_conc === "" ||
        obj.lib_prep_day2_sample_comment === "" ||
        obj.lib_prep_day1_sample_wg_conc === ""
      ) {
        showAlert.value = true
        alertMessage.value = 'Please fill in all the required fields'
        return;
      }
    }
    viewStore.getEsignatureModal(true);
  }
  
  </script>
  <style scoped>
  .header-checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .action-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border: 1px solid #2996fb;
    border-radius: 4px;
  }
  
  .action-icon {
    color: #2996fb;
    font-size: 15px;
  }
  
  .batchNo {
    color: #007bff;
    font-weight: 500;
  }
  
  .filter-btn {
    border: 1px solid #007bff;
    padding: 3px 10px;
    margin: 0px 2px;
    color: #000000;
    font-size: 14px;
    width: 130px;
    text-align: center;
  }
  
  .td-inp {
    height: 30px;
    width: 100px;
    text-align: center;
    border: 1px solid #a9a9a9;
  }
  </style>
  