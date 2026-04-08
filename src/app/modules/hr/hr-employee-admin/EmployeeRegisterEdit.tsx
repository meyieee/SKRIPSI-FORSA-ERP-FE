import { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { latestValues } from './core/models'
import { EmployeeRegisterSimpleForm } from './EmployeeRegisterSimpleForm'
import { getEmployeeById } from './core/request'
import { cache_employeeregister, cache_employeeregister_id } from '../../../constans'
import { SocketListenerRoomReactQuery, UseReactQuery } from '../../../functions'
import { Loading } from '../../../components'

const EmployeeRegisterEdit: FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const cacheName = `${cache_employeeregister_id}/${id}`

  const { data, isLoading } = UseReactQuery({ func: () => getEmployeeById(id), cacheName })

  useEffect(() => {
    if (id) SocketListenerRoomReactQuery(`employee_${id}`, queryClient, cacheName)
  }, [id, queryClient, cacheName])

  if (isLoading || !data) {
    return (
      <div className="card">
        <div className="card-body">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="text-center text-muted py-10">Employee not found.</div>
          )}
        </div>
      </div>
    )
  }

  return (
    <EmployeeRegisterSimpleForm
      mode="edit"
      initialValues={latestValues(data)}
      onSuccess={() => {
        void queryClient.invalidateQueries({ queryKey: [cache_employeeregister_id] })
        void queryClient.invalidateQueries({ queryKey: [cache_employeeregister] })
        setTimeout(() => navigate('/controls/account-settings'), 400)
      }}
    />
  )
}

export { EmployeeRegisterEdit }
