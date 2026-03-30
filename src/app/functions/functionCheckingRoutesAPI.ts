import { functionCheckingHORoutesAPI } from "./functionCheckingHORoutesAPI";

type CurrentUser = {
  'employees.branch_detail.com_type': string
  'employees.branch_detail.com_code': string
} | undefined;

export const functionCheckComTypeRoutesAPI = (getRequest: Function, currentUser: CurrentUser) =>{
 return getRequest(functionCheckingHORoutesAPI(currentUser?.['employees.branch_detail.com_type'], currentUser?.['employees.branch_detail.com_code']))
}
