import { defineStore } from 'pinia';

import { useFilterStore } from './filterStore';


export const usePatientStore = defineStore({
    id: 'patient',
    state: () => ({
       data :[
        {
            srno: 1,
            batchNo: 1251,
            noOfSamples: 3,
            createdby: "Atul B",
            createdon: "22/03/2023",
            accepted: "-",
            acceptedby: "-",
            status: "Pending"

        },
        {
            srno: 1,
            batchNo: 1251,
            noOfSamples: 3,
            createdby: "Atul B",
            createdon: "22/03/2023",
            accepted: "-",
            acceptedby: "-",
            status: "Pending"
        },
        {
            srno: 1,
            batchNo: 1251,
            noOfSamples: 3,
            createdby: "Atul B",
            createdon: "22/03/2023",
            accepted: "-",
            acceptedby: "-",
            status: "Accepted"
        },
        {
            srno: 1,
            batchNo: 1251,
            noOfSamples: 3,
            createdby: "Atul B",
            createdon: "22/03/2023",
            accepted: "-",
            acceptedby: "-",
            status: "Pending"
        },

    ]
    }),
    actions:{
        getData(value){
        this.data = value
        }
    },
    getters: {
        getFilteredData() {
            const filterValue = useFilterStore();
            if (!filterValue.filterValue || filterValue.filterValue === "All") {
                return this.data;
              }
            return this.data.filter(item => item.status === filterValue.filterValue);
          },
      },
});