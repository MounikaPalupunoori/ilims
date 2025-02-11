import { defineStore } from 'pinia';

export const useStudyStore = defineStore({
    id: 'study',
    state: () => ({
       selectedStudy:localStorage.getItem("studyId") ? localStorage.getItem("studyId") :"select study",
       entityStudyAttributeModel:[],
       enityBasedAttributes:[],
    }),
    actions: {
        getSelectedStudy(value){
            this.selectedStudy = value;
        },
        getEntityStudyAttribute(value){
            this.entityStudyAttributeModel = value
        },
        getEnityBasedAttribute(value){
            this.enityBasedAttributes = value;
        }
    }
});