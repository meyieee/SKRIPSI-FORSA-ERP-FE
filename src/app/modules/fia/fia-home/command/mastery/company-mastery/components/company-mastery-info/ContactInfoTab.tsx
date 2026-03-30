import React from 'react'
import {Company} from '../../core/types'

type ContactInfo = {
  id: string
  fullName: string
  idNumber: string
  lastPosition: string
  prefer: boolean
  fullAddress: string
  workphone: string
  mobile: string
}

type Props = {
  company: Company
}

// Mock data - replace with actual data from props/service
const mockContactInfo: ContactInfo[] = [
  {
    id: '1',
    fullName: 'Atlas Kobe',
    idNumber: '254801',
    lastPosition: 'Accountant',
    prefer: false,
    fullAddress: 'Green Villa, Noongan',
    workphone: '081xxxxxx',
    mobile: '081xxxxxx',
  },
  {
    id: '2',
    fullName: 'Muffin Stone',
    idNumber: '254802',
    lastPosition: 'Project Control Officer',
    prefer: false,
    fullAddress: 'PBJ Ranch Noongan',
    workphone: '081xxxxxx',
    mobile: '081xxxxxx',
  },
]

const ContactInfoTab: React.FC<Props> = ({company}) => {
  const contacts = mockContactInfo // Replace with actual data from company

  return (
    <div className='table-responsive'>
      <table className='table table-row-bordered table-row-gray-300 align-middle'>
        <thead>
          <tr className='bg-dark text-white fw-bold'>
            <th className='min-w-50px text-center'>No</th>
            <th className='min-w-150px'>Full Name</th>
            <th className='min-w-120px'>ID Number</th>
            <th className='min-w-150px'>Last Position</th>
            <th className='min-w-80px text-center'>Prefer</th>
            <th className='min-w-200px'>Full Address</th>
            <th className='min-w-120px'>Workphone</th>
            <th className='min-w-120px'>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan={8} className='text-center text-muted py-3'>
                No data
              </td>
            </tr>
          ) : (
            contacts.map((contact, index) => (
              <tr key={contact.id}>
                <td className='text-center'>{index + 1}</td>
                <td>{contact.fullName}</td>
                <td>
                  <div className='d-flex align-items-center gap-2'>
                    <span className='text-success' style={{fontSize: '10px'}}>▼</span>
                    {contact.idNumber}
                  </div>
                </td>
                <td>{contact.lastPosition}</td>
                <td className='text-center'>
                  <input type='checkbox' checked={contact.prefer} readOnly />
                </td>
                <td>{contact.fullAddress}</td>
                <td>{contact.workphone}</td>
                <td>{contact.mobile}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ContactInfoTab
