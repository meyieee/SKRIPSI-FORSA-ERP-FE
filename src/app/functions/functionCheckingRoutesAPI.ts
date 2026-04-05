import { functionCheckingHORoutesAPI } from "./functionCheckingHORoutesAPI";

type CurrentUser = {
  'employees.branch_detail.com_type'?: string | null
  'employees.branch_detail.com_code'?: string | null
} | undefined;

export const functionCheckComTypeRoutesAPI = (getRequest: Function, currentUser: CurrentUser) =>{
  const comType = currentUser?.['employees.branch_detail.com_type'] ?? ''
  const comCode = currentUser?.['employees.branch_detail.com_code'] ?? ''
  return getRequest(functionCheckingHORoutesAPI(comType, comCode))
}
