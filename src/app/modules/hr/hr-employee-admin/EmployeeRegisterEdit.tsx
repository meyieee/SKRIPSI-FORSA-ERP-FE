import { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { latestValues } from './core/models'
import { EmployeeRegisterSimpleForm } from './EmployeeRegisterSimpleForm'
import { getEmployeeById } from './core/request'
import { cache_employeeregister, cache_employeeregister_id, cache_users } from '../../../constans'
import { SocketListenerRoomReactQuery, UseReactQuery } from '../../../functions'
import { Loading } from '../../../components'
import { useAuth } from '../../auth'
import { getUserSession } from '../../auth/core/_requests'

const EmployeeRegisterEdit: FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const { auth, currentUser, saveAuth, setCurrentUser } = useAuth()
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
      backTo='/controls/employee-management'
      onSuccess={async () => {
        void queryClient.invalidateQueries({ queryKey: [cache_employeeregister_id] })
        void queryClient.invalidateQueries({ queryKey: [cache_employeeregister] })
        void queryClient.invalidateQueries({ queryKey: [cache_users] })

        if (currentUser?.id_number && currentUser.id_number === data?.id_number && auth) {
          const refreshedAuth = await getUserSession(auth)
          if (refreshedAuth?.user) {
            saveAuth(refreshedAuth)
            setCurrentUser(refreshedAuth.user)
          }
        }

        setTimeout(() => navigate('/controls/employee-management'), 400)
      }}
    />
  )
}

export { EmployeeRegisterEdit }
