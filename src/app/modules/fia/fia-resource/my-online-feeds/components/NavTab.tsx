import {FC} from 'react'
import {NavLink} from 'react-router-dom'
import {useApprovalContext, useRequestsContext, useTasksContext} from './tabs'

type Props = {
  className?: string
}

/* Routing Navigasi Online Feeds */
const NavTabMyOnlineFeeds: FC<Props> = ({className}) => {
  const {getApprovalCount} = useApprovalContext()

  const {getRequestsCount} = useRequestsContext()
  const {getTasksCount} = useTasksContext()

  // Mengambil jumlah total data untuk tab APPROVAL
  const totalApprovalCount = getApprovalCount()

  const totalRequestCount = getRequestsCount()
  const totalTasksCount = getTasksCount()

  return (
    <div className={`d-flex justify-content-between align-items-center ms-4 ${className || ''}`}>
      <ul className='nav nav-tabs nav-line-tabs nav-stretch fs-5 border-0 '>
        <li className='nav-item'>
          <NavLink
            to='/fia-resource/my_online_feeds/approval'
            className={({isActive}) =>
              isActive ? 'nav-link active text-primary fw-bold' : 'nav-link text-muted text-dark'
            }
          >
            APPROVAL ({totalApprovalCount})
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink
            to='/fia-resource/my_online_feeds/requests'
            className={({isActive}) =>
              isActive ? 'nav-link active text-primary fw-bold' : 'nav-link text-muted text-dark'
            }
          >
            REQUESTS ({totalRequestCount})
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink
            to='/fia-resource/my_online_feeds/tasks'
            className={({isActive}) =>
              isActive ? 'nav-link active text-primary fw-bold' : 'nav-link text-muted text-dark'
            }
          >
            TASKS ({totalTasksCount})
          </NavLink>
        </li>

        <li className='nav-item'>
          <NavLink
            to='/fia-resource/my_online_feeds/roster'
            className={({isActive}) =>
              isActive ? 'nav-link active text-primary fw-bold' : 'nav-link text-muted text-dark'
            }
          >
            ROSTER
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export {NavTabMyOnlineFeeds}
