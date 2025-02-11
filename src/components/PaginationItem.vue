<template>
    <v-pagination style="margin: 0px;" :length="totalPages" density="compact" v-model="pagination.currentPage"
        :total-visible="5"  @click="updatePage($event)">
        <template v-slot:prev="{ disabled }">
            <v-btn @click="prevPage($event)" text="Previous" class="pag-btn" :disabled="disabled"
                :style="{ color: disabled ? '#A9A9A9' : '#000000' }">
                <v-icon class="left-icon" icon="mdi-chevron-double-left" />Previous
            </v-btn>
        </template>

        <template v-slot:next="{ disabled }">
            <v-btn :disabled="disabled" v-if="!disabled" @click="nextPage($event)" :style="{ color: disabled ? '#A9A9A9' : '#000000' }" text="Next"
                class="pag-btn">
                Next <v-icon class="left-icon" icon="mdi-chevron-double-right" />
            </v-btn>
        </template>
    </v-pagination>
</template>
  
<script setup>
import { computed } from "vue";
import { usePaginationStore } from '../stores/paginationStore';
import { useFilterStore } from "../stores/filterStore";
import { useBatchListStore } from "../stores/batchListStore";
const pagination = usePaginationStore();
const filterValue = useFilterStore();
const batchStore = useBatchListStore();
const props = defineProps({
    totalItems: Number,
    fetchData: {
        type: Function,
    },
    isCheckAllFalse:{
        type:Function
    },
});


const prevPage = (e) => {
    e.stopPropagation();
    pagination.prev();
    if (filterValue.filterValue) {
        props.fetchData(filterValue.filterValue);
    }
    else {
        props.fetchData();
    }
  
};

const nextPage = (e) => {
    e.stopPropagation();
    pagination.next(props.totalItems);
    if (filterValue.filterValue) {
        props.fetchData(filterValue.filterValue);
    }
    else {
        props.fetchData();
    }
    batchStore.getisCheckAll(false)
};

const updatePage = (e) => {
    if(props.totalItems > 10){
    e.stopPropagation();
    if (filterValue.filterValue) {
        props.fetchData(filterValue.filterValue);
    }
    else {
        props.fetchData();
    }
    }
}

const totalPages = computed(() => Math.ceil(props.totalItems / 10));

</script>
<style scoped>
.pag-btn {
    text-transform: capitalize !important;
    box-shadow: none !important;
    background-color: white !important;
}

.left-icon {
    padding-top: 4px;
}
</style>