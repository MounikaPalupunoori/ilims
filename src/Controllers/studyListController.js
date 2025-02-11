
import { StudyListService } from '../Services/studyListService';

export const StudyListController = new (class { /// call this fn in ui to get data
    constructor() {
    }
  async labSamples(params) {
    try {
      let response = await StudyListService.getStudyListService(params);
      if (response.statusCode == 200) {
        return response;
      } else {
        alert(new Error('Failed to fetch data for selected algorithm config'))
      }
    } catch (e) {
      console.log(e)
    }
  }

  async getEntityeMasterList (params) {
    try {
      let response = await StudyListService.getEntityStudyAttributeMasterList(params);
      if (response.statusCode == 200) {
        return response;
      } else {
        alert(new Error('Failed to fetch data for selected algorithm config'))
      }
    } catch (e) {
      console.log(e)
    }
  }
  })();