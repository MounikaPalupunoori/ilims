import gqlInstance from '../Utils/graphQLInterCeptors'
export const PatientService = new (class {
  constructor() {}
  async getPatientsList(params) {
    try {
      let data = {
        query: `query getSubjects($subjectModel:JSON!) {
            getSubjects(subjectModel:$subjectModel)
        }`,
        variables: params
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data
      })
      return response.data.getSubjects
    } catch (error) {
      console.error('Error fetching patient data:', error)
      throw error
    }
  }

  async addPatient(params) {
    try {
      let data = {
        query: `mutation saveSubject($subjectModel:JSON!,$eSignatureModel:JSON) {
            saveSubject(subjectModel:$subjectModel,eSignatureModel:$eSignatureModel)
        }
        `,
        variables: params
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data
      })
      return response.data.saveSubject
    } catch (error) {
      console.error('Error fetching patient data:', error)
      throw error
    }
  }
  async getPatient(params) {
    try {
      let data = {
        query: `query getSubjectDetail($subjectModel:JSON!) {
            getSubjectDetail(subjectModel:$subjectModel)
        }
        `,
        variables: params
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data
      })
      return response.data.getSubjectDetail
    } catch (error) {
      console.error('Error fetching patient data:', error)
      throw error
    }
  }
  async getOrderList(params) {
    try {
      let data = {
        query: `query getOrderTests($orderTestModel: JSON!){
            getOrderTests(orderTestModel: $orderTestModel)
          }`,
        variables: params
      }
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data
      })
      return response.data.getOrderTests
    } catch (error) {
      console.error('Error fetching patient data:', error)
      throw error
    }
  }
  
  async OrderTest(params) {
    try {
      let data = {
        query: ` mutation 
        saveOrderTest($orderTestModel: JSON!,$eSignatureModel: JSON) {saveOrderTest(orderTestModel: $orderTestModel, eSignatureModel: $eSignatureModel)}`,
        variables: params,
      };
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data,
      });
       return response.data.saveOrderTest
    } catch (error) {
      console.error('Error fetching patient data:', error);
      throw error;
    }
  }
  async getOrderTestDetail(params) {
    try {
      let data = {
        query: `query getOrderTestDetail($orderTestModel: JSON!) {
          getOrderTestDetail(orderTestModel: $orderTestModel)
      }`,
        variables: params,
      };
      const response = await gqlInstance({
        method: 'post',
        url: '/graphql',
        data,
      });
       return response.data.getOrderTestDetail
    } catch (error) {
      console.error('Error fetching patient data:', error);
      throw error;
    }
  }
})()
