import { defineStore } from 'pinia'
export const useAddButtonStore = defineStore({
  id: 'addButton',
  state: () => ({
    btnTitle: '',
    pageTitle:'',
    sampleStatus:localStorage.getItem('sampleStatus') ? localStorage.getItem('sampleStatus') : "",
    batchNumber:''
  }),
  actions: {
    success(label, title,number) {
      this.btnTitle = { label }
      this.pageTitle = { title }
      this.batchNumber = {number}
    },
    getsampleStatus(value){
      this.sampleStatus = value
    },
  }
})
