export const functionCheckingHORoutesAPI = (com_type: unknown, branch_code: unknown) => {
  const comType = String(com_type ?? '')
  const branchCode = String(branch_code ?? '')
  return comType === "HO" ? comType : branchCode
}