import { FC } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

type Props = {
  className?: string
}

const FeedsNavTab: FC<Props> = ({ className }) => {
  const location = useLocation()

  const getActiveKey = () => {
    const path = location.pathname.split('/').pop()
    if (path === 'online-request') return 'online-request'
    if (path === 'online-tasks') return 'online-tasks'
    if (path === 'online-reminder') return 'online-reminder'
    if (path === 'online-roster') return 'online-roster'
    return 'online-request'
  }

  return (
    <Nav variant='tabs' className={`mb-3 border-bottom ${className || ''}`} activeKey={getActiveKey()}>
      <Nav.Item>
        <Nav.Link as={NavLink} to='online-request' eventKey='online-request'>
          Online Request
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to='online-tasks' eventKey='online-tasks'>
          Online Tasks
        </Nav.Link>
      </Nav.Item>
      {/* <Nav.Item>
        <Nav.Link as={NavLink} to='online-reminder' eventKey='online-reminder'>
          Online Reminder
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to='online-roster' eventKey='online-roster'>
          Online Roster
        </Nav.Link>
      </Nav.Item> */}
    </Nav>
  )
}

export default FeedsNavTab

