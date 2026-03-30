import React, {useEffect, useMemo} from 'react'
import {KTCard, KTCardBody} from '../../../../../../../../../_metronic'
import {useProfile} from '../../../ProfileContext'
import {medicalDummy, MedicalRow} from './dummy'

const money = (v?: number) =>
  v === undefined || v === null
    ? ''
    : v.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})

const MedicalTab: React.FC = () => {
  const {selectedId} = useProfile()

  const rows: MedicalRow[] = useMemo(() => {
    return selectedId ? medicalDummy[selectedId] ?? [] : []
  }, [selectedId])

  useEffect(() => {
    console.log('Medical count:', rows.length)
  }, [rows])

  return (
    <KTCard>
      <KTCardBody>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded border table-bordered table-row-gray-300 align-middle text-dark gs-4 gy-1 gx-3'>
            <thead>
              <tr className='fw-bold bg-secondary'>
                <th className='min-w-30px'>No</th>
                <th className='min-w-140px'>Request No</th>
                <th className='min-w-220px'>Clinic Name</th>
                <th className='min-w-140px'>Date Request</th>
                <th className='min-w-220px'>Symptom</th>
                <th className='min-w-220px'>Diagnosa</th>
                <th className='min-w-160px'>Medical Charges</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {rows.length ? (
                rows.map((row) => (
                  <tr key={row.no}>
                    <td>{row.no}</td>
                    <td>{row.requestNo}</td>
                    <td>{row.clinicName}</td>
                    <td>{row.dateRequest}</td>
                    <td>{row.symptom}</td>
                    <td>{row.diagnosa}</td>
                    <td>{money(row.medicalCharges)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className='text-center text-muted py-10'>
                    No medical data for this profile
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

export default MedicalTab
