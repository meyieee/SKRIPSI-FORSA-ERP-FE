import { ChangeEvent } from "react"

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<string>>
  setCurrentPage?: Function
}

const UpdateStatusButton = ({setFilter, setCurrentPage}: Props) => {
  function onFilterValueSelected(e: ChangeEvent<HTMLSelectElement>) {
    setFilter(e.target.value)
    setCurrentPage && setCurrentPage(1)
  }

  return (
    <select
      name='status'
      data-control='select2'
      data-hide-search='true'
      className='form-select form-select-solid form-select-sm w-125px me-3'
      defaultValue='active'
      onChange={onFilterValueSelected}
    >
      <option value='active'>Active</option>
      <option value='inactive'>Inactive</option>
      <option value='all'>All</option>
    </select>
  )
}

export default UpdateStatusButton