import { defineStore } from 'pinia';

export const useViewStore = defineStore({
    id: 'view',
    state: () => ({
        searchResultsBlock:false,
        eSignatureModal:false,
        eSignatureForm:[],
        confirmationBox: false
    }),
    actions: {
        getSearchResultsBlock(value){
            this.searchResultsBlock = value;
        },
        getEsignatureModal(value){
            this.eSignatureModal = value;
        },
        getEsignatureForm(value){
            this.eSignatureForm = value
        },
        getConfirmationBox(value){
            this.confirmationBox = value
        },
        reset(){
            this.searchResultsBlock = false;
            this.eSignatureModal = false;
            this.eSignatureForm=[];
            this.confirmationBox = false;
        }
    }
});