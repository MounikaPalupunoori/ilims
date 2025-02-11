
import gqlInstance from '../Utils/graphQLInterCeptors'
export const OrderTestService = new (class {
    constructor() {
    }
    async getOrderModel(params) {
      try {
        let data = {
          query: `query getOrderTestModel($orderFrom:String!,$studyId:Int) {
            getOrderTestModel(orderFrom:$orderFrom, studyId:$studyId)
        }`,
          variables: params,
        };
        const response = await gqlInstance({
          method: 'post',
          url: '/graphql',
          data,
        });
        return response.data.getOrderTestModel;
      } catch (error) {
        console.error('Error fetching patient data:', error);
        throw error;
      }
    }
    async getPhysicianOrg(params) {
      try {
        let data = {
          query: `query getUserOrgDetail($UserOrgModel: JSON!) {
            getUserOrgDetail(UserOrgModel: $UserOrgModel)
        }`,
          variables: params,
        };
        const response = await gqlInstance({
          method: 'post',
          url: '/graphql',
          data,
        });
        return response.data.getUserOrgDetail;
      } catch (error) {
        console.error('Error fetching patient data:', error);
        throw error;
      }
    }
   })();