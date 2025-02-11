
import { PatientService } from '../Services/patientServices';
import { OrderTestService } from '../Services/OrderTestService';
import { useAlertStore } from '../stores/alertStore';
import { useLoaderStore } from '../stores/loaderStore';
import { usePaginationStore } from '../stores/paginationStore';
import { useViewStore } from '../stores/viewStore';
const loaderStore = useLoaderStore();
const alertStore = useAlertStore();
const viewStore = useViewStore();
const paginationStore = usePaginationStore();
export const patientController = new (class {
  constructor() {}
  async getPatients(params) {
    try {
      loaderStore.showLoader(true)
      let response = await PatientService.getPatientsList(params)
      if (response.statusCode == 200) {
        loaderStore.showLoader(false);
        return response;
      } else {
        loaderStore.showLoader(false);
        throw new Error('Failed to fetch data for selected algorithm config');
      }
    } catch (e) {
      loaderStore.showLoader(false);
      console.log(e)
    }
  }
  async addPatient(params,route,text,msg) {
    try {
      loaderStore.showLoader(true)
      let response = await PatientService.addPatient(params)
      if (response.statusCode == 200) {
        viewStore.getEsignatureModal(false)
        loaderStore.showLoader(false);
        paginationStore.resetPage(1);
         if(msg != false){
         alertStore.success(msg)
         }
        if(text === 'patientList'){
          localStorage.setItem('patientId', '')
          route.push('/patientList')   
        }else{
          localStorage.setItem('accessionId','')
          if(response.data.id){
            localStorage.setItem('subjectId', response.data.id)
          } 
          route.push({ name: 'orderTest', params: { path: 'Create' } })
        }
        return response;
      } else {
        alertStore.error(response.message)
        loaderStore.showLoader(false);
        throw new Error('Failed to fetch data for selected algorithm config');
      }
    } catch (e) {
      loaderStore.showLoader(false);
      console.log(e)
    }
  }
  async getPatient(params) {
    try {
      loaderStore.showLoader(true)
      let response = await PatientService.getPatient(params)
      if (response.statusCode == 200) {
        loaderStore.showLoader(false);
        return response.data.subjectModel;
      } else {
        loaderStore.showLoader(false);
        throw new Error('Failed to fetch data for selected algorithm config');
      }
    } catch (e) {
      loaderStore.showLoader(false);
      console.log(e)
    }
  }
  async getOrderList(params) {
    try {
      loaderStore.showLoader(true)
      let response = await PatientService.getOrderList(params)
      viewStore.getEsignatureModal(false)
      loaderStore.showLoader(false);
      
      return response;
    } catch (e) {
      loaderStore.showLoader(false);
      console.log(e)
    }
  }
  async getOrderTestModel(params) {
    try {
      loaderStore.showLoader(true)
      let response = await OrderTestService.getOrderModel(params)
      if (response.statusCode == 200) {
        loaderStore.showLoader(false);
        return response;
      } else {
        loaderStore.showLoader(false);
        throw new Error('Failed to fetch data for selected algorithm config');
      }
    } catch (e) {
      loaderStore.showLoader(false);
      console.log(e)
    }
  }
  async saveOrderTest(params,route,path) {
    try {
      loaderStore.showLoader(true)
      let response = await PatientService.OrderTest(params)
      if (response.statusCode == 200) {
        loaderStore.showLoader(false);
        viewStore.getEsignatureModal(false)
        paginationStore.resetPage(1);
        alertStore.success(response.message)
        route.push(path)
        return response;
      } else {
        loaderStore.showLoader(false);
        alertStore.error(response.message)
        throw new Error('Failed to fetch data for selected algorithm config');
      }
    } catch (e) {
      loaderStore.showLoader(false);
      console.log(e)
    }
  }
  async getOrderTestDetail(params) {
    try {
      loaderStore.showLoader(true)
      let response = await PatientService.getOrderTestDetail(params)
      if (response.statusCode == 200) {
        loaderStore.showLoader(false);
        return response;
      } else {
        loaderStore.showLoader(false);
        throw new Error('Failed to fetch data for selected algorithm config');
      }
    } catch (e) {
      loaderStore.showLoader(false);
      console.log(e)
    }
  }
})()
