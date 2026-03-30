import React from 'react'
import {KTCard, KTCardBody} from '../../../../../../../../../_metronic'
import {useProfile} from '../../../ProfileContext'
import {languageDummy, hobbyDummy} from './dummy'

const LanguageHobbyTab: React.FC = () => {
  const {selectedId} = useProfile()
  const langs = selectedId ? languageDummy[selectedId] : null
  const hobbies = selectedId ? hobbyDummy[selectedId] : null

  return (
    <KTCard>
      <KTCardBody>
        <div className='row g-6'>
          {/* Language table */}
          <div className='col-12 col-lg-8'>
            <div className='table-responsive'>
              <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
                <thead className='fw-bold bg-secondary'>
                  <tr>
                    <th>No</th>
                    <th>Language</th>
                    <th>Speaking</th>
                    <th>Reading</th>
                    <th>Writing</th>
                    <th>Listening</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {langs?.length ? (
                    langs.map((row) => (
                      <tr key={row.no}>
                        <td>{row.no}</td>
                        <td>{row.language}</td>
                        <td>{row.speaking}</td>
                        <td>{row.reading}</td>
                        <td>{row.writing}</td>
                        <td>{row.listening}</td>
                        <td>{row.remarks || '-'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className='text-center text-muted py-10'>
                        No language data for this profile
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hobby table */}
          <div className='col-12 col-lg-4'>
            <div className='table-responsive'>
              <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
                <thead>
                  <tr className='fw-bold bg-secondary'>
                    <th>No</th>
                    <th>Hobby</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody className='text-gray-800'>
                  {hobbies?.length ? (
                    hobbies.map((row) => (
                      <tr key={row.no}>
                        <td>{row.no}</td>
                        <td>{row.hobby}</td>
                        <td>{row.remarks || '-'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className='text-center py-10'>
                        No hobby data for this profile
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export default LanguageHobbyTab
