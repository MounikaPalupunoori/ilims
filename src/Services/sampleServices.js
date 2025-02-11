
import gqlInstance from '../Utils/graphQLInterCeptors'
export const SampleService = new (class {
  // async getCaseSamples(params) {
  //   let data = {
  //     query: `query getCaseSamples($caseSampleModel: JSON!){getCaseSamples(caseSampleModel: $caseSampleModel)}`,
  //     variables: params
  //   }
  //   const response = await gqlInstance({
  //     method: 'post',
  //     url: '/graphql',
  //     data
  //   })
  //   return response.data.getCaseSamples
  // }
  // catch(error) {
  //   console.error('Error fetching patient data:', error)
  //   throw error
  // }
  async getCaseSamples(params) {
    try {
      let data = {
        query: `query getCaseSamples($caseSampleModel: JSON!){getCaseSamples(caseSampleModel: $caseSampleModel)}`,
        variables: params
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data,
      });
      return response.data.getCaseSamples
    } catch (error) {
      console.error('Error fetching samples data:', error);
      throw error;
    }
  }
  async getStudyTeam(params) {
    try {
      let data = {
        query: `query getStudyTeam($studyTeamModel:JSON!){getStudyTeam(studyTeamModel:$studyTeamModel)}`,
        variables: params
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data,
      });
      return response.data.getStudyTeam
    } catch (error) {
      console.error('Error fetching studyteam data:', error);
      throw error;
    }
  }
  async createBatch(params) {
    try {
      let data = {
        query: `mutation addBatch($batchModel: BatchModel!,$eSignatureModel: JSON) {
            addBatch(batchModel: $batchModel,eSignatureModel: $eSignatureModel)
          }`,
        variables: params
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data,
      });
      return response.data.addBatch
    } catch (error) {
      console.error('Error fetching create batch:', error);
      throw error;
    }
  }
  async batchList(params) {
    try {
      let data = {
        query: `query getBatchList($batchModel: JSON!) {
          getBatchList(batchModel: $batchModel) {
              data {
                    noOfSamples
                 batchId
                 batchStatus
                 batchNumber
                 batchAttributes {
                          batchAttributeValueId
                          batchId
              attributeName
              attributeValue
          }
          
                }
                  totalCount
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
  async batchListById(params) {
    try {
      let data = {
        query: `query getBatchById ($batchId: Int!, $studyId: String, $sort: String){
          getBatchById (batchId:$batchId, studyId:$studyId, sort:$sort){
               data {
                   batch {
                       batchId
                       batchNumber
                       batchStatus
                   }
                   batchEntities {
                       batchEntityId
                       entityId
                       batchEntityStatus
                       displayOrder
                   }
                   batchAttributes {
                       batchId
                       attributeName
                       attributeValue
                   }
                   batchEntityAttributes {
                       batchEntityId
                       attributeName
                       attributeValue
                   }
                   batchSampleDetails
               }
           }
       }
       `,
        variables: params
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data,
      });
      return response.data.getBatchById
    } catch (error) {
      console.error('Error fetching create batch:', error);
      throw error;
    }
  }
  async updateBatch(params) {
    try {
      let data = {
        query: `mutation updateBatch($batchModel: JSON!, $eSignatureModel: JSON) {
          updateBatch(batchModel: $batchModel, eSignatureModel: $eSignatureModel)
      }
      `,
        variables: params
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data,
      });
      return response.data.updateBatch
    } catch (error) {
      console.error('Error fetching create batch:', error);
      throw error;
    }
  }
  async getSampleTypes() {
    try {
      let data = {
        query: `query getSampleTypes {
          getSampleTypes
          }`,
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data,
      });
      return response.data.getSampleTypes
    } catch (error) {
      console.error('Error fetching create batch:', error);
      throw error;
    }
  }
  async getSpecimenList(params) {
    try {
      let data = {
        query: `query getSpecimens($sampleTypeId: Int!) {
          getSpecimen(sampleTypeId: $sampleTypeId)
          }`,
          variables: params
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data,
      });
      return response.data.getSpecimen
    } catch (error) {
      console.error('Error fetching create batch:', error);
      throw error;
    }
  }
  async getBatchEntityStatus(params) {
    try {
      let data = {
        query: `query getBatchEntityDetails($batchModel: JSON!) {
          getBatchEntityDetails(batchModel: $batchModel) {
              data{   
                      batchEntities {
                      entityId
                      batchEntityId
                      batchEntityStatus
                      entityName
                      }
                      batchEntityAttributes {
                          batchEntityId
                          attributeName
                          attributeValue
                      }
              }
             
          }
      }
      `,
          variables: params
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data,
      });
      return response.data.getBatchEntityDetails
    } catch (error) {
      console.error('Error fetching create batch:', error);
      throw error;
    }
  }
  async getKitTypes() {
    try {
      let data = {
        query: `query getKitTypes{
          getKitTypes{
              data{
                  library_preparation_kit_name
                  index_plate_names {
                      index_plate_name
                      index_plate_subtypes
                  }
              }
              statusCode
              message
          }
      }
      `,
          variables: {}
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data,
      });
      return response.data.getKitTypes
    } catch (error) {
      console.error('Error fetching create batch:', error);
      throw error;
    }
  }
  async getKitDetails(params) {
    try {
      let data = {
        query: `query getKitDetails($batchId: Int!) {
          getKitDetails(batchId: $batchId){
            data {
                library_preparation_kit_name
                index_plate_name
               index_plate_subtypes {
                wellId
                primerName
                p7Index
                p5IndexForwards
                p5IndexReverse
               }
            }
            statusCode
            message
          }
        }
      `,
          variables: params
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data,
      });
      return response.data.getKitDetails
    } catch (error) {
      console.error('Error fetching create batch:', error);
      throw error;
    }
  }
  async getBatchEntityDetails(params) {
    try {
      let data = {
        query: `query getBatchEntityDetails($batchModel: JSON!) {
          getBatchEntityDetails(batchModel: $batchModel) {
              data{  
                  entityId
                  batchEntityId
                  batchEntityStatus
                  entityName
              }
              totalCount
          }
      }
      `,
          variables: params
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data,
      });
      return response.data.getBatchEntityDetails
    } catch (error) {
      console.error('Error fetching create batch:', error);
      throw error;
    }
  }
  async getSearchBatchEntity(params) {
    try {
      let data = {
        query: `query searchBatchEntity($searchModel: JSON) {
          searchBatchEntity(searchModel: $searchModel)
         }
      `,
          variables: params
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data,
      });
      return response.data.searchBatchEntity
    } catch (error) {
      console.error('Error fetching create batch:', error);
      throw error;
    }
  }
  async getBatchEntityAttributes(params) {
    try {
      let data = {
        query: `query getBatchEntityAttributeDetails($batchModel: JSON!) {
          getBatchEntityAttributeDetails(batchModel: $batchModel) {
              data{  
                  batchEntityId
                  attributeName
                  attributeValue          
              }
             totalCount
          }
      }      
      `,
          variables: params
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data,
      });
      return response.data.getBatchEntityAttributeDetails
    } catch (error) {
      console.error('Error fetching create batch:', error);
      throw error;
    }
  }
  async generateSequenceId(params) {
    try {
      let data = {
        query: `mutation generateSequenceId($sequenceModel:GenerateSequenceId!) {
          generateSequenceId(sequenceModel:$sequenceModel)
      }   
      `,
          variables: params
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data,
      });
      return response.data.generateSequenceId
    } catch (error) {
      console.error('Error fetching create batch:', error);
      throw error;
    }
  }
})()
