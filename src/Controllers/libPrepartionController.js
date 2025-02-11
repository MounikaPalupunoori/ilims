

import { useLoaderStore } from '../stores/loaderStore';
import { LibPrepartionService } from '../Services/libPreparationService';
const loaderStore = useLoaderStore();

export const LibPrepartionController = new (class { /// call this fn in ui to get data
    constructor() {
    }
  async getLibEntityIds(params) {
    try {
      loaderStore.showLoader(true)
      let response = await LibPrepartionService.getLibEntityIds(params);
      loaderStore.showLoader(false);
      return response;
    //   if (response.statusCode == 200) {
    //     loaderStore.showLoader(false);
    //     console.log(response,"st")
    //     return response;
    //   } else {
    //     loaderStore.showLoader(false);
    //     throw new Error('Failed to fetch data for selected algorithm config');
    //   }
    } catch (e) {
      loaderStore.showLoader(false);
    }
  }
  })();