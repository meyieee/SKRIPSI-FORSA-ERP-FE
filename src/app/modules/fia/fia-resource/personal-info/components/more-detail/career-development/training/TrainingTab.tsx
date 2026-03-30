import React from 'react'
import {KTCard, KTCardBody} from '../../../../../../../../../_metronic'
import {useProfile} from '../../../ProfileContext'
import {trainingDummy} from './dummy'

const TrainingTab: React.FC = () => {
  const {selectedId} = useProfile()
  const data = selectedId ? trainingDummy[selectedId] : null

  return (
    <KTCard>
      <KTCardBody>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary'>
                <th>No</th>
                <th>Course Type</th>
                <th>Course Name</th>
                <th>Start</th>
                <th>End</th>
                <th>Institution</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {data?.length ? (
                data.map((item) => (
                  <tr key={item.no}>
                    <td>{item.no}</td>
                    <td>{item.courseType}</td>
                    <td>{item.courseName}</td>
                    <td>{item.start}</td>
                    <td>{item.end}</td>
                    <td>{item.institution}</td>
                    <td>{item.result}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className='text-center text-muted py-10'>
                    No training data for this profile
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export default TrainingTab
