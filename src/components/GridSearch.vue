<template>
    <div class="d-flex align-items-center">
        <v-menu>
            <template v-slot:activator="{ props }">
                <button class="btn filled-btn btn-wd" style="padding: 4px;" v-bind="props">
                    <div class="d-flex align-items-center">
                        <v-icon size="20">
                    mdi mdi-filter-variant
                    </v-icon>&nbsp;Filter
                    </div>
                   </button>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in filterStore.gridSearchHeaders" :key="index" :value="index" @click="selectFilterKey(item)">
                    <v-list-item-title v-model="filterKey" :style="{ color: item.isAdded ? '#007BFF' : '' }"
                        >{{ item.key }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <div class="d-flex align-items-center justify-content-between" style="width: 100%;overflow-x: auto;" v-if="filterStore.showFilterValue">
            <div class="d-flex align-items-center ml-2">
                <div v-for="(header, index) in selectedHeaders" :key="index" class="filter-criteria">
                    <label class="space-wrap">{{ header.key }}:&nbsp;</label>
                    <input v-model="header.value" class="input-box"  @keyup="resizeInputField($event, index,header)"
                     :style="{ width: header.inputWidth }"
                      style="max-width: 200px;" @keyup.enter="handleSearch" placeholder="Enter values">
                    <v-icon color="#007bff" @click="removeHeader(header,index)">
                        mdi-close
                    </v-icon>
                    <span v-if="index < selectedHeaders.length - 1" class="filter-separator">AND</span>
                </div>
            </div>
            <div class="space-wrap">
                <button @click="handleSearch" v-if="selectedHeaders.length > 0"
                    class="btn filled-btn btn-wd">Search</button>
                <button @click="clearFilter" v-if="selectedHeaders.length > 0" class="btn border-btn btn-wd">Clear</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useFilterStore } from '../stores/filterStore';
import {ref,watch} from 'vue';
import { useAlertStore } from '../stores/alertStore';
import {useStudyStore} from '../stores/studyStore';
import { usePaginationStore } from '../stores/paginationStore';
const filterStore = useFilterStore();
const selectedHeaders = ref([]);
const alertStore = useAlertStore();
const studyStore = useStudyStore();
const paginationStore = usePaginationStore();
const filterKey = ref('');
const props = defineProps({
    fetchData: {
        type: Function
    },
    placeholder: String,
    headers: Array,
    paramMappings: Array,
    clearSelectedSamples:{
        type:Function
    }
})
const maxWidth = 200;
const removeHeader = (header,index) => {
    const selectedHeader = selectedHeaders.value[index];
    const filterHeaderIndex = filterStore.gridSearchHeaders.findIndex(header => header.key === selectedHeader.key);
    if (filterHeaderIndex !== -1) {
        filterStore.gridSearchHeaders[filterHeaderIndex].isAdded = false;
    }
    selectedHeaders.value.splice(index, 1);

    if (selectedHeaders.value.length === 0) {
        filterStore.setParams('')
        props.fetchData();
        paginationStore.resetPage(1);
        filterStore.setShowFilter(false);
        if (props.clearSelectedSamples) {
            props.clearSelectedSamples()
        }
    }
};
function resizeInputField(event, index,header) {
  const currentWidth = (event.target.value.length + 1) * 8; 
  if (currentWidth < 120) {
    header.inputWidth = '120px';
  } else if (currentWidth > maxWidth) {
    header.inputWidth = maxWidth + 'px';
  } else {
    header.inputWidth = currentWidth + 'px';
  }
}
const selectFilterKey = (item) => {
    filterStore.setShowFilter(true);
    const isEmptyValue = selectedHeaders.value.some(header => header.value === '');
    if (isEmptyValue) {
        alertStore.error("Please enter a value");
        return;
    }
    const existingHeaderIndex = selectedHeaders.value.findIndex(header => header.key === item.key);
    if (existingHeaderIndex === -1) {
        selectedHeaders.value.push({ key: item.key, value: '', param: item.param, inputWidth: '120px' });
        const filterHeaderIndex = filterStore.gridSearchHeaders.findIndex(header => header.key === item.key);
        if (filterHeaderIndex !== -1) {
            filterStore.gridSearchHeaders[filterHeaderIndex].isAdded = true;
        }
    } else {
        selectedHeaders.value.splice(existingHeaderIndex, 1);
        const filterHeaderIndex = filterStore.gridSearchHeaders.findIndex(header => header.key === item.key);
        if (filterHeaderIndex !== -1) {
            filterStore.gridSearchHeaders[filterHeaderIndex].isAdded = false;
        }
    }
};



const handleSearch = () => {
    paginationStore.resetPage(1);
    let missingKeys = [];
    for (const header of selectedHeaders.value) {
        if (!header.value.trim()) {
            missingKeys.push(header.key);
        }
    }
    if (missingKeys.length > 0) {
        const missingKeysMessage = missingKeys.join(', ');
        alertStore.error(`Please enter a value for ${missingKeysMessage}`)
    } else {
        const filterQueryStrings = selectedHeaders.value
            .map(obj => `${obj.param}=${obj.value.trim()}`)
            .join('&');
            filterStore.setParams(filterQueryStrings)
        props.fetchData(filterQueryStrings)
    }
}

const clearFilter = () => {
    selectedHeaders.value = [];
    filterStore.setParams('')
    props.fetchData();
    filterStore.gridSearchHeaders.forEach(header => {
        header.isAdded = false;
    });
    filterStore.sucess('All');
    paginationStore.resetPage(1);
    filterStore.setShowFilter(false);
    if (props.clearSelectedSamples) {
        props.clearSelectedSamples()
    }
    }
watch(
  () => studyStore.selectedStudy,
  (newStudy) => {
    selectedHeaders.value = [];
    filterStore.gridSearchHeaders.forEach(header => {
        header.isAdded = false;
    });
    filterStore.sucess('All');
    filterStore.setParams('');
    paginationStore.resetPage(1);
  },
  { immediate: true }
)
</script>
<style>
.input-box{
    border:0.5px solid #E0E0E0;
    padding: 5px;
    border-radius: 5px;
}
.filter-criteria {
    display: flex;
    align-items: center;
}

.filter-criteria:not(:last-child) {
    margin-right: 5px;
}

.filter-separator {
    margin-left: 5px;
    margin-right: 5px;
    font-size: 12px;
}
.span {
    font-weight: 200px;
}
.space-wrap{
    white-space: nowrap;
}
</style>