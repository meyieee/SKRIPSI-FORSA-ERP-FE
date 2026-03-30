import { usePagination, DOTS } from '../custom-hooks';
import clsx from 'clsx'

const FrontEndPagination = ({onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize}:any) => {

  const paginationRange:any = usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize
    });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange?.length - 1];
  return (
    <div className='row my-3'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        <div id='kt_table_users_paginate'>
          <ul className='pagination'>
            <li
              className={clsx("page-item previous", {
                disabled: currentPage === 1,
              })}
            >
              <span onClick={onPrevious} className="page-link">
                <i className="previous"></i>
              </span>
            </li>
            {paginationRange?.length > 0 ? paginationRange?.map((pageNumber:any, index: number) => {
              if (pageNumber === DOTS) {
                return <li key={index} style={{cursor: 'default',height:25,width:25,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:20}} className="page-item">
                  <p>
                    <span style={{fontSize:20}}>.</span>
                    <span style={{fontSize:20}}>.</span>
                    <span style={{fontSize:20}}>.</span>
                  </p>
                </li>
              }
              return (
                <li
                  key={index}
                  className={clsx('page-item', {
                    active: pageNumber === currentPage
                  })}
                >
                  <span className="page-link" style={{cursor: 'pointer'}} onClick={() => onPageChange(pageNumber)}>{pageNumber}</span>
                </li>
              );
            }) : null}
            <li
              className={clsx('page-item', {
                disabled: currentPage === lastPage
              })}
            >
              <span onClick={onNext} className="page-link">
                <i className="next"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export { FrontEndPagination }