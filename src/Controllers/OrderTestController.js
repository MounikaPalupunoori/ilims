
import { OrderTestService } from '../Services/OrderTestService';
import { useLoaderStore } from '../stores/loaderStore';
const loaderStore = useLoaderStore();
export const OrderTestController = new (class {
  constructor() {}
  async getPhysicianOrg(params) {
    try {
      loaderStore.showLoader(true)
      let response = await OrderTestService.getPhysicianOrg(params)
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
