import { defineStore } from 'pinia';

export const useFilterStore = defineStore({
    id: 'filter',
    state: () => ({
       filterValue: 'All',
       gridSearchHeaders:[],
       filterParams:'',
       showFilterValue:true,
       parentFilterParams:''
    }),
    actions: {
        sucess(value) {
        this.filterValue = value
        },
        setGridSearch(value){
          this.gridSearchHeaders=value
        },
        setParams(value){
          this.filterParams=value
        },
        setShowFilter(value){
          this.showFilterValue = value
        },
        setParentFilterParams(value){
          this.parentFilterParams = value
        }
      },
      resetStore() {
        this.filterParams = ''
      }
});