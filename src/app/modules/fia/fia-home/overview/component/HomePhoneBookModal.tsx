import React from 'react'
import ViewModal from '../../../../../components/ViewModal'

interface HomePhoneBookModalProps {
  show: boolean
  handleClose: () => void
}

const labelTdStyle = {
  width: 120,
  paddingRight: 8,
  whiteSpace: 'nowrap' as const,
  verticalAlign: 'top' as const,
}
const valueTdStyle = {paddingLeft: 8, verticalAlign: 'top' as const}

const HomePhoneBookModal: React.FC<HomePhoneBookModalProps> = ({show, handleClose}) => {
  return (
    <>
      {/* Override modal lebar di mobile */}
      <style>{`
        @media (max-width: 576px) {
          .modal-dialog {
            max-width: 95vw !important;
            width: 95vw !important;
            margin: 0 auto !important;
          }
          .modal-content {
            border-radius: 10px !important;
          }
        }
      `}</style>
      <ViewModal
        title={'EDUARD SALINDEHO - 254875'}
        modalSize='75'
        show={show}
        handleClose={handleClose}
      >
        <div className='row'>
          {/* General Info, Job Info, and Photo in one row (responsive) */}
          <div className='row mb-3 align-items-start'>
            <div className='col-12 col-md-5 mb-4 mb-md-0'>
              <div className='bg-light fw-bold px-3 py-2'>GENERAL INFO</div>
              <table className='w-100 mb-2' style={{tableLayout: 'fixed'}}>
                <tbody>
                  <tr>
                    <td style={labelTdStyle}>
                      <b>Employee ID</b> :
                    </td>
                    <td style={valueTdStyle}>254875</td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>
                      <b>Full Name</b> :
                    </td>
                    <td style={valueTdStyle}>Eduard Salindeho</td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>
                      <b>Gender</b> :
                    </td>
                    <td style={valueTdStyle}>Male</td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>
                      <b>Marital</b> :
                    </td>
                    <td style={valueTdStyle}>Male</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-12 col-md-5 mb-4 mb-md-0'>
              <div className='bg-light fw-bold px-3 py-2'>JOB INFORMATION</div>
              <table className='w-100 mb-2' style={{tableLayout: 'fixed'}}>
                <tbody>
                  <tr>
                    <td style={labelTdStyle}>
                      <b>Employee Type</b> :
                    </td>
                    <td style={valueTdStyle}>Staff</td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>
                      <b>Position ID - Title</b> :
                    </td>
                    <td style={valueTdStyle}>Business Development</td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>
                      <b>E-Mail Address</b> :
                    </td>
                    <td style={valueTdStyle}>
                      <a href='mailto:eduard.salindeho@123.com'>eduard.salindeho@123.com</a>
                    </td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>
                      <b>Workphone</b> :
                    </td>
                    <td style={valueTdStyle}>0811-</td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>
                      <b>Mobile Phone</b> :
                    </td>
                    <td style={valueTdStyle}>0811-</td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>
                      <b>Home Phone</b> :
                    </td>
                    <td style={valueTdStyle}>022-</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-12 col-md-2 d-flex flex-column align-items-center mb-4 mb-md-0'>
              <img
                src='https://randomuser.me/api/portraits/men/1.jpg'
                alt='Profile'
                style={{
                  width: 120,
                  height: 150,
                  objectFit: 'cover',
                  border: '2px solid #ccc',
                  marginTop: 0,
                }}
              />
              <div style={{marginTop: 8, fontWeight: 'bold'}}>Contractor</div>
            </div>
          </div>
          {/* Organization - grid, not table */}
          <div className='col-12 mb-3'>
            <div className='bg-light fw-bold px-3 py-2'>ORGANIZATION</div>
            <div className='row'>
              <div className='col-12 col-md-6 mb-2'>
                <b>Company</b> : <span className='text-dark'>ABase Company</span>
              </div>
              <div className='col-12 col-md-6 mb-2'>
                <b>Department</b> : <span className='text-dark'>Operation</span>
              </div>
              <div className='col-12 col-md-6 mb-2'>
                <b>Employee Company</b> : <span className='text-dark'>Contractor A</span>
              </div>
              <div className='col-12 col-md-6 mb-2'>
                <b>Business Unit</b> : <span className='text-dark'>Development</span>
              </div>
              <div className='col-12 col-md-6 mb-2'>
                <b>Site | Branch</b> : <span className='text-dark'>ABase HO</span>
              </div>
              <div className='col-12 col-md-6 mb-2'>
                <b>Cost Center | Section</b> : <span className='text-dark'>Development</span>
              </div>
              <div className='col-12 col-md-6 mb-2'>
                <b>Division</b> : <span className='text-dark'>Operation</span>
              </div>
              <div className='col-12 col-md-6 mb-2'>
                <b>Onsite Location</b> : <span className='text-dark'>Head Office</span>
              </div>
              <div className='col-12 col-md-6 mb-2'>
                <b>Office</b> : <span className='text-dark'>Somewhere</span>
              </div>
              <div className='col-12 col-md-6 mb-2'>
                <b>Supervisor</b> : <span className='text-dark'>Vallerie Salindeho</span>
              </div>
            </div>
          </div>
          {/* Address Details - grid, not table */}
          <div className='col-12 row'>
            <div className='col-12 col-md-4 mb-4 mb-md-0'>
              <div className='bg-light fw-bold px-3 py-2'>ADDRESS DETAILS</div>
              <div className='row'>
                <div className='col-6'>
                  <b>Address</b> :
                </div>
                <div className='col-6 text-dark'></div>
                <div className='col-6'>
                  <b>Sub District</b> :
                </div>
                <div className='col-6 text-dark'></div>
                <div className='col-6'>
                  <b>District</b> :
                </div>
                <div className='col-6 text-dark'></div>
                <div className='col-6'>
                  <b>Region</b> :
                </div>
                <div className='col-6 text-dark'></div>
                <div className='col-6'>
                  <b>Province</b> :
                </div>
                <div className='col-6 text-dark'></div>
                <div className='col-6'>
                  <b>Country</b> :
                </div>
                <div className='col-6 text-dark'></div>
              </div>
            </div>
            <div className='col-12 col-md-4 mb-4 mb-md-0'>
              <div className='bg-light fw-bold px-3 py-2'>OFFSITE</div>
              <div className='row'>
                <div className='col-12 text-dark'>Green Villa Jl. Noongan Raya</div>
                <div className='col-12 text-dark'>Mapanget</div>
                <div className='col-12 text-dark'>Mapanget</div>
                <div className='col-12 text-dark'>Manado</div>
                <div className='col-12 text-dark'>Sulawesi Utara</div>
                <div className='col-12 text-dark'>Indonesia</div>
              </div>
            </div>
            <div className='col-12 col-md-4'>
              <div className='bg-light fw-bold px-3 py-2'>ONSITE</div>
              <div className='row'>
                <div className='col-12 text-dark'>Ruko Kairagi Jl. Raya Kairagi No 7A</div>
                <div className='col-12 text-dark'>Noongan 3</div>
                <div className='col-12 text-dark'>Langowan Barat</div>
                <div className='col-12 text-dark'>Minahasa</div>
                <div className='col-12 text-dark'>Sulawesi Utara</div>
                <div className='col-12 text-dark'>Indonesia</div>
              </div>
            </div>
          </div>
        </div>
      </ViewModal>
    </>
  )
}

export default HomePhoneBookModal
