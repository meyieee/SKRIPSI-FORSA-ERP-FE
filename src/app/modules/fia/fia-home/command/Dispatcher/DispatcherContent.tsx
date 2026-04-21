import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { KTCard, KTCardBody } from '../../../../../../_metronic'
import UpdateStatusForm from './component/UpdateStatusForm'
import UpdateLocation from './component/UpdateLocation'

const DispatcherContent: FC = () => {
  const topScrollRef = useRef<HTMLDivElement>(null)
  const topScrollInnerRef = useRef<HTMLDivElement>(null)
  const bottomScrollRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState('all')
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [pendingLocation, setPendingLocation] = useState('')
  const [selectedItem, setSelectedItem] = useState<{ groupIndex: number; rowIndex: number } | null>(null)
  const [selectedAssetForLocation, setSelectedAssetForLocation] = useState<{
    assetCode: string
    assetName: string
    latestLocation: string
    lastUpdate: string
  } | null>(null)
  
  // Update Status Modal State
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false)
  const [selectedAssetForUpdate, setSelectedAssetForUpdate] = useState<{
    assetCode: string
    assetName: string
    currentStatus: string
    statusCode: string
    lastUpdate: string
  } | null>(null)

  // Mock data per grup (hardcode)
  const initialGroups = useMemo(
    () => [
      {
        groupTitle: 'Diesel Drill Model DD-Z01',
        rows: [
          {
            id: 1,
            assetCode: 'DD001',
            date: '1-Jul-23',
            time: '0:00:00',
            duration: '0:00:00',
            currentLocation: '',
            code: '100',
            description: 'Operating|Work',
            status: 'Ready',
            jobCode: 'Productive Time',
            comment: ''
          },
          {
            id: 2,
            assetCode: 'DD002',
            date: '1-Jul-23',
            time: '0:00:00',
            duration: '0:00:00',
            currentLocation: '',
            code: '401',
            description: 'PM',
            status: 'Down',
            jobCode: 'Planned Loss',
            comment: 'Preventive Maintenance 500H'
          }
        ]
      },
      {
        groupTitle: 'Excavator EXC-AAA',
        rows: [
          {
            id: 3,
            assetCode: 'EXA001',
            date: '1-Jul-23',
            time: '0:00:00',
            duration: '0:00:00',
            currentLocation: '',
            code: '100',
            description: 'Operating|Work',
            status: 'Ready',
            jobCode: 'Productive Time',
            comment: ''
          },
          {
            id: 4,
            assetCode: 'EXA002',
            date: '1-Jul-23',
            time: '0:00:00',
            duration: '0:00:00',
            currentLocation: '',
            code: '303',
            description: 'No Manned/No Oprt',
            status: 'Standby',
            jobCode: 'Standby',
            comment: 'Operator Late'
          }
        ]
      },
      {
        groupTitle: 'Excavator EXC-BBB',
        rows: [
          {
            id: 5,
            assetCode: 'EXB001',
            date: '1-Jul-23',
            time: '0:00:00',
            duration: '0:00:00',
            currentLocation: '',
            code: '303',
            description: 'No Manned/No Oprt',
            status: 'Standby',
            jobCode: 'Standby',
            comment: 'Operator Late'
          }
        ]
      },
      {
        groupTitle: 'Haul Truck HT-007',
        rows: [
          {
            id: 6,
            assetCode: 'HL001',
            date: '1-Jul-23',
            time: '0:00:00',
            duration: '0:00:00',
            currentLocation: '',
            code: '202',
            description: 'Weather (Wet | Cloud)',
            status: 'Delay',
            jobCode: 'Operation Delay',
            comment: 'Heavy Rain whole day'
          },
          {
            id: 7,
            assetCode: 'HL002',
            date: '1-Jul-23',
            time: '0:00:00',
            duration: '0:00:00',
            currentLocation: '',
            code: '507',
            description: 'Accident Damage',
            status: 'Down',
            jobCode: 'Accident | Abuse',
            comment: 'Cooler Radiator Leaking hit b'
          }
        ]
      },
      {
        groupTitle: 'Haul Truck HTZ08',
        rows: [
          {
            id: 8,
            assetCode: 'HL003',
            date: '1-Jul-23',
            time: '0:00:00',
            duration: '0:00:00',
            currentLocation: '',
            code: '514',
            description: 'Stranded | Natura Di:',
            status: 'Down',
            jobCode: 'Extended Loss',
            comment: 'Landslide road blocked'
          },
          {
            id: 9,
            assetCode: 'HL004',
            date: '1-Jul-23',
            time: '0:00:00',
            duration: '0:00:00',
            currentLocation: '',
            code: '100',
            description: 'Operating|Work',
            status: 'Ready',
            jobCode: 'Productive Time',
            comment: ''
          }
        ]
      }
    ],
    []
  )

  const [groups, setGroups] = useState(initialGroups)

  useEffect(() => {
    const topEl = topScrollRef.current
    const topInnerEl = topScrollInnerRef.current
    const bottomEl = bottomScrollRef.current
    if (!topEl || !topInnerEl || !bottomEl) return

    const syncWidth = () => {
      topInnerEl.style.width = `${bottomEl.scrollWidth}px`
    }

    let lockTop = false
    let lockBottom = false

    const handleTopScroll = () => {
      if (lockBottom) return
      lockTop = true
      bottomEl.scrollLeft = topEl.scrollLeft
      lockTop = false
    }

    const handleBottomScroll = () => {
      if (lockTop) return
      lockBottom = true
      topEl.scrollLeft = bottomEl.scrollLeft
      lockBottom = false
    }

    syncWidth()
    topEl.addEventListener('scroll', handleTopScroll)
    bottomEl.addEventListener('scroll', handleBottomScroll)
    window.addEventListener('resize', syncWidth)

    return () => {
      topEl.removeEventListener('scroll', handleTopScroll)
      bottomEl.removeEventListener('scroll', handleBottomScroll)
      window.removeEventListener('resize', syncWidth)
    }
  }, [groups])

  // Mock data untuk Status Change History
  const statusHistoryData = [
    {
      id: 1,
      date: '1-Jul-23',
      time: '0:00:00',
      status: 'Standby',
      code: '205',
      description: 'Jam|Block',
      reasons: 'Block',
      comments: 'Road Blocked',
      correctiveAction: ''
    },
    {
      id: 2,
      date: '1-Jul-23',
      time: '0:00:00',
      status: 'Down',
      code: '302',
      description: 'Mechanical Vital',
      reasons: 'Engine broken',
      comments: 'Engine broken',
      correctiveAction: ''
    },
    {
      id: 3,
      date: '1-Jul-23',
      time: '0:00:00',
      status: 'Ready',
      code: '0',
      description: 'Operating',
      reasons: 'Productive Time',
      comments: '',
      correctiveAction: ''
    }
  ]

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ready':
        return 'badge-success'
      case 'standby':
        return 'badge-warning'
      case 'delay':
        return 'badge-info'
      case 'down':
        return 'badge-danger'
      default:
        return 'badge-secondary'
    }
  }

  const openLocationModal = (groupIndex: number, rowIndex: number) => {
    setSelectedItem({ groupIndex, rowIndex })
    const current = groups[groupIndex].rows[rowIndex]
    setPendingLocation(current.currentLocation || '')
    const groupTitle = groups[groupIndex].groupTitle
    setSelectedAssetForLocation({
      assetCode: current.assetCode,
      assetName: groupTitle,
      latestLocation: current.currentLocation || '-',
      lastUpdate: `${current.date} - ${current.time}`
    })
    setIsLocationModalOpen(true)
  }

  const saveLocation = () => {
    if (selectedItem == null) return
    const { groupIndex, rowIndex } = selectedItem
    setGroups((prev) => {
      const updated = [...prev]
      const targetGroup = { ...updated[groupIndex] }
      const updatedRows = [...targetGroup.rows]
      updatedRows[rowIndex] = { ...updatedRows[rowIndex], currentLocation: pendingLocation }
      updated[groupIndex] = { ...targetGroup, rows: updatedRows }
      return updated
    })
    setIsLocationModalOpen(false)
    setSelectedItem(null)
    setPendingLocation('')
    setSelectedAssetForLocation(null)
  }

  const openUpdateStatusModal = (groupIndex: number, rowIndex: number) => {
    const current = groups[groupIndex].rows[rowIndex]
    const groupTitle = groups[groupIndex].groupTitle
    
    setSelectedAssetForUpdate({
      assetCode: current.assetCode,
      assetName: groupTitle,
      currentStatus: current.status,
      statusCode: current.code,
      lastUpdate: `${current.date} - ${current.time}`
    })
    setIsUpdateStatusModalOpen(true)
  }

  const handleUpdateStatusSubmit = (formData: any) => {
    // Handle the form submission here
    console.log('Update Status Form Data:', formData)
    // You can update the groups state here with the new status data
    // For now, just close the modal
    setIsUpdateStatusModalOpen(false)
    setSelectedAssetForUpdate(null)
  }

  return (
    <div className='dispatcher-content'>
      {/* Fleet Operation - Event Section */}
      <KTCard className='mb-6'>
        <KTCardBody>
          <h5 className='fw-bold mb-4'>FLEET OPERATION - EVENT</h5>
          
          {/* Tabs */}
          <div className='nav nav-tabs nav-line-tabs mb-5 fs-6'>
            <button 
              className={`nav-link ${activeTab === 'ready' ? 'active' : ''}`}
              onClick={() => setActiveTab('ready')}
            >
              READY
            </button>
            <button 
              className={`nav-link ${activeTab === 'standby' ? 'active' : ''}`}
              onClick={() => setActiveTab('standby')}
            >
              STANDBY
            </button>
            <button 
              className={`nav-link ${activeTab === 'delay' ? 'active' : ''}`}
              onClick={() => setActiveTab('delay')}
            >
              DELAY
            </button>
            <button 
              className={`nav-link ${activeTab === 'down' ? 'active' : ''}`}
              onClick={() => setActiveTab('down')}
            >
              DOWN
            </button>
            <button 
              className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              ALL FLEET
            </button>
          </div>

          {/* Fleet Operation Table (Grouped) - Optimized for single page view */}
          <div ref={topScrollRef} className='table-top-scroll mb-2' aria-hidden='true'>
            <div ref={topScrollInnerRef} className='table-top-scroll__inner' />
          </div>

          <div ref={bottomScrollRef} style={{overflowX: 'auto', maxWidth: '100%'}}>
            <table className='table table-row-table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-3 gx-3 table-row-gray-100 align-middle gs-0 gy-3'>
              <thead>
                <tr className='fw-bold bg-secondary'>
                  <th style={{width: '35px', minWidth: '35px'}}>No</th>
                  <th style={{width: '70px', minWidth: '70px'}}>Asset No</th>
                  <th style={{width: '60px', minWidth: '60px'}}>Date</th>
                  <th style={{width: '60px', minWidth: '60px'}}>Time</th>
                  <th style={{width: '60px', minWidth: '60px'}}>Duration</th>
                  <th style={{width: '120px', minWidth: '120px'}}>Current Location</th>
                  <th style={{width: '50px', minWidth: '50px'}}>Code</th>
                  <th style={{width: '120px', minWidth: '120px'}}>Description</th>
                  <th style={{width: '70px', minWidth: '70px'}}>Status</th>
                  <th style={{width: '100px', minWidth: '100px'}}>Job Code</th>
                  <th style={{width: '100px', minWidth: '100px'}}>Comment</th>
                  <th style={{width: '70px', minWidth: '70px'}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group, gIdx) => (
                  <>
                    <tr key={`group-${gIdx}`} className='group-header-row'>
                      <td colSpan={12}>
                        <span className='fw-semibold text-white'>{group.groupTitle}</span>
                      </td>
                    </tr>
                    {group.rows.map((item, rIdx) => (
                      <tr key={item.id}>
                        <td>{rIdx + 1}</td>
                        <td>
                          <div className='d-flex align-items-center'>
                            <div className='d-flex justify-content-start flex-column'>
                              <span className='text-dark fw-bold text-hover-primary fs-6'>{item.assetCode}</span>
                            </div>
                          </div>
                        </td>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.duration}</td>
                        <td>
                          <div className='d-flex align-items-center gap-2'>
                            <span>{item.currentLocation || '-'}</span>
                            <button
                              type='button'
                              className='btn btn-sm text-primary fw-bold border-0 p-1'
                              aria-label='Update location'
                              title='Update location'
                              onClick={() => openLocationModal(gIdx, rIdx)}
                              style={{textDecoration: 'underline', fontSize: '0.7rem', padding: '0.125rem'}}
                            >
                              U
                            </button>
                          </div>
                        </td>
                        <td>{item.code}</td>
                        <td className='text-wrap'>{item.description}</td>
                        <td>
                          <span className={`badge ${getStatusBadgeClass(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>{item.jobCode}</td>
                        <td className='text-truncate' style={{maxWidth: '280px'}} title={item.comment || '-'}>
                          {item.comment || '-'}
                        </td>
                        <td>
                          <div className='d-flex justify-content-end gap-1'>
                            <button className='btn btn-sm text-primary fw-bold border-0 p-1' aria-label='View' title='View'>
                              V
                            </button>
                            <button className='btn btn-sm text-primary fw-bold border-0 p-1' aria-label='Edit' title='Edit'>
                              E
                            </button>
                            <button 
                              className='btn btn-sm text-primary fw-bold border-0 p-1' 
                              aria-label='Update' 
                              title='Update' 
                              style={{textDecoration: 'underline'}}
                              onClick={() => openUpdateStatusModal(gIdx, rIdx)}
                            >
                              U
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </KTCardBody>
      </KTCard>

      {/* Status Change History Section */}
      <KTCard>
        <KTCardBody>
          <h5 className='fw-bold mb-4'>Status Change for D0001-Diesel Drill Model DD-Z01</h5>
          
          <div className='table-responsive'>
            <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-100px'>Date</th>
                  <th className='min-w-100px'>Time</th>
                  <th className='min-w-100px'>Status</th>
                  <th className='min-w-100px'>Code</th>
                  <th className='min-w-200px'>Description</th>
                  <th className='min-w-150px'>Reasons</th>
                  <th className='min-w-200px'>Comments</th>
                  <th className='min-w-200px'>Corrective Action</th>
                </tr>
              </thead>
              <tbody>
                {statusHistoryData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>{item.code}</td>
                    <td>{item.description}</td>
                    <td>{item.reasons}</td>
                    <td>{item.comments || '-'}</td>
                    <td>{item.correctiveAction || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </KTCardBody>
      </KTCard>

      {/* Update Location Modal */}
      <UpdateLocation
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        assetData={selectedAssetForLocation}
        onSubmit={(payload) => {
          setPendingLocation(payload.newLocation)
          saveLocation()
        }}
      />

      {/* Update Status Modal */}
      <UpdateStatusForm
        isOpen={isUpdateStatusModalOpen}
        onClose={() => setIsUpdateStatusModalOpen(false)}
        assetData={selectedAssetForUpdate}
        onSubmit={handleUpdateStatusSubmit}
      />
    </div>
  )
}

export default DispatcherContent
