import React from 'react'
import {KTCard, KTCardBody} from '../../../../../../../../../_metronic'
import {useProfile} from '../../../ProfileContext'
import {educationDummy} from './dummy'

const EducationTab: React.FC = () => {
  const {selectedId} = useProfile()
  const data = selectedId ? educationDummy[selectedId] : null

  return (
    <KTCard>
      <KTCardBody>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary'>
                <th>No</th>
                <th>Institute Name</th>
                <th>Location</th>
                <th>Field</th>
                <th>Start</th>
                <th>To</th>
                <th>Duration</th>
                <th>Certificated</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {data?.length ? (
                data.map((row) => (
                  <tr key={row.no}>
                    <td>{row.no}</td>
                    <td>{row.instituteName}</td>
                    <td>{row.location}</td>
                    <td>{row.field}</td>
                    <td>{row.start}</td>
                    <td>{row.to}</td>
                    <td>{row.duration}</td>
                    <td>{row.certificated}</td>
                    <td>{row.comments}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className='text-center text-muted py-10'>
                    No education data for this profile
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

export default EducationTab
