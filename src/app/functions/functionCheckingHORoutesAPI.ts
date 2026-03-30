export const functionCheckingHORoutesAPI = (com_type: any, branch_code: any) => {
  return com_type === "HO" ? com_type : branch_code
}