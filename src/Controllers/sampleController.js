
import { SampleService } from '../Services/sampleServices';
import { useLoaderStore } from '../stores/loaderStore';
import { useAlertStore } from '../stores/alertStore';
import {useViewStore} from '../stores/viewStore';
import { useBatchListStore } from '../stores/batchListStore';
import {usePaginationStore} from '../stores/paginationStore';
import {useFilterStore} from '../stores/filterStore'
const loaderStore = useLoaderStore();
const alertStore = useAlertStore();
const viewStore = useViewStore();
const batchStore = useBatchListStore();
const paginationStore = usePaginationStore();
const filterStore = useFilterStore();
export const SampleController = new (class { /// call this fn in ui to get data
    constructor() {
    }
  async getSamples(params) {
    try {
      loaderStore.showLoader(true)
      let response = await SampleService.getCaseSamples(params);
      if (response.statusCode == 200) {
        loaderStore.showLoader(false);
        return response;
      } else {
        loaderStore.showLoader(false);
        throw new Error('Failed to fetch data for selected algorithm config');
      }
    } catch (e) {
      loaderStore.showLoader(false);
    }
  }
  async getStudyTeams(params) {
    try {
      loaderStore.showLoader(true)
      let response = await SampleService.getStudyTeam(params);
      if (response.statusCode == 200) {
        loaderStore.showLoader(false)
        return response;
      } else {
        loaderStore.showLoader(false)
        throw new Error('Failed to fetch data for selected algorithm config');
      }
    } catch (e) {
      loaderStore.showLoader(false);
    }
  }

  async createBatch(params,router,routerValue) {
    try {
      loaderStore.showLoader(true);
      let response = await SampleService.createBatch(params);
      if (response.statusCode == 200) {
        loaderStore.showLoader(false);
        batchStore.reset();
        viewStore.reset();
        paginationStore.resetPage(1);
        router.push(routerValue);
        let getSampleStatus = localStorage.getItem('sampleStatus');
        if(getSampleStatus === 'LIB_PREP_DAY1_PASSED'){
          localStorage.setItem('lipTab','day2')
        }
        else if(getSampleStatus === 'DNA_ISOLATION_PASSED'){
          localStorage.setItem('lipTab','day1')
        }
        alertStore.success(response.message)
        return response;
      } else {
        loaderStore.showLoader(false);
        alertStore.error(response.message)
        throw new Error('Failed to fetch data for selected algorithm config');
      }
    } catch (e) {
      loaderStore.showLoader(false);
    }
  }
  async getBatchList(params) {
    try {
      loaderStore.showLoader(true);
      let response = await SampleService.batchList(params);
      loaderStore.showLoader(false);
      return response;
      // if (response.statusCode == 200) {
      //   loaderStore.showLoader(false);
      //   return response;
      // } else {
      //   loaderStore.showLoader(false);
      //   //alertStore.error(response.message)
      //   throw new Error('Failed to fetch data for selected algorithm config');
      // }
    } catch (e) {
      loaderStore.showLoader(false);
    }
  }
  async batchListById(params) {
    try {
      loaderStore.showLoader(true);
      let response = await SampleService.batchListById(params);
      loaderStore.showLoader(false);
      return response;
      // if (response.statusCode == 200) {
      //   loaderStore.showLoader(false);
      //   return response;
      // } else {
      //   loaderStore.showLoader(false);
      //   //alertStore.error(response.message)
      //   throw new Error('Failed to fetch data for selected algorithm config');
      // }
    } catch (e) {
      loaderStore.showLoader(false);
    }
  }
  async updateBatch(params,router,routerValue,batchType) {
    try {
      loaderStore.showLoader(true);
      let response = await SampleService.updateBatch(params);
      if (response.statusCode == 200) {
        loaderStore.showLoader(false);
        batchStore.reset();
        viewStore.reset();
        paginationStore.resetPage(1);
        filterStore.sucess('All');
        if(batchType === 'LIB_PREP_DAY1'){
           localStorage.setItem('lipTab','day1')
        }
        else if(batchType === 'LIB_PREP_DAY2'){
          localStorage.setItem('lipTab','day2')
        }
        router.push(routerValue);
        alertStore.success(response.message)
        return response;
      } else {
        loaderStore.showLoader(false);
        alertStore.error(response.message)
        throw new Error('Failed to fetch data for selected algorithm config');
      }
    } catch (e) {
      loaderStore.showLoader(false);
    }
  }
  async getSampleTypes(params) {
    try {
      let response = await SampleService.getSampleTypes(params);
      return response;
    } catch (e) {
      alertStore.error(e)
    }
  }
  async getSpecimenList(params) {
    try {
      let response = await SampleService.getSpecimenList(params);
      loaderStore.showLoader(false);
      return response;
    } catch (e) {
      alertStore.error(e)
    }
  }
  async getBatchEntityStatus(params) {
    try {
      let response = await SampleService.getBatchEntityStatus(params);
      return response;
    } catch (e) {
      alertStore.error(e)
    }
  }
  async getAllKitTypes() {
    try {
      let response = await SampleService.getKitTypes();
      loaderStore.showLoader(false);
      return response;
    } catch (e) {
      alertStore.error(e)
    }
  }
  async getKitDetails(params) {
    try {
      let response = await SampleService.getKitDetails(params);
      loaderStore.showLoader(false);
      return response;
    } catch (e) {
      alertStore.error(e)
    }
  }
  async getBatchEntityDetails(params) {
    try {
      loaderStore.showLoader(true);
      let response = await SampleService.getBatchEntityDetails(params);
      loaderStore.showLoader(false);
      return response;
    } catch (e) {
      loaderStore.showLoader(false);
      alertStore.error(e)
    }
  }
  async getSearchBatchEntity(params) {
    try {
      loaderStore.showLoader(true);
      let response = await SampleService.getSearchBatchEntity(params);
      loaderStore.showLoader(false);
      return response;
    } catch (e) {
      loaderStore.showLoader(false);
      alertStore.error(e)
    }
  }
  async getBatchEntityAttributes(params) {
    try {
      loaderStore.showLoader(true);
      let response = await SampleService.getBatchEntityAttributes(params);
      loaderStore.showLoader(false);
      return response;
    } catch (e) {
      loaderStore.showLoader(false);
      alertStore.error(e)
    }
  }
  async generateSequenceId(params) {
    try {
      loaderStore.showLoader(true);
      let response = await SampleService.generateSequenceId(params);
      loaderStore.showLoader(false);
      return response;
    } catch (e) {
      loaderStore.showLoader(false);
      alertStore.error(e)
    }
  }
  })();