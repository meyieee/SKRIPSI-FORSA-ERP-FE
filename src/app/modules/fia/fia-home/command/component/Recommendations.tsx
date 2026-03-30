import { FC, useState } from 'react'


const Recommendations: FC = () => {
    const [expandedBoxes, setExpandedBoxes] = useState<{ [key: string]: boolean }>({})

  const toggleBox = (key: string) => {
    setExpandedBoxes((prev: { [key: string]: boolean }) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const renderExpandableBox = (title: string, content: string, key: string) => (
    <div
      className='col-md-4 mb-4 '
      onClick={() => toggleBox(key)}
      style={{ cursor: 'pointer' }}
    >
      <div className='bg-black text-white text-center py-2 fw-bold'>{title}</div>
      <div className='bg-light text-center py-3 px-2 border'>
        {content}
        {expandedBoxes[key] && (
          <div className='mt-3 text-muted'>
            <em>Additional details go here...</em>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className='d-flex flex-column flex-xxl-row gap-5 align-items-start'>
      <div className='flex-grow-1 d-flex flex-column' style={{ minWidth: 0 }}>
        {/* Top Text Box */}
        <div className='card mb-2'>
          <div className='card-body'>
            <p className='mb-0 fw-bold text-dark'>
              Command center management is a centralized hub that utilizes technology to manage and control activities in operations,
              production, safety, and resource management. With proper technologies, resources, and strategies it plays a critical role in
              optimizing business operations and improving overall performance.
            </p>
          </div>
        </div>

        {/* Table 1 - Recommendations */}
        <div className='d-flex flex-column gap-4 p-4 mb-4 bg-body border rounded-3'>
          <h5 className='fw-bold text-center'>RECOMMENDATIONS</h5>
          <div className='row'>
            {renderExpandableBox(
              'EFFICIENCY IMPROVEMENT',
              'Recommendations for improving operation efficiency and reducing waste',
              'efficiency'
            )}
            {renderExpandableBox(
              'PRODUCTION IMPROVEMENT',
              'Recommendations for improving production efficiency and productivity',
              'production'
            )}
            {renderExpandableBox(
              'SAFETY IMPROVEMENT',
              'Recommendations for improving safety and reducing risks',
              'safety'
            )}
             <div className='d-flex flex-column gap-4 p-4 mb-4'>
            <h5 className='fw-bold text-center'>IMPLEMENTATION PLAN</h5>
          <div className='row'>
            {renderExpandableBox(
              'ACTION PLAN',
              'Development of an action plan to implement the recommendations',
              'action'
            )}
            {renderExpandableBox(
              'TIMELINE',
              'Establishment of a timeline for implementation',
              'timeline'
            )}
            {renderExpandableBox(
              'RESOURCE ALLOCATION',
              'Allocation of resources to support implementation',
              'resources'
            )}
          </div>
          </div>
          </div>
        </div>

        {/* Table 2 - Implementation Plan */}
       
      </div>
    </div>
  )
}

export default Recommendations;