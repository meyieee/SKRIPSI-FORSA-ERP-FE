import { ChangeEvent } from "react"
import { KTSVG } from "../../_metronic"

type Props = {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  setCurrentPage?: Function
}

const SearchData = ({searchTerm, setSearchTerm, setCurrentPage}: Props) => {
  const getSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage && setCurrentPage(1)
    return null;
  }

  return (
    <section className='d-flex align-items-center position-relative my-1'>
      <KTSVG
        path='/media/icons/duotune/general/gen021.svg'
        className='svg-icon-1 position-absolute ms-6'
      />
      <input
        type='text'
        data-kt-user-table-filter='search'
        className='form-control form-control-solid w-250px ps-14'
        placeholder='Search...'
        value={searchTerm}
        onChange={getSearchTerm}
      />
    </section>
  )
}

export default SearchData