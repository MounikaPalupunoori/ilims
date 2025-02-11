
import gqlInstance from '../Utils/graphQLInterCeptors'
export const StudyListService = new (class {
  constructor() {
  }
  
  async getStudyListService() {
    try {
      let data = {
        query: `query getStudies($paginationParams: JSON, $includeMeta: Boolean ) {getStudyList(paginationParams:$paginationParams, includeMeta: $includeMeta)},`,
        variables:{"paginationParams":{"sort": "asc.studyIdentifier"},"includeMeta":false}
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data
      })
      return response.data.getStudyList
    } catch (error) {
      console.error('Error fetching create batch:', error);
      throw error;
    }
  }
  async getEntityStudyAttributeMasterList(params) {
    try {
      let data = {
        query: `query getEntityStudyAttributeMasterList($entityStudyAttributeModel: JSON!){
          getEntityStudyAttributeMasterList(entityStudyAttributeModel:$entityStudyAttributeModel)}`,
          variables: params
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data
      })
      return response.data.getEntityStudyAttributeMasterList
    } catch (error) {
      console.error('Error fetching create batch:', error);
      throw error;
    }
  }
})()