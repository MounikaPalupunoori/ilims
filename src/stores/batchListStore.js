import { defineStore } from 'pinia';

export const useBatchListStore = defineStore({
    id: 'patient',
    state: () => ({
       saveSelection :[],
       isCheckAll:false,
       from:true,
       searchSampleData:[],
       batchNumber:'',
       ngsVerficationData:[]
    }),
    actions:{
        getSaveSelection(value,item,all){
        this.saveSelection = value;
        this.from = item;
        this.isCheckAll = all;
        this.searchSampleData=[];
        this.ngsVerficationData=[];
        },
        setData(newData) {
          this.searchSampleData = newData;
        },
        getisCheckAll(value){
            this.isCheckAll = value;
        },
        getSearchSampleData(payload) {
          if (!Array.isArray(payload.value)) {
              payload.value = [payload.value];
            }
            const newData = [...this.searchSampleData, ...payload.value];
            this.searchSampleData = newData;
             payload.router.push({
             path: "/batchCreation",
        });
       },
        reset(){
          this.saveSelection =[],
          this.isCheckAll=false,
          this.from=true,
          this.searchSampleData=[]
        },
        resetSelected(value){
          this.searchSampleData = value
        },
        setBatchNumber(value){
          this.batchNumber = value
        },
        setNgsVericationData(value){
          this.ngsVerficationData = value
        }
    },
});