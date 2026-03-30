import { useState, useEffect, useMemo, useContext } from 'react'
import { useQueryClient } from "@tanstack/react-query"
import { Link } from 'react-router-dom'
import { KTCard, KTCardBody, KTSVG, fullUrlServer, toAbsoluteUrl } from '../../../../_metronic'
import { useAuth } from '../../auth'
import { UserData } from './core/_models'
import { getUsers, resetPasswordUser, updateStatusUsers } from './core/_requests'
import { AlertMessengerContext, CodeNameDisplay, ConfirmModalType1, ConfirmModalType3, DataNotFound, FrontEndPagination, Loading, SearchData } from '../../../components'
import { ConvertDateTime, functionCheckComTypeRoutesAPI, SocketListenerRoomReactQuery, SocketListenerRoomUseState, UseReactQuery } from '../../../functions'
import { getAPIError } from '../../../types'
import { cache_users } from '../../../constans'

const UsersTable = () => {
  const {currentUser} = useAuth()
  const queryClient = useQueryClient();
  const func1 = () => functionCheckComTypeRoutesAPI(getUsers, currentUser)
  
  const { data, isLoading, error } = UseReactQuery({ func: func1, cacheName: cache_users });
  const errorMsg = (error as getAPIError)?.response?.data?.message;

  const [filteredData, setFilteredData] = useState<UserData[] | any | []>([])
  const [searchTerm, setSearchTerm] = useState<string>('') // Get value for search filter
  const [filterRole, setFilterRole] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(1) // Set up current page number in the table

  const { addSuccessMessage, addErrorMessage } = useContext(AlertMessengerContext);

  function onSuccess(msg: string) {
    const time = new Date().toLocaleString();
    addSuccessMessage({
      title: `Success!`,
      message: `${msg} - time: ${time}`,
    });
  }

  function onError(msg: string) {
    const time = new Date().toLocaleString();
    addErrorMessage({
      title: 'Error!',
      message: `${msg} - time: ${time}`,
    });
  }
  
  const filterByRole = (data: any[], value: string) => {
    if (value === "") return data;
    return data.filter((item) => item.role === value);
  };

  const filterByDepartment = (data: any[], value: string) => {
    if (value === "") return data;
    return data.filter((item) => item.department === value);
  };

  const handleApplyFilter = () => {
    let newData = data;
    newData = filterByRole(newData, filterRole) 
    newData = filterByDepartment(newData, filterDepartment)
    setFilteredData(newData)
  }

  const handleResetFilter = () => {
    setFilterRole('')
    setFilterDepartment('')
  }

  const searchItem = (value: [], query: string) => { 
    // Handle search filter based on fetched value
    const keys = ['name', 'employees.branch_detail.com_code', 'role', 'employees.dept_code']
    return value?.filter((item: any) =>
      keys.some((key) => item[key]?.toLowerCase()?.includes(query))
    )
  }

  const searchData = searchItem(filteredData, searchTerm) // Apply search filter by inputting the data and the value

  let pageSize = 10 // Set up number of items to display per page in the table
  const currentTableData = useMemo(() => { // Handle table pagination
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return searchData?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, searchData, pageSize]);
  
  useEffect(() => {
    setFilteredData(data)
  }, [data])

  useEffect(() => {
    SocketListenerRoomReactQuery('users', queryClient, cache_users)
    SocketListenerRoomUseState('users', setFilteredData)//1. socket name, 2. set State
  }, [])
  
  return (
    <KTCard>
      <div className='card-header border-0 pt-6'>
        <div className='card-title'>
          {/* begin::Search */}
          <SearchData searchTerm={searchTerm} setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />
          {/* end::Search */}
        </div>
        {/* begin::Card toolbar */}
        <div className='card-toolbar'>
          {/* begin::Group actions */}
          <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
            {/* begin::Filter Button */}
            <button
              type='button'
              className='btn btn-light-primary me-3'
              data-kt-menu-trigger='click'
              data-kt-menu-placement='bottom-end'
            >
              <KTSVG path='/media/icons/duotune/general/gen031.svg' className='svg-icon-2' />
              Filter
            </button>
            {/* end::Filter Button */}
            {/* begin::SubMenu */}
            <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px' data-kt-menu='true'>
              {/* begin::Header */}
              <div className='px-7 py-5'>
                <div className='fs-5 text-dark fw-bolder'>Filter Options</div>
              </div>
              {/* end::Header */}

              {/* begin::Separator */}
              <div className='separator border-gray-200'></div>
              {/* end::Separator */}

              {/* begin::Content */}
              <div className='px-7 py-5' data-kt-user-table-filter='form'>
                {/* begin::Input group */}
                <div className='mb-10'>
                  <label className='form-label fs-6 fw-bold'>Role:</label>
                  <select
                    className='form-select form-select-solid fw-bolder'
                    data-kt-select2='true'
                    data-placeholder='Select option'
                    data-allow-clear='true'
                    data-kt-user-table-filter='role'
                    data-hide-search='true'
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                  >
                    <option value=''></option>
                    <option value='administrator'>Administrator</option>
                    <option value='manager'>Manager</option>
                    <option value='supervisor'>Supervisor</option>
                    <option value='clerk'>Clerk</option>
                    <option value='portal'>Portal</option>
                  </select>
                </div>
                {/* end::Input group */}

                {/* begin::Input group */}
                <div className='mb-10'>
                  <label className='form-label fs-6 fw-bold'>Department:</label>
                  <select
                    className='form-select form-select-solid fw-bolder'
                    data-kt-select2='true'
                    data-placeholder='Select option'
                    data-allow-clear='true'
                    data-kt-user-table-filter='two-step'
                    data-hide-search='true'
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    disabled={filterRole === 'administrator'}
                  >
                    <option value=''></option>
                    <option value='finance'>Finance</option>
                    <option value='operations'>Operations</option>
                    <option value='resource'>Resource</option>
                    <option value='supply'>Supply</option>
                    <option value='admin'>Admin</option>
                  </select>
                </div>
                {/* end::Input group */}

                {/* begin::Actions */}
                <div className='d-flex justify-content-end'>
                  <button
                    type='button'
                    className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
                    data-kt-menu-dismiss='false'
                    data-kt-user-table-filter='reset'
                    onClick={handleResetFilter}
                  >
                    Reset
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary fw-bold px-6'
                    data-kt-menu-dismiss='true'
                    data-kt-user-table-filter='filter'
                    onClick={handleApplyFilter}
                  >
                    Apply
                  </button>
                </div>
                {/* end::Actions */}
              </div>
              {/* end::Content */}
            </div>
            {/* end::SubMenu */}

            {/* begin::Add New */}
            <Link
              to={`/controls/account-settings/add`}
              type='button'
              className='btn btn-primary'
            >
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Add User
            </Link>
            {/* end::Add New*/}
          </div>
          {/* end::Group actions */}
        </div>
        {/* end::Card toolbar */}
      </div>
      <KTCardBody className='py-4'>
        <div className='table-responsive'>
          <table id='kt_table_users' className='table align-middle table-row-dashed fs-6 gy-1 dataTable no-footer'>
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                <th className='min-w-100px'>Username</th>
                <th className='min-w-150px'>Branch</th>
                <th className='min-w-100px'>Department</th>
                <th className='min-w-100px'>Role</th>
                <th className='min-w-100px'>Status</th>
                <th className='min-w-100px'>Remarks</th>
                <th className='min-w-100px'>Joined day</th>
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-gray-600'>
              {searchData?.length > 0 ? currentTableData.map((row: UserData) => {
                return(
                  <tr key={row.id}>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                          <span>
                            <div className='symbol-label'>
                              { row?.['employees.photo']
                                ? <img alt='uploaded avatar' src={`${fullUrlServer}/${row?.['employees.photo']}`} className='w-100' />
                                : <img alt='default avatar' src={toAbsoluteUrl(`/media/svg/avatars/blank.svg`)} className='w-100' />
                              }
                            </div>
                          </span>
                        </div>
                        <div className='d-flex flex-column'>
                          <span>
                             <CodeNameDisplay name={row.name} code={row.id_number}/>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <CodeNameDisplay name={row?.['employees.branch_detail.com_name']} code={row?.['employees.branch_detail.com_code']}/>
                    </td>
                    <td>
                      <CodeNameDisplay name={row?.['employees.department_detail.dept_des']} code={row?.['employees.department_detail.dept_code']}/>
                    </td>
                    <td>
                      <div className='badge badge-light-info fw-bolder'>{row.role}</div>
                    </td>
                    <td>
                      {
                        row.status
                        ? <span className='badge badge-light-success fs-7 fw-semibold'>Active</span>
                        : <span className='badge badge-light-danger fs-7 fw-semibold'>Inactive</span>
                      }
                    </td>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='d-flex flex-column'>
                          <span className='text-gray-800 text-hover-primary mb-1'>
                            {row.remarks}
                          </span>
                          <span>{row.updatedAt && `Updated status at: ${ConvertDateTime(row.updatedAt).date}`}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className='min-w-125px'>{ConvertDateTime(row.createdAt).date}</span>
                    </td>
                    <td className='text-end'>
                    <Link
                      title='Edit'
                       to={`/controls/account-settings/edit/${row.id}`}
                       className='btn btn-sm btn-link btn-color-gray-500 btn-active-color-primary me-1'
                    >
                      <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </Link>
                                              
                     <ConfirmModalType1 
                        action={()=>resetPasswordUser(row.id_number,onSuccess, onError)} 
                        buttonLabel={<KTSVG path="/media/icons/duotune/general/gen051.svg" className="svg-icon-3" />} 
                        className='btn btn-sm btn-link btn-color-gray-500 btn-active-color-primary'
                        modalTitle="Are you sure you want to reset this user's password?"
                        buttonTitle= "Reset Password"                   
                      /> 
                      <ConfirmModalType3
                        action={(remarks: string, user_id: string | undefined, onSuccess: Function, onError: Function) => updateStatusUsers(row.id!, row['employees.branch_detail.com_code']!,  row.status!, remarks, onSuccess, onError)}
                        className={
                          row.status
                            ? 'btn btn-sm btn-link btn-color-gray-500 btn-active-color-danger'
                            : 'btn btn-sm btn-link btn-color-gray-500 btn-active-color-success'
                        }
                        textButton={
                          row.status
                            ? <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                            : <KTSVG path='/media/icons/duotune/files/fil011.svg' className='svg-icon-3' />
                        }
                        modalTitle={`Are you sure you want to ${row.status ? 'deactivate' : 'activate'} item?`}
                        buttonTitle='Update Status'
                      />
                    </td>
                  </tr>
                )
              }) : <DataNotFound colSpan={10} errorMsg={errorMsg} />}
            </tbody>
          </table>
        </div>
        {isLoading && <Loading />}
        <FrontEndPagination
          currentPage={currentPage}
          totalCount={searchData?.length || 0}
          pageSize={pageSize}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </KTCardBody>
    </KTCard>
  )
}

export {UsersTable}