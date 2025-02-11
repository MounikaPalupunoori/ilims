
import gqlInstance from '../Utils/graphQLInterCeptors'
export const LibPrepartionService = new (class {
  async getLibEntityIds(params) {
    try {
      let data = {
        query: `query getBatchList($batchModel: JSON!){
          getBatchList (batchModel: $batchModel)
          {
            data{
                batchId
                entityIds
            }  
          }
        }`,
        variables: params
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data,
      });
      return response.data.getBatchList
    } catch (error) {
      console.error('Error fetching create batch:', error);
      throw error;
    }
  }
  
})()
