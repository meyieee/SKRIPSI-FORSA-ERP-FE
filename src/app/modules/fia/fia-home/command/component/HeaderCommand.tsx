import { FC } from 'react'
import { NavTab } from './NavTab'

type HeaderCommandProps = {
  className?: string
}

const HeaderCommand: FC<HeaderCommandProps> = ({ className }) => {
  const tiles = [
    {
      to: 'overview',
      title: 'OVERVIEW',
      sub: 'Command Center Overview',
    },
    {
      to: 'hotline',
      title: 'HOTLINE',
      sub: 'Hotline Management',
    },
    {
      to: 'feeds',
      title: 'FEEDS',
      sub: 'Feeds & Updates',
    },
    {
      to: 'mastery',
      title: 'MASTERY',
      sub: 'Workforce Tracking & Mastery',
    },
    {
      to: 'dispatcher',
      title: 'DISPATCHER',
      sub: 'Dispatcher Management',
    },
    {
      to: 'mastery/workforce',
      title: 'WORKFORCE',
      sub: 'Workforce Management',
    },
    {
      to: 'department-work-tracking',
      title: 'DEPARTMENT WORK TRACKING',
      sub: 'Department Work Tracking',
    },
  ]

  return <NavTab tiles={tiles} className={className} cols={{sm: 2, md: 4, lg: 4}} autoStretch={true} />
}

export default HeaderCommand
