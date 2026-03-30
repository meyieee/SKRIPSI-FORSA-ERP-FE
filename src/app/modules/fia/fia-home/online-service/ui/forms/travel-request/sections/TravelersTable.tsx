import React from 'react'
import { Traveler, getCategoryOptions } from '../../../../core/travel-request'
import FormSection from '../../common/components/FormSection'

type TravelersTableProps = {
  travelers: Traveler[]
  setFieldValue: (field: string, value: any) => void
}

export default function TravelersTable({ travelers, setFieldValue }: TravelersTableProps) {
  const addTraveler = () => {
    const newTraveler: Traveler = {
      no: travelers.length + 1,
      lastName: '',
      firstName: '',
      category: '',
      comments: '',
    }
    setFieldValue('travelers', [...travelers, newTraveler])
  }

  const removeTraveler = (index: number) => {
    if (travelers.length <= 1) return
    const updatedTravelers = travelers
      .filter((_, i) => i !== index)
      .map((t, i) => ({ ...t, no: i + 1 }))
    setFieldValue('travelers', updatedTravelers)
  }

  const updateTraveler = (index: number, field: keyof Traveler, value: any) => {
    const updatedTravelers = travelers.map((t, i) => 
      i === index ? { ...t, [field]: value } : t
    )
    setFieldValue('travelers', updatedTravelers)
  }

  return (
    <FormSection title='Name of Travelers'>
      <div className='d-flex justify-content-end mb-3'>
        <button type='button' className='btn btn-sm btn-primary' onClick={addTraveler}>
          <i className='fas fa-plus me-2'></i>
          Add Traveler
        </button>
      </div>

      <div className='table-responsive travelers-table'>
        <table className='table table-bordered'>
          <thead className='table-light'>
            <tr>
              <th style={{ width: '60px' }}>No</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Category</th>
              <th>Comments</th>
              <th style={{ width: '100px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {travelers.map((traveler, index) => (
              <tr key={index}>
                <td>{traveler.no}</td>
                <td>
                  <input
                    type='text'
                    className='form-control form-control-sm'
                    value={traveler.lastName}
                    onChange={(e) => updateTraveler(index, 'lastName', e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type='text'
                    className='form-control form-control-sm'
                    value={traveler.firstName}
                    onChange={(e) => updateTraveler(index, 'firstName', e.target.value)}
                    required
                  />
                </td>
                <td>
                  <select
                    className='form-select form-select-sm'
                    value={traveler.category}
                    onChange={(e) => updateTraveler(index, 'category', e.target.value)}
                    required
                  >
                    <option value=''>Select Category</option>
                    {getCategoryOptions().map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type='text'
                    className='form-control form-control-sm'
                    value={traveler.comments}
                    onChange={(e) => updateTraveler(index, 'comments', e.target.value)}
                  />
                </td>
                <td>
                  {travelers.length > 1 && (
                    <button
                      type='button'
                      className='btn btn-sm btn-outline-danger'
                      onClick={() => removeTraveler(index)}
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </FormSection>
  )
}
