import React from 'react'

const roles = [
  {label: 'Planner | Admin', desc: 'Planning & Scheduling'},
  {label: 'Supervisor', desc: 'Organizing & Direction'},
  {label: 'Superintendent', desc: 'Review & Execution'},
  {label: 'Manager', desc: 'Control & Analyse'},
  {label: 'Executive', desc: 'Decision Making'},
  {label: 'Command Center', desc: 'Project Control'},
]

const PersonalPortal: React.FC = () => {
  return (
    <div className='card mb-5' style={{minWidth: 320, maxWidth: 350, padding: 0}}>
      {/* Header logo dan judul */}
      <div
        style={{
          background: '#222',
          padding: 16,
          display: 'flex',
          borderRadius: 8,
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img
          src='https://randomuser.me/api/portraits/men/1.jpg' // ganti dengan logo forsa jika ada
          alt='forsa logo'
          style={{
            width: 60,
            height: 60,
            borderRadius: 8,
            objectFit: 'cover',
            background: '#fff',
            marginBottom: 8,
          }}
        />
        <div className='fw-bold fs-3 mb-0 text-white' style={{letterSpacing: 1}}>
          forsa
        </div>
      </div>
      <div className='card-body p-4 pb-2'>
        {/* Subjudul */}
        <div className='fw-bold text-primary mb-2 text-center' style={{fontSize: 15}}>
          ABASE FORSA PERSONAL PORTAL SOLUTION
        </div>
        {/* Deskripsi */}
        <div className='text-gray-700 mb-3 text-center' style={{fontSize: 13}}>
          Employee personal Web Portal provide and consolidated view and update related with daily
          job and decision making.
          <br />
          <span className='d-block mt-2'>Your access will be based on authority :</span>
        </div>
        {/* Daftar Role/Authority */}
        <ul className='list-unstyled w-100 mb-0'>
          {roles.map((role, idx) => (
            <li key={role.label} className='d-flex align-items-start mb-2'>
              <span className='symbol symbol-20px me-2 mt-1'>
                <span className='symbol-label bg-light-primary p-0'>
                  <i className='bi bi-star-fill text-primary fs-6'></i>
                </span>
              </span>
              <div className='d-flex flex-column'>
                <span className='fw-bold text-dark' style={{fontSize: 14}}>
                  {role.label}
                </span>
                <span className='text-gray-600' style={{fontSize: 13}}>
                  {role.desc}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PersonalPortal
