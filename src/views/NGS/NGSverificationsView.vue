<template>
  <div class="d-flex justify-content-between" style="flex-direction: column; height: 100%">
    <v-table class="table-ht br-bt">
      <thead>
        <tr>
          <th style="width: 70px;" class="th-txt">Action</th>
          <th v-for="(header, index) in headers" :key="index" scope="col" class="th-txt">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody v-if="(displayBatchList && displayBatchList.length > 0)">
        <tr v-for="(item, index) in displayBatchList" class="tr-txt" :key="index" draggable="true"
          @dragstart="dragStart(index)" @dragover="dragOver" @drop="drop(index)">
          <td>
            <v-tooltip text="Drag and drop" color="#E5E5E5">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" icon="mdi mdi-drag"></v-icon>
              </template>
            </v-tooltip>
          </td>
          <td>{{ item.sampleBarcode ? item.sampleBarcode : 'NA' }}</td>
          <td>{{ item.pool_id ? item.pool_id : 'NA' }}</td>
          <td>{{ item.library_id ? item.library_id : 'NA' }}</td>
          <td>{{ item.patientGender }}</td>
          <td>{{ item.p7_index ? item.p7_index : 'NA' }}</td>
          <td>{{ item.p5_index_forward ? item.p5_index_forward : 'NA' }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="8" class="no-data-txt text-center">No data found</td>
        </tr>
      </tbody>
    </v-table>
    <div class="p-2 d-flex justify-content-center align-items-center br-bt" style="background-color: white">
      <button type="button" class="btn border-btn m-2" @click="router.push('/NGSRuns')">
        close
      </button>
      <button type="button" class="btn filled-btn btn-wd" @click="handleSave()">Generate Run</button>
      <button type="button" :disabled="!isEqual" class="btn filled-btn btn-wd" @click="handleMeta()">Generate
        Meta</button>
    </div>
  </div>
  <EsignatureModal v-if="viewStore.eSignatureModal" :handleSubmit="openMetaModal ? generateMeta : generateRun"
    :text=EsignatureText() />
  <confirmationPopup v-if="viewStore.confirmationBox" />
  <v-dialog v-model="openMetaModal" transition="dialog-top-transition" persistent width="85%">
    <v-card>
      <v-toolbar class="toolbar">
        <div style="width: 100%;display: flex;">
          <div class="display-flex align-items-center justify-content-center" style="width: 100%;">
            <h5>Generate Meta</h5>
          </div>
          <div class="close-icon pointer" :style="{ 'pointer-events': loaderStore.loader ? 'none' : 'auto' }"
            @click="closeModal()"><v-icon icon="mdi mdi-close"></v-icon></div>
        </div>
      </v-toolbar>
      <v-table class="table-ht br-bt">
        <thead>
          <tr>
            <th v-for="(header, index) in metaHeaders" :key="index" scope="col" class="th-txt">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody v-if="(displayBatchList && displayBatchList.length > 0)">
          <tr v-for="(item, index) in displayBatchList" class="tr-txt" :key="index">
            <td>{{ item.sampleBarcode ? item.sampleBarcode : 'NA' }}</td>
            <td>{{ item.pool_id ? item.pool_id : 'NA' }}</td>
            <td>{{ item.library_id ? item.library_id : 'NA' }}</td>
            <td>
              <input class="td-inp-filed" @input="adjustWidth" :style="{ width: inputWidth }" type="text"
                v-model="basePath" />
            </td>
            <td>{{ item.run ? item.run : 'NA' }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="8" class="no-data-txt text-center">No data found</td>
          </tr>
        </tbody>
      </v-table>
      <v-card-actions class="justify-center">
        <div class="p-2 d-flex justify-content-center align-items-center br-bt" style="background-color: white">
          <button type="button" class="btn border-btn m-2" @click="closeModal()">
            close
          </button>
          <button type="button" class="btn border-btn m-2" @click="handleMetaSubmit()">
            Download
          </button>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch, reactive,onMounted } from 'vue';
import { SampleController } from '../../Controllers/sampleController';
import { SampleService } from '../../Services/sampleServices';
import { useStudyStore } from '../../stores/studyStore';
import { useRouter } from 'vue-router';
import { patientController } from '../../Controllers/patientController';
import EsignatureModal from '../../components/EsignatureModal.vue';
import confirmationPopup from '../../components/confirmationPopup.vue';
import { useViewStore } from '../../stores/viewStore';
import instance from '../../Utils/axiosInterceptors';
import { useLoaderStore } from '../../stores/loaderStore';
import { useFilterStore } from '../../stores/filterStore';
import { useAlertStore } from '../../stores/alertStore';
import { useBatchListStore } from '../../stores/batchListStore';
const router = useRouter();
const studyStore = useStudyStore();
const filterStore = useFilterStore();
const viewStore = useViewStore();
const loaderStore = useLoaderStore();
const alertStore = useAlertStore();
const batchId = ref(localStorage.getItem('batchId'));
const openMetaModal = ref(false);
const batchStore = useBatchListStore();
const inputWidth = ref('100%')
const batchListById = ref([]);
const batchList = ref([]);
const run = ref('');
const draggedItem = ref(null);
const isEqual = ref(false);
const basePath= ref('');
const headers = ['Sample Barcode',
  'Pool Id',
  'Library Id',
  'Gender',
  'P7 Index',
  'P5 Index Forward'];
const metaHeaders = [
'Sample Barcode',
  'Pool Id',
  'Library Id',
  'BasePath',
  'Run'
]
const draggableStart = ref(false)
let entityId;
let extractedOrderedData = [];
let caseSampleData;
let bedData;
const fetchBatchListById = async () => {
  const inputModel = {
    batchId: Number(batchId.value),
    studyId: studyStore.selectedStudy.toString(),
    sort:"asc.display_order",
  };
  const response = await SampleController.batchListById(inputModel);
  entityId = Array.from(new Set(response.data[0].batchEntities.map((x)=> x.entityId)));
  const isNGSInputFileId = response.data[0].batchAttributes.find((x)=> x.attributeName === 'ngs_input_file_ids');
  if (isNGSInputFileId === undefined) {
    isEqual.value = false;
  } else {
    isEqual.value = true;
  }
  entityId = entityId.join();
  getCaseSampleData();
  if (response?.data?.length > 0) {
    batchList.value = response.data[0];
    const batchData = response.data[0];
    const promisesMap = new Map();
    for (let i = 0; i < batchData.batchEntities.length; i++) {
      const currentCaseSample = batchData.batchEntities[i];
      for (let j = 0; j < batchData.batchSampleDetails.length; j++) {
        const currentDataItem = batchData.batchSampleDetails[j];
        currentDataItem.gender = "";
        if (!promisesMap.has(currentDataItem.subjectId)) {
          promisesMap.set(
            currentDataItem.subjectId,
            getPatientDetails(currentDataItem.subjectId)
          );
        }
        promisesMap.get(currentDataItem.subjectId)
          .then((gender) => {
            if (gender && currentDataItem.caseSampleId === currentCaseSample.entityId) {
              currentDataItem.gender = gender;
              batchListById.value.push({ ...currentDataItem, ...currentCaseSample });
            }
          });
      }
    }
    await Promise.all(promisesMap.values());
  }
};
const adjustWidth = (e) => {
   const currentWidth = (e.target.value.length + 1) * 8; 
  if (currentWidth < 120) {
    inputWidth.value = '200px';
  } else {
    inputWidth.value = currentWidth + 'px';
  }
};

const closeModal=()=>{
  openMetaModal.value = false;
  basePath.value = ''
}

const compareArrays = () => {
  for (let i = 0; i < batchStore.ngsVerficationData.length; i++) {
    if (batchStore.ngsVerficationData[i].caseSampleId !== displayBatchList.value[i].caseSampleId) {
      isEqual.value = false;
      return false;
    }
  }
};
const dragStart = (index) => {
  draggableStart.value = true
  draggedItem.value = displayBatchList.value[index];
};

const dragOver = (event) => {
  event.preventDefault();
};

const drop = (index) => {
  const draggedIndex = displayBatchList.value.indexOf(draggedItem.value);
  if (draggedIndex !== index) {
    const batchListCopy = [...batchListById.value];
    const [removedItem] = batchListCopy.splice(draggedIndex, 1);
    batchListCopy.splice(index, 0, removedItem);
    batchListById.value = batchListCopy;
  }
  compareArrays();
};
const displayBatchList = computed(() => {
  const data = batchListById.value;
  let bedFileValue;
  if (data) {
    const sortedData = draggableStart.value ? data : data.sort((a, b) => {
      return  a.displayOrder - b.displayOrder
    });
    return sortedData.map((item) => { 
      if(bedData !== undefined) {
        bedFileValue = bedData.find((x) => x.entityId === item.entityId);
      }
      const formattedBedFile = bedFileValue === undefined || bedFileValue?.bedFile === undefined ||  bedFileValue?.bedFile === '' ? 'NA' :  bedFileValue?.bedFile;
      const runValue = 'Run-XXXX' + ';' + item.specimen + ';' + (item.location != null ? item.location : 'NA') + ';' + formattedBedFile + ';' + (item.specimen === 'SINGLE CELL' ? 'singlecell' : 'NA');
      return reactive({
        ...item,
        library_id: getAttributeData(item.batchEntityId, "library_id"),
        pool_id: getAttributeData(item.batchEntityId, "pool_id"),
        p5_index_forward: getAttributeData(item.batchEntityId, "p5_index_forwards"),
        p7_index: getAttributeData(item.batchEntityId, "p7_index"),
        patientGender: item.gender,
        specimen: item.specimen,
        run: runValue
      });
    });
  }
  return data;
});

const handleSave = () => {
  viewStore.getEsignatureModal(true)
}
async function getCaseSampleData() {  
  const data = {
    caseSampleModel: {
      studyFilter: [studyStore.selectedStudy],
      pagination: {
        search: `caseSampleIds=${entityId}`
      },
      includeMeta: true,
      includeTest: true,
      includeSubjectMeta:true,
      includeAccessionMeta:true
    }
  }
  caseSampleData =await SampleService.getCaseSamples(data);
  mappedBedFileData()
}
const mappedBedFileData = () => {
  const testData = caseSampleData.data.map(data => ({
    specimen: data.specimen,
    caseSampleID: data.caseSampleId,
    test: data.tests[0]['test']
  }));
  const results = [];
  extractedOrderedData.forEach(extractedItem => {
    testData.forEach(testItem => {
      if (extractedItem.testName === testItem.test && extractedItem.specimen === testItem.specimen) {
        results.push({
          entityId: testItem.caseSampleID,
          test: testItem.test,
          specimen:testItem.specimen,
          bedFile: extractedItem.bedFile
        });
      }
    });
  });
  bedData = results;
  return results;
}
const handleMetaSubmit = () => {
  if (basePath.value === '') {
    alertStore.error('Please enter BasePath');
  } else {
    for (let item of displayBatchList.value) {
      if (item.run === '') {
        alertStore.error('Please enter Run');
        return;
      }
    }
    viewStore.getConfirmationBox(true)
  }
}

const generateRun = async () => {
  if(isEqual.value === false) {
    updateBatchAttributes()
  }
  let data = {};
  loaderStore.showLoader(true);
  data.batchId = Number(batchId.value);
  data.studyId = Number(studyStore.selectedStudy);
  data.username = viewStore.eSignatureForm.username;
  data.password = viewStore.eSignatureForm.password;
  data.changeReasonDetail = viewStore.eSignatureForm.changeReasonDetail;
  data.batchEntity = [];
  displayBatchList.value.forEach((item, index) => {
    var batchEntityList = {
      batchEntityId: item.batchEntityId,
      displayOrder: (index + 1)
    };
    data.batchEntity.push(batchEntityList);
  });
  await instance({
    method: 'POST',
    url: '/api/v1/batches/generateRunCSV',
    data
  })
    .then((resp) => {
      if (resp) {
        loaderStore.showLoader(false)
        window.open(resp.signedURL);
        alertStore.success(resp.msg);
        viewStore.getEsignatureModal(false);
        isEqual.value = true;
      }
    }).catch((error) => {
      loaderStore.showLoader(false)
      alertStore.error(error)
    })
}

const updateBatchAttributes = async () => {
  const inputModel = {
    batchModel: {
      batch: {
        batchId: Number(batchId.value),
        batchName: batchList.value && batchList.value.batch && batchList.value.batch[0].batchName,
        batchType: 'NGS',
        batchNumber: batchList.value && batchList.value.batch && batchList.value.batch[0].batchNumber,
        batchStatus: 'SUBMITTED',
        batchAttributes: [
          {
            batchId: batchId.value,
            attributeName: 'meta_file_id',
            attributeValue: ''
          },
          {
            batchId: batchId.value,
            attributeName: 'run_id',
            attributeValue: ''
          }
        ],
        batchEntityAttributes: []
      }
    },
    eSignatureModel: {
      username: viewStore.eSignatureForm.username,
      password: viewStore.eSignatureForm.password,
      changeReasonDetail: viewStore.eSignatureForm.changeReasonDetail
    }
  };
  await SampleController.updateBatch(inputModel, router, '')
}

const getPatientDetails = async (id) => {
  const inputModel = {
    subjectModel: {
      subject: {
        subjectId: Number(id),
        studyId: [studyStore.selectedStudy]
      }
    }
  };
  const response = await patientController.getPatient(inputModel)
  if (response) {
    let attribute = response.attributes.find(attr => attr.name === 'gender');
    return attribute.value.value
  }
}


const getAttributeData = (batchEntityId, attributeName) => {
  const attribute = batchList?.value?.batchEntityAttributes?.find(
    (attrib) =>
      attrib.batchEntityId === batchEntityId && attrib.attributeName === attributeName
  );
  if (attribute) {
    const attributeValue = attribute.attributeValue;
    return attributeValue;
  } else {
    return "";
  }
};

const generateMeta = async () => {
  let data = {};
  loaderStore.showLoader(true);
  data.batchId = Number(batchId.value);
  data.studyId = Number(studyStore.selectedStudy);
  data.username = viewStore.eSignatureForm.username;
  data.password = viewStore.eSignatureForm.password;
  data.changeReasonDetail = viewStore.eSignatureForm.changeReasonDetail;
  data.batchAttribute = {
    base_path: basePath.value
  },
    data.batchEntityAttribute = [];
  displayBatchList.value.forEach((item) => {
    var batchEntityAttribute = {
      run: item.run,
    };
    data.batchEntityAttribute.push(batchEntityAttribute);
  });
  await instance({
    method: 'POST',
    url: '/api/v1/batches/generateRunMetaExcel',
    data
  })
    .then((resp) => {
      if (resp) {
        loaderStore.showLoader(false)
        alertStore.success(resp.msg)
        window.open(resp.signedURL);
        viewStore.getEsignatureModal(false);
        openMetaModal.value = false;
        basePath.value = '';
      }
    }).catch((error) => {
      alertStore.error(error)
      loaderStore.showLoader(false)
    })
}
const EsignatureText = () => {
  if (openMetaModal.value) {
    return 'I am generating meta csv file'
  }
  else {
    return 'I am generating csv file'
  }
}

const handleMeta = () => {
  openMetaModal.value = true
}
onMounted(async() => {
  filterStore.setParams('');
  if (batchStore && displayBatchList.value.length > 0) {
    batchStore.setNgsVericationData(displayBatchList.value)
  }
  const inputModel = {
    studyId: Number(studyStore.selectedStudy),
    orderFrom: 'orderTest'
  }
  const orderResponse = await patientController.getOrderTestModel(inputModel);
  orderResponse?.data.specimenTestsMapping.forEach(val => {
    const { sampleType, specimen, tests } = val;
    tests.forEach(test => {
      const { tests: testName, bedFile } = test;
      extractedOrderedData.push({ sampleType, specimen, testName, bedFile });
    });
  });
})
watch(
  () => displayBatchList.value.length > 0,
  () => {
    batchStore.setNgsVericationData(displayBatchList.value)
    compareArrays();
  },
)
watch(
  () => studyStore.selectedStudy,
  () => {
    batchListById.value = []
    fetchBatchListById()
  },
  { immediate: true }
)
</script>

<style>
.close-icon {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}

.toolbar {
  text-align: center;
  width: 100%;
  background-color: #007bffff;
  color: white;
}

.td-inp-filed {
  height: 30px !important;
  text-align: center !important;
  border: 1px solid #a9a9a9 !important;
}
</style>