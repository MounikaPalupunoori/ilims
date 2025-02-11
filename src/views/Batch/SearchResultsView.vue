<template>
  <div class="pt-5 px-0">
    <v-table>
      <thead>
        <tr class="tr-bg">
          <th>
            <div class="d-flex align-items-center justify-content-center" style="font-weight: 600">
              <input type="checkbox" v-if="viewStore.searchResultsBlock" @click="checkAll()" v-model="batchStore.isCheckAll" />
              <div class="pl-2 th-txt">Sample Barcode</div>
            </div>
          </th>
          <th v-for="(header, index) in headers" :key="index" scope="col" class="th-txt">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in results" class="tr-txt" :key="index">
          <td>
            <div class="d-flex align-items-center">
              <div class="pr-2" v-if="viewStore.searchResultsBlock">
                <input type="checkbox" :value="item" v-model="selectedSamples" @change="updateCheckall()" />
              </div>
              <div>{{ item.sampleBarcode ? item.sampleBarcode : '-' }}</div>
            </div>
          </td>
          <td>{{ item.accessionId ? item.accessionId : "-" }}</td>
          <td>{{ item.suid ? item.suid : "-" }}</td>
          <td>{{ item.full_name
            ? item.full_name
            : "-" }}</td>
          <td>{{ item.age ? item.age : "-" }}</td>
          <td>{{ item.gender ? item.gender : "-" }}</td>
          <td>{{ item.sample_type ? item.sample_type : "-" }}</td>
          <td>-</td>
          <td>{{ item.testNames ? item.testNames : "-" }}</td>
          <td>
            {{ item.collection_date ? formatDate(item.collection_date) : '-' }}
          </td>
          <td>{{ item.received_date ? formatDate(item.received_date) : '-' }}</td>
          <td>
            {{ item.status ? item.status : '-' }}
          </td>
          <td v-if="(!viewStore.searchResultsBlock && getSampleStatus === 'DNA_ISOLATION_PASSED')"><v-icon
              v-if="item.isOriginal" class="add-icon" @click="addDuplicateRow(index)" icon="mdi mdi-plus-circle"></v-icon>
            <v-icon icon="mdi mdi-minus-circle" class="delete-icon" v-else @click="removeRow(index)"></v-icon>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div v-if="results.length === 0" class="d-flex justify-content-center align-items-center p-3 no-data-txt">
      No Data Found
    </div>
    <div class="d-flex align-items-center justify-content-end br-bt pag-div-ht" v-if="viewStore.searchResultsBlock">
      <div class="d-flex align-items-center">
        <v-pagination style="margin: 0px" :length="totalPages" density="compact" @click="updatePage($event)"
          v-model="paginationstore.currentPage" :total-visible="5">
          <template v-slot:prev="{ disabled }">
            <v-btn :disabled="disabled" @click="prevPage($event)" text="Previous" class="pag-btn"
              :style="{ color: disabled ? '#A9A9A9' : '#000000' }">
              <v-icon class="left-icon" icon="mdi-chevron-double-left" />Previous
            </v-btn>
          </template>
          <template v-slot:next="{ disabled }">
            <v-btn :disabled="disabled" v-if="!disabled" @click="nextPage($event)"
              :style="{ color: disabled ? '#A9A9A9' : '#000000' }" text="Next" class="pag-btn">
              Next <v-icon class="left-icon" icon="mdi-chevron-double-right" />
            </v-btn>
          </template>
        </v-pagination>
      </div>
    </div>
    <div class="d-flex align-items-center justify-content-center p-3 br-bt" v-if="viewStore.searchResultsBlock">
      <div class="d-flex align-items-center">
        <button type="button" class="btn border-btn m-2" @click="viewStore.getSearchResultsBlock(false)">Close</button>
        <button type="submit" v-if="results.length > 0" class="btn filled-btn m-2 btn-wd" @click="saveSelection">
          Save Selection
        </button>
      </div>
    </div>
    <v-snackbar :timeout="2000" location="top" v-model="showAlert" color="#dc3545">
      {{ alertMessage }}
      <template v-slot:actions>
        <v-icon @click="showAlert = false" icon="mdi mdi-close-circle-outline" />
      </template>
    </v-snackbar>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useBatchListStore } from '../../stores/batchListStore';
import { usePaginationStore } from '../../stores/paginationStore';
import { useAlertStore } from '../../stores/alertStore';
import { formatDate } from '../../Utils/helperFunctions';
import { useViewStore } from '../../stores/viewStore';
const alertStore = useAlertStore();
const batchStore = useBatchListStore();
const paginationstore = usePaginationStore();
const router = useRouter();
const showAlert = ref(false);
const alertMessage = ref("");
const viewStore = useViewStore();

const props = defineProps({
  searchResults: Array,
  searchResultsApi: {
    type: Function
  },
  totalCount: Number,
})
const getSampleStatus = localStorage.getItem('sampleStatus');
const headers = [
  'AccessionNumber',
  'PUID',
  'Name',
  'Age',
  'Gender',
  'Sample Type',
  'Sample Category',
  'Panel/Test Name',
  'Collection Date',
  'Received Date',
  'Sample Status',
  (getSampleStatus === 'DNA_ISOLATION_PASSED' && !viewStore.searchResultsBlock) ? 'Action' : ""
]
const totalPages = computed(() => Math.ceil(props.totalCount && props.totalCount / 10));
const selectedSamples = ref(batchStore.saveSelection);
const results = computed(() =>
  batchStore.from
    ? props?.searchResults?.map((lang) => ({ ...lang, currentPage: paginationstore.currentPage, isOriginal: true }))
    : props.searchResults
)
const addDuplicateRow = (index) => {
  const newItem = { ...results.value[index], isOriginal: false };
  results.value.splice(index + 1, 0, newItem);
};
const removeRow = (index) => {
  results.value.splice(index, 1);
};
const prevPage = (e) => {
  e.stopPropagation();
  paginationstore.prev()
  batchStore.getisCheckAll(true);
  props.searchResultsApi()
}
const updatePage = (e) => {
  if (props.totalCount > 10) {
    e.stopPropagation();
    props.searchResultsApi()
  }
}
const nextPage = (e) => {
  e.stopPropagation();
  paginationstore.next(props.totalCount && props.totalCount)
  batchStore.getisCheckAll(false)
  props.searchResultsApi()
}

const saveSelection = () => {
  if (selectedSamples.value.length == 0) {
    showAlert.value = true
    alertMessage.value = 'Please select atleast one sample';
  } else {
    paginationstore.resetPage(1);
    batchStore.getSaveSelection(selectedSamples, false, true, router);
    viewStore.getSearchResultsBlock(false)
  }
}

function checkAll() {
  batchStore.getisCheckAll(!batchStore.isCheckAll)
  if (batchStore.isCheckAll) {
    for (const lang of props.searchResults) {
      lang.currentPage = paginationstore.currentPage
      selectedSamples.value.push({ ...lang, isOriginal: true })
    }
  } else {
    selectedSamples.value = selectedSamples?.value?.filter(
      (lang) => lang.currentPage !== paginationstore.currentPage
    )
  }
}

function updateCheckall() {
  if (selectedSamples.value.length === props.searchResults.length) {
    batchStore.getisCheckAll(true)
  } else {
    batchStore.getisCheckAll(false)
  }
}

</script>
<style scoped>
.tr-bg {
  background: #f4f3f3;
}

.th-txt {
  color: black !important;
}

.pag-btn {
  text-transform: capitalize !important;
  box-shadow: none !important;
  background-color: white !important;
}

.left-icon {
  padding-top: 4px;
}

.add-icon {
  height: 30px;
  width: 30px;
  color: #007BFF;
}

.delete-icon {
  height: 30px;
  width: 30px;
  color: red;
}</style>
