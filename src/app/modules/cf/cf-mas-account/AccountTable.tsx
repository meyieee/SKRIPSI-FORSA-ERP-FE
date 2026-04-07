import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useQueryClient } from "@tanstack/react-query"
import { KTCard, KTCardBody, KTSVG } from '../../../../_metronic'
import { getAPIError } from '../../../types'
import { FrontEndPagination, DataNotFound, SearchData, UpdateStatusButton, Loading, ExcelImportFile, ExcelPreviewModal, ConfirmModalType3 } from '../../../components'
import { AccountData } from './core/_models'
import { getAccount, updateStatusAccount } from './core/_requests'
import { SocketListenerGlobalReactQuery, UseReactQuery, ConvertDateTime } from '../../../functions'
import { cache_accounts } from '../../../constans'

const AccountTable = () => {
  const queryClient = useQueryClient();
  const { data: rows, isLoading, error } = UseReactQuery({ func: getAccount, cacheName: cache_accounts });
  const errorMsg = (error as getAPIError)?.response?.data?.message

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filter, setFilter] = useState<string>('active')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [dataInModal, setDataInModal] = useState<AccountData[]>([])
  const [showViewModal, setShowViewModal] = useState<boolean>(false)

  const handleCloseModal = () => setShowViewModal(false)

  const searchItem = (value: AccountData[], query: string): AccountData[] => {
    const keys: (keyof AccountData)[] = ['account_no', 'account_name', 'account_type', 'account_group', 'normally', 'remarks', 'reg_by'];
    return value?.filter((item: AccountData) =>
      keys.some((key: keyof AccountData) => {
        const property = item[key];
        if (typeof property === 'string') {
          return property.toLowerCase().includes(query.toLowerCase());
        }
        return false;
      })
    );
  };

  const filteredList = useMemo(() => {
    if (!rows) return []; // Handle kasus di mana data belum ada
    const searchResult = searchItem(rows, searchTerm);
    if (!searchResult) return []; // Handle kasus di mana result searchItem belum ada
    
    return searchResult.filter((query: AccountData) => {
         if(filter === 'active') {
      return query?.status === true;
    } else if(filter === 'inactive') {
      return query?.status === false;
    }
      return query; 
    });
  }, [rows, searchTerm, filter]);

  let pageSize = 10
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return filteredList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage,filteredList,pageSize]);

  useEffect(() => {
    SocketListenerGlobalReactQuery('change-account-data', queryClient, cache_accounts) //1. socket name, 2. queryclient, 3. cache name
  }, [])

  return (
    <KTCard>
      <header className='card-header border-0 pt-6'>
        <section className='card-title'>
          <SearchData searchTerm={searchTerm} setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />
        </section>
        <section className='card-toolbar'>
          <section className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
            <UpdateStatusButton setFilter={setFilter} setCurrentPage={setCurrentPage} />

            <ExcelImportFile setShowViewModal={setShowViewModal} setDataInModal={setDataInModal} />

            <Link to='/control-file/master/acc/add' type='button' className='btn btn-primary'>
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Add New
            </Link>
          </section>
        </section>
      </header>
      <KTCardBody className='py-4'>
        <main className='table-responsive'>
          <table
            id='kt_table_users'
            className='table align-middle table-hover table-row-dashed fs-6 gy-1 dataTable no-footer'
          >
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                <th className='min-w-100px'>Account No</th>
                <th className='min-w-150px'>Account Name</th>
                <th className='min-w-150px'>Account Type</th>
                <th className='min-w-150px'>Account Group</th>
                <th className='min-w-150px'>Normally</th>
                <th className='min-w-100px'>Status</th>
                <th className='min-w-150px'>Remarks</th>
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-gray-600'>
            {filteredList.length > 0 ? currentTableData.map((row: AccountData) => (
              <tr key={row.id}>
                <td>
                  <span className='min-w-100px'>{row.account_no}</span>
                </td>
                <td>
                  <span className='min-w-100px'>{row.account_name}</span>
                </td>
                <td>
                  <span className='min-w-100px'>{row.account_type}</span>
                </td>
                <td>
                  <span className='min-w-100px'>{row.account_group}</span>
                </td>
                <td>
                  <span className='min-w-100px'>{row.normally}</span>
                </td>
                <td>
                {
                  row.status
                  ? <span className='badge badge-light-success fs-7 fw-semibold'>Active</span>
                  : <span className='badge badge-light-danger fs-7 fw-semibold'>Inactive</span>
                }
                </td>
                <td>
                  <section className='d-flex align-items-center'>
                    <section className='d-flex flex-column'>
                      <span className='text-gray-800 text-hover-primary mb-1'>
                        {row.remarks}
                      </span>
                      <span>{row.status_date && `Updated status at: ${ConvertDateTime(row.status_date).date}`}</span>
                    </section>
                  </section>
                </td>
                <td className='text-end'>
                  <Link
                    to={`/control-file/master/acc/edit/${row.id}`}
                    type='button'
                    state={row}
                    title='Edit'
                    className='btn btn-sm btn-link btn-color-gray-500 btn-active-color-primary me-1'
                  >
                    <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                  </Link>
                  <ConfirmModalType3
                    action={(remarks:string, user_id: string | undefined, onSuccess:Function, onError: Function) => updateStatusAccount(row.id!, row.status!, remarks,  onSuccess, onError)}
                    className={ row.status ? 'btn btn-sm btn-link btn-color-gray-500 btn-active-color-danger' : 'btn btn-sm btn-link btn-color-gray-500 btn-active-color-success'}
                    textButton={
                      row.status
                      ? <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                      : <KTSVG path='/media/icons/duotune/files/fil011.svg' className='svg-icon-3' />
                    }
                    modalTitle={`Are you sure you want to ${row?.status ? 'deactivate' : 'activate'} item?`}
                    buttonTitle='Update Status'
                  />
                </td>
              </tr>
            )) : <DataNotFound colSpan={9} errorMsg={errorMsg} />}
            </tbody>
          </table>
        </main>
        <ExcelPreviewModal data={dataInModal} show={showViewModal} handleClose={handleCloseModal} apiEndpoint='account'>
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              <th className='min-w-100px'>Account No</th>
              <th className='min-w-150px'>Account Name</th>
              <th className='min-w-150px'>Account Type</th>
              <th className='min-w-150px'>Account Group</th>
              <th className='min-w-150px'>Normally</th>
              <th className='min-w-100px'>Status</th>
              <th className='min-w-150px'>Remarks</th>
              <th className='min-w-150px text-end'>Registered By</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {dataInModal?.length > 0 ? dataInModal?.map((row: AccountData, i: number) => (
              <tr key={i}>
                <td>
                  <span className='min-w-100px'>{row.account_no}</span>
                </td>
                <td>
                  <span className='min-w-100px'>{row.account_name}</span>
                </td>
                <td>
                  <span className='min-w-100px'>{row.account_type}</span>
                </td>
                <td>
                  <span className='min-w-100px'>{row.account_group}</span>
                </td>
                <td>
                  <span className='min-w-100px'>{row.normally}</span>
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
                    </div>
                  </div>
                </td>
                <td className='text-end'>
                <span className='min-w-125px'>{row.reg_by}</span>
                </td>
              </tr>
            )) : <DataNotFound colSpan={6} />}
          </tbody>
        </ExcelPreviewModal>
        {isLoading && <Loading />}
        <FrontEndPagination
          currentPage={currentPage}
          totalCount={filteredList?.length}
          pageSize={pageSize}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </KTCardBody>
    </KTCard>
  )
}

export {AccountTable}