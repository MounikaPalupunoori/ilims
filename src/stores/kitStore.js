// kitStore.js
import { defineStore } from 'pinia';

export const useKitStore = defineStore('kitStore', {
  state: () => ({
    kitName: '',
    plateName: '',
    plateSubTypes: null,
    plateNameList: [],
    plateSubTypesList: []
  }),

  getters: {
    getKitName: (state) => state.kitName,
    getPlateName: (state) => state.plateName,
    getPlateSubTypes: (state) => state.plateSubTypes,
    getPlateSubTypesList: (state) => state.plateSubTypesList,
    getPlateNameList: (state) => state.plateNameList
  },
  
  actions: {
    setKitName(value) {
      this.kitName = value;
    },
    setPlateName(value) {
      this.plateName = value;
    },
    setPlateNameList(value) {
      this.plateNameList = value;
    },
    setPlateSubTypes(value) {
      this.plateSubTypes = value;
    },
    setPlateSubTypesList(value) {
      this.plateSubTypesList = value;
    },
    resetStore() {
    this.kitName = '';
    this.plateName = '';
    this.plateSubTypes = null;
    this.plateSubTypesList = [];
    this.plateNameList = [];
    }
  }
});
