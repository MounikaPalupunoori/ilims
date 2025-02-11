<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-row justify="center">
    <v-dialog v-model="props.showModal" transition="dialog-top-transition" persistent width="auto">
      <v-card>
        <v-table class="table-ht br-bt">
          <thead>
            <tr style="background-color: #007Bff;">
              <th v-for="(header, index) in headers" :key="index" scope="col" class="th-clr th-txt">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in displayData" :key="index" class="tr-txt">
              <td>{{ item.library_id }}</td>
              <td>{{ item.sample_barcode }}</td>
              <td><input class="td-inp" disabled="true" v-model="item.well_id" type="text" /></td>
              <td><input class="td-inp" disabled="true" style="width: 100%;" v-model="item.primer_name" type="text" /></td>
              <td><input class="td-inp" disabled="true" v-model="item.p5_index_forwards" type="text" /></td>
              <td><input class="td-inp" disabled="true" v-model="item.p5_index_reverse" type="text" /></td>
              <td><input class="td-inp" disabled="true" v-model="item.p7_index" type="text" /></td>
              <td>
                <div class="d-flex align-items-center flex-column">
                  <input class="td-inp" v-model="item.poolNo" @input="handlePoolNumberInput" type="text" placeholder="Pool Number">
                  <span v-if="item.errorMessage" class="error-msg">{{ item.errorMessage }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div class="p-2 d-flex justify-content-center align-items-center br-bt" style="background-color: white">
          <button type="button" class="btn border-btn m-2" @click="close">
            close
          </button>
          <button type="button" class="btn filled-btn btn-wd" @click="handleCreate()">Generate Pool ID</button>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
  <EsignatureModal v-if="viewStore.eSignatureModal" :handleSubmit="handleSubmit"
    text="I am creating LIB_PREP_DAY2 batch" />
  <v-dialog width="500" v-model="showAlert">
    <v-card>
      <v-card-text>
        Please enter a pool No for each sample. If you prefer not to pool the samples, just enter a unique number
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="ok" @click="showAlert=false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import EsignatureModal from '../../components/EsignatureModal.vue';
import { useViewStore } from '../../stores/viewStore';
import { SampleController } from '../../Controllers/sampleController';
import { useRouter } from 'vue-router';
import { ref, computed, reactive } from 'vue';
import { useAlertStore } from '../../stores/alertStore';
const props = defineProps({
  showModal: Boolean,
  close: {
    type: Function
  },
  submit: {
    type: Function
  },
  selectedSamples: Array,
  generatedBy: String
})
const router = useRouter();
const viewStore = useViewStore();
const alertStore = useAlertStore();
const showAlert = ref(false);
const UserEmail = localStorage.getItem('userName');
const duplicatePoolNumbers = ref([]);
const headers = [
  'Library ID',
  'Sample ID',
  'Index ID',
  'Index Plate (Manufacture Details)',
  'P5 Index forwords',
  'P5 Index reverse',
  'P7 Index',
  'Pool No',
]

const checkDuplicate = () => {
  displayData.value.forEach(data => {
    if (!('errorMessage' in data)) {
      data.errorMessage = '';
    } else {
      if (data.p5_index_forwards.trim() !== '' && data.p7_index.trim() !== '' && data.poolNo.trim() !== '') {
        data.errorMessage = '';
      }
    }
  });
  displayData.value.forEach((currentData, index) => {
    const duplicates = displayData.value.filter((data, i) => {
      return i !== index &&
        data.p5_index_forwards === currentData.p5_index_forwards &&
        data.p7_index === currentData.p7_index &&
        data.poolNo === currentData.poolNo;
    });
    if (duplicates.length > 0 && currentData.p5_index_forwards.trim() !== '' && currentData.p7_index.trim() !== '' && currentData.poolNo.trim() !== '') {
      displayData.value[index].errorMessage = 'Same p5_index_forwards and p7_index cannot be pooled together.';
    }
  });
};

const handlePoolNumberInput = (event) => {
  const inputValue = event.target.value;
  const numericValue = parseInt(inputValue);
  if (isNaN(numericValue) || numericValue <= 0) {
    event.target.value = "";
    displayData.value.forEach(data => {
      if (data.poolNo === inputValue) {
        data.poolNo = "";
      }
    });
  } else {
    displayData.value.forEach(data => {
      if (data.poolNo === inputValue) {
        data.poolNo = numericValue.toString();
      }
    });
  }
  checkDuplicate();
};

const handleCreate = () => {
  let hasEmptyPoolNo = false;
  displayData.value.forEach((item) => {
    if (item.poolNo === "") {
      hasEmptyPoolNo = true;
    }
  });
  if (hasEmptyPoolNo) {
    showAlert.value = true;
  }
  else {
    let hasErrors = false;
      displayData.value.forEach(data => {
        if (data.errorMessage) {
          hasErrors = true;
        }
      });
      if (hasErrors) {
        alertStore.error('Please fix all errors before submitting.');
        return;
      }
      else {
        viewStore.getEsignatureModal(true);
      }
  }
}

const handleSubmit = async () => {
  let caseSamples = [];
  let batchEntityAttributeVal = [];
  if (displayData.value && displayData.value.length > 0) {
    displayData.value.forEach((item) => {
      if (item.poolNo) {
        caseSamples.push({ caseSampleId: Number(item.entity_id), poolNo: Number(item.poolNo),batchEntityId:item.batch_entity_id});
        Object.keys(item).forEach((key) => {
          if(key === 'p7_index' || key==='p5_index_forwards' || key==='p5_index_reverse' || key=== 'well_id' || key==='primer_name'){
            batchEntityAttributeVal.push({
              attributeName: key,
              attributeValue: item[key]
            });
          }
          else if (key.startsWith("lib_prep_day2_sample")) {
            batchEntityAttributeVal.push({
              attributeName: key,
              attributeValue: item[key]
            });
          }
        });
      }

    })
  }
  const inputModel = {
    batchModel: {
      batch: {
        batchId: null,
        batchName: null,
        batchNumber: null,
        batchType: 'LIB_PREP_DAY2',
        batchStatus: 'PENDING',
        batchAttribute: [
          {
            attributeName: 'generated_by',
            attributeValue: UserEmail
          },
          {
            attributeName: 'generated_on',
            attributeValue: new Date()
          }
        ],
        caseSamples: caseSamples,
      },
      isLibraryIdGeneration: false,
      isLPoolIdGeneration: true
    },
    eSignatureModel: {
      username: viewStore.eSignatureForm.username,
      password: viewStore.eSignatureForm.password,
      changeReasonDetail: viewStore.eSignatureForm.changeReasonDetail
    }
  }
  await SampleController.createBatch(inputModel, router, '/libbatchlist')
}

const displayData = computed(() => {
  return props.selectedSamples.map((item) => {
    return reactive({
      ...item,
      poolNo: "",
      well_id: item.well_id,
      primer_name:item.primer_name,
      p5_index_forwards:item.p5_index_forwards,
      p5_index_reverse:item.p5_index_reverse,
      p7_index:item.p7_index
    })
  })
})

const close=()=>{
  props.close();
  duplicatePoolNumbers.value = []
}
</script>
<style scoped>
.th-clr {
  color: white !important;
}

.td-inp {
  height: 30px;
  width: 100px;
  text-align: center;
  border: 1px solid #a9a9a9;
}
.error-msg{
  color: red;
  font-size: 12px;
}
</style>
