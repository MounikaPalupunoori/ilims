<template>
  <div class="filter-div d-flex mt-1" v-if="filterButtons.length > 0">
    <!-- <div v-for="(filterbutton, index) in filterButtons" :key="index" class="filter-btn">
            <span :style="{ color: filterbutton.color }" :class="{ 'disabled': filterbutton.disable }">{{ filterbutton.text }}</span> -->
    <div v-if="props.filterTitle">{{ props.filterTitle }}:&nbsp;</div>
    <div v-else>Filter By:&nbsp;</div>
    <div v-for="(filterbutton, index) in props.filterButtons" :key="index">
      <div class="filter-btn pointer" @click="filterHandle(filterbutton.text)" :style="{backgroundColor: filterbutton.text === filterStore.filterValue ? filterbutton.color : 'transparent'}">
        <span :style="{ color: filterbutton.color , color: filterbutton.text === filterStore.filterValue ? 'white' : filterbutton.color}">{{ filterbutton.text }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useFilterStore } from '../stores/filterStore';
import { usePaginationStore } from '../stores/paginationStore';

const props = defineProps({
  filterButtons: Array,
  filterTitle: String
})
const filterStore = useFilterStore();
const pagination = usePaginationStore();

const filterHandle = (value) => {
  pagination.resetPage(1)
  filterStore.sucess(value)
}
</script>
<style scoped>
.filter-div {
  background: white;
  padding: 10px;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  font-weight: 400;
  font-size: 1rem;
}

.filter-btn {
  border: 1px solid #a9a9a9;
  padding: 3px 10px;
  margin: 0px 2px;
  color: #000000;
  font-size: 14px;
  width: 130px;
  text-align: center;
  white-space: nowrap;
}

.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
