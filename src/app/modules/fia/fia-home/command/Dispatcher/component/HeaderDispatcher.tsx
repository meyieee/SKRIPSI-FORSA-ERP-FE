import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

export type DispatcherTab = 'event' | 'meter' | 'planning' | 'production' | 'dispatcher'

type HeaderDispatcherProps = {
  activeTab: DispatcherTab
  onChangeTab: (tab: DispatcherTab) => void
  className?: string
}

const HeaderDispatcher: FC<HeaderDispatcherProps> = ({ activeTab, onChangeTab, className }) => {
  const navigate = useNavigate()

  const handleDispatcherClick = () => {
    navigate('/home/command_center/dispatcher')
  }

  return (
    <div className={`w-100 bg-dark p-3 ${className ?? ''}`}>
      <ul className='nav nav-tabs' role='tablist'>
        <li className='nav-item'>
          <button
            type='button'
            role='tab'
            aria-selected={activeTab === 'event'}
            className={`nav-link ${activeTab === 'event' ? 'active text-primary border-bottom border-primary border-2' : 'text-muted'}`}
            onClick={() => onChangeTab('event')}
          >
            Fleet Operation — Event
          </button>
        </li>
        <li className='nav-item'>
          <button
            type='button'
            role='tab'
            aria-selected={activeTab === 'meter'}
            className={`nav-link ${activeTab === 'meter' ? 'active text-primary border-bottom border-primary border-2' : 'text-muted'}`}
            onClick={() => onChangeTab('meter')}
          >
            Meter Reading
          </button>
        </li>
        <li className='nav-item'>
          <button
            type='button'
            role='tab'
            aria-selected={activeTab === 'planning'}
            className={`nav-link ${activeTab === 'planning' ? 'active text-primary border-bottom border-primary border-2' : 'text-muted'}`}
            onClick={() => onChangeTab('planning')}
          >
            Planning & Schedule
          </button>
        </li>
        <li className='nav-item'>
          <button
            type='button'
            role='tab'
            aria-selected={activeTab === 'production'}
            className={`nav-link ${activeTab === 'production' ? 'active text-primary border-bottom border-primary border-2' : 'text-muted'}`}
            onClick={() => onChangeTab('production')}
          >
            Daily Production
          </button>
        </li>
        <li className='nav-item'>
          <button
            type='button'
            role='tab'
            aria-selected={activeTab === 'dispatcher'}
            className={`nav-link ${activeTab === 'dispatcher' ? 'active text-primary border-bottom border-primary border-2' : 'text-muted'}`}
            onClick={handleDispatcherClick}
          >
            Dispatcher
          </button>
        </li>
      </ul>
    </div>
  )
}

export default HeaderDispatcher


