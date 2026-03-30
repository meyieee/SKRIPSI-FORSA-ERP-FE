import { FC, useState } from 'react'
import DispatcherContent from './DispatcherContent'
import '../style/DispatcherPage.scss'
import HeaderDispatcher, { DispatcherTab } from './component/HeaderDispatcher'

const DispatcherPage: FC = () => {
  const [activeTab, setActiveTab] = useState<DispatcherTab>('event')
  return (
    <>
      <HeaderDispatcher activeTab={activeTab} onChangeTab={setActiveTab} />
      <div className='dispatcher-page'>
        {/* Main Content - Full Width */}
        <div className='dispatcher-main'>
          <DispatcherContent />
        </div>
      </div>
    </>
  )
}

export default DispatcherPage