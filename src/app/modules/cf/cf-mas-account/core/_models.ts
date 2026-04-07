import * as Yup from 'yup'
import { ID } from "../../../../../_metronic/helpers"
import { fieldString15, fieldString150, fieldString25, fieldString5 } from '../../../../functions'

export type AccountData = {
  id?: ID & string
  account_no: string
  account_name: string
  account_type: string
  account_group: string
  normally: string
  remarks?: string
  status?: boolean
  status_date?: string
  reg_by: string | null | undefined
  createdAt?: string
  updatedAt?: string
}

export const createAccountSchemas = Yup.object().shape({
  ...fieldString15('account_no'),
  ...fieldString150('account_name'),
  ...fieldString25('account_type'),
  ...fieldString25('account_group'),
  ...fieldString5('normally')
})