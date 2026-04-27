import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { KTCard, KTCardBody, KTSVG, fullUrlServer, toAbsoluteUrl } from '../../../../_metronic'
import { useAuth } from '../../auth'
import { AlertMessengerContext, CodeNameDisplay, ConfirmModalType3, DataNotFound, FrontEndPagination, Loading, SearchData } from '../../../components'
import { ConvertDateTime, functionCheckComTypeRoutesAPI, SocketListenerRoomReactQuery, SocketListenerRoomUseState, UseReactQuery } from '../../../functions'
import { getAPIError } from '../../../types'
import { cache_departments, cache_employeeregister } from '../../../constans'
import { getDepartments } from '../../fia/fia-home/company/core/_requests'
import InlinePersonalInfoPanel from '../../fia/fia-home/command/mastery/components/workforce/InlinePersonalInfoPanel'
import { fetchPersonalInfo } from '../../fia/fia-resource/personal-info/core/_requests'
import { useProfile } from '../../fia/fia-resource/personal-info/components/ProfileContext'
import { EmployeeRegisterData } from './core/models'
import { getEmployee, updateStatusEmployee } from './core/request'

const getEmployeeFullName = (employee: EmployeeRegisterData) =>
  [employee.first_name, employee.middle_name, employee.last_name].filter(Boolean).join(' ').trim() || employee.id_number

const getSectionDisplayName = (employee: EmployeeRegisterData) =>
  employee['section_detail.section_description'] || employee.section_code || '-'

const EmployeeManagementTable = () => {
  const { currentUser } = useAuth()
  const { setPersonalInfoPayload } = useProfile()
  const queryClient = useQueryClient()
  const detailAnchorRef = useRef<HTMLDivElement>(null)
  const funcGetEmployee = () => functionCheckComTypeRoutesAPI(getEmployee, currentUser)

  const { data, isLoading, error } = UseReactQuery({ func: funcGetEmployee, cacheName: cache_employeeregister })
  const { data: departments } = UseReactQuery({ func: getDepartments, cacheName: cache_departments })
  const errorMsg = (error as getAPIError)?.response?.data?.message

  const [filteredData, setFilteredData] = useState<EmployeeRegisterData[] | []>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('')
  const [filterSection, setFilterSection] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [hasDetail, setHasDetail] = useState(false)

  const { addErrorMessage } = useContext(AlertMessengerContext)

  function onError(msg: string) {
    const time = new Date().toLocaleString()
    addErrorMessage({ title: 'Error!', message: `${msg} - time: ${time}` })
  }

  const handleView = async (idNumber: string) => {
    try {
      const payload = await fetchPersonalInfo(idNumber)
      setPersonalInfoPayload(payload)
      if (!hasDetail) setHasDetail(true)
      setTimeout(() => detailAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
    } catch (e: any) {
      onError(e?.response?.data?.message || `Failed to load personal info for ${idNumber}`)
    }
  }

  const handleApplyFilter = () => {
    const rows = Array.isArray(data) ? data : []
    const nextRows = rows.filter((item) => {
      const sameDepartment = !filterDepartment || item.dept_code === filterDepartment
      const sameSection = !filterSection || item.section_code === filterSection
      return sameDepartment && sameSection
    })
    setFilteredData(nextRows)
    setCurrentPage(1)
  }

  const handleResetFilter = () => {
    setFilterDepartment('')
    setFilterSection('')
    setFilteredData(Array.isArray(data) ? data : [])
  }

  const searchData = useMemo(() => {
    const rows = Array.isArray(filteredData) ? filteredData : []
    const normalizedQuery = searchTerm.toLowerCase()
    if (!normalizedQuery) return rows

    return rows.filter((item) => {
      const keys = [
        item.id_number,
        getEmployeeFullName(item),
        item['branch_detail.com_name'],
        item.branch_code,
        item['department_detail.dept_des'],
        item.dept_code,
        item['section_detail.section_description'],
        item.section_code,
        item.status,
      ]
      return keys.some((value) => String(value || '').toLowerCase().includes(normalizedQuery))
    })
  }, [filteredData, searchTerm])

  const departmentOptions = useMemo(() => {
    const rows = Array.isArray(departments) ? departments : []
    return rows
      .map((item: any) => ({
        value: String(item.dept_code || '').trim(),
        label: `${item.dept_code || ''} - ${item.dept_des || ''}`.trim(),
      }))
      .filter((item, index, arr) => item.value && arr.findIndex((row) => row.value === item.value) === index)
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [departments])

  const sectionOptions = useMemo(() => {
    const rows = Array.isArray(data) ? data : []
    return rows
      .map((item) => ({
        value: String(item.section_code || '').trim(),
        label: `${item.section_code || ''} - ${getSectionDisplayName(item)}`.trim(),
        deptCode: String(item.dept_code || '').trim(),
      }))
      .filter((item, index, arr) => item.value && arr.findIndex((row) => row.value === item.value) === index)
      .filter((item) => !filterDepartment || item.deptCode === filterDepartment)
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [data, filterDepartment])

  const pageSize = 10
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize
    return searchData.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, searchData])

  useEffect(() => {
    setFilteredData(Array.isArray(data) ? data : [])
  }, [data])

  useEffect(() => {
    SocketListenerRoomReactQuery('employee', queryClient, cache_employeeregister)
    SocketListenerRoomUseState('employee', setFilteredData)
  }, [queryClient])

  return (
    <KTCard>
      <div className='card-header border-0 pt-6'>
        <div className='card-title'>
          <SearchData searchTerm={searchTerm} setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />
        </div>
        <div className='card-toolbar'>
          <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
            <button
              type='button'
              className='btn btn-light-primary me-3'
              data-kt-menu-trigger='click'
              data-kt-menu-placement='bottom-end'
            >
              <KTSVG path='/media/icons/duotune/general/gen031.svg' className='svg-icon-2' />
              Filter
            </button>
            <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px' data-kt-menu='true'>
              <div className='px-7 py-5'>
                <div className='fs-5 text-dark fw-bolder'>Filter Options</div>
              </div>
              <div className='separator border-gray-200'></div>
              <div className='px-7 py-5'>
                <div className='mb-10'>
                  <label className='form-label fs-6 fw-bold'>Department:</label>
                  <select
                    className='form-select form-select-solid fw-bolder'
                    value={filterDepartment}
                    onChange={(e) => {
                      setFilterDepartment(e.target.value)
                      setFilterSection('')
                    }}
                  >
                    <option value='' disabled hidden>
                      Select department
                    </option>
                    {departmentOptions.map((department) => (
                      <option key={department.value} value={department.value}>
                        {department.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='mb-10'>
                  <label className='form-label fs-6 fw-bold'>Section:</label>
                  <select
                    className='form-select form-select-solid fw-bolder'
                    value={filterSection}
                    onChange={(e) => setFilterSection(e.target.value)}
                  >
                    <option value='' disabled hidden>
                      Select section
                    </option>
                    {sectionOptions.map((section) => (
                      <option key={section.value} value={section.value}>
                        {section.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='d-flex justify-content-end'>
                  <button type='button' className='btn btn-light btn-active-light-primary fw-bold me-2 px-6' onClick={handleResetFilter}>
                    Reset
                  </button>
                  <button type='button' className='btn btn-primary fw-bold px-6' data-kt-menu-dismiss='true' onClick={handleApplyFilter}>
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <Link to='/controls/employee-management/add' className='btn btn-primary'>
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Add Employee
            </Link>
          </div>
        </div>
      </div>

      <KTCardBody className='py-4'>
        <div className='table-responsive'>
          <table className='table align-middle table-row-dashed fs-6 gy-1 dataTable no-footer'>
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                <th className='min-w-140px'>Employee</th>
                <th className='min-w-150px'>Branch</th>
                <th className='min-w-120px'>Department</th>
                <th className='min-w-140px'>Section</th>
                <th className='min-w-100px'>Status</th>
                <th className='min-w-110px'>Joined day</th>
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-gray-600'>
              {searchData.length > 0 ? currentTableData.map((row) => (
                <tr key={row.id || row.id_number}>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                        <span>
                          <div className='symbol-label'>
                            {row.photo
                              ? <img alt='uploaded avatar' src={`${fullUrlServer}/${row.photo}`} className='w-100' />
                              : <img alt='default avatar' src={toAbsoluteUrl('/media/svg/avatars/blank.svg')} className='w-100' />
                            }
                          </div>
                        </span>
                      </div>
                      <div className='d-flex flex-column'>
                        <span>
                          <CodeNameDisplay name={getEmployeeFullName(row)} code={row.id_number} />
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <CodeNameDisplay name={row['branch_detail.com_name']} code={row.branch_code} />
                  </td>
                  <td>
                    <CodeNameDisplay name={row['department_detail.dept_des']} code={row.dept_code} />
                  </td>
                  <td>
                    <CodeNameDisplay name={getSectionDisplayName(row)} code={row.section_code || '-'} />
                  </td>
                  <td>
                    {row.status === 'Active'
                      ? <span className='badge badge-light-success fs-7 fw-semibold'>Active</span>
                      : <span className='badge badge-light-danger fs-7 fw-semibold'>Inactive</span>}
                  </td>
                  <td>
                    <span className='min-w-125px'>{row.reg_date ? ConvertDateTime(row.reg_date).date : '-'}</span>
                  </td>
                  <td className='text-end'>
                    <Link
                      title='Edit'
                      to={`/controls/employee-management/edit/${row.id}`}
                      className='btn btn-sm btn-link btn-color-gray-500 btn-active-color-primary me-1'
                    >
                      <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </Link>

                    <button
                      type='button'
                      title='View Personal Info'
                      className='btn btn-sm btn-link btn-color-gray-500 btn-active-color-primary me-1'
                      onClick={() => handleView(row.id_number)}
                    >
                      <KTSVG path='/media/icons/duotune/general/gen004.svg' className='svg-icon-3' />
                    </button>

                    <ConfirmModalType3
                      action={(remarks: string, user_id: string | undefined, success: Function, fail: Function) =>
                        updateStatusEmployee(
                          String(row.id),
                          row.status === 'Active' ? 'Inactive' : 'Active',
                          remarks,
                          success,
                          fail
                        )
                      }
                      className={
                        row.status === 'Active'
                          ? 'btn btn-sm btn-link btn-color-gray-500 btn-active-color-danger'
                          : 'btn btn-sm btn-link btn-color-gray-500 btn-active-color-success'
                      }
                      textButton={
                        row.status === 'Active'
                          ? <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                          : <KTSVG path='/media/icons/duotune/files/fil011.svg' className='svg-icon-3' />
                      }
                      modalTitle={`Are you sure you want to ${row.status === 'Active' ? 'delete' : 'restore'} item?`}
                      buttonTitle='Delete Employee'
                    />
                  </td>
                </tr>
              )) : <DataNotFound colSpan={8} errorMsg={errorMsg} />}
            </tbody>
          </table>
        </div>
        {isLoading && <Loading />}
        <FrontEndPagination
          currentPage={currentPage}
          totalCount={searchData.length || 0}
          pageSize={pageSize}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
        <div ref={detailAnchorRef} />
        <div className={hasDetail ? 'mt-8' : 'd-none'}>
          <InlinePersonalInfoPanel />
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export { EmployeeManagementTable }
