import * as XLSX from 'xlsx'
import { KTSVG } from "../../_metronic"

type Props = {
	setShowViewModal: React.Dispatch<React.SetStateAction<boolean>>
	setDataInModal: React.Dispatch<React.SetStateAction<any>>
  small?: boolean
}

const ExcelImportFile = ({ setShowViewModal, setDataInModal, small }: Props) => {
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const data = await file?.arrayBuffer();
    const workbook = XLSX.read(data)

    // parse Excel to JSON
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const jsonData = XLSX.utils.sheet_to_json(worksheet)

    setShowViewModal(true)
    setDataInModal(jsonData)
  }

	return (
		<label className={`btn btn-light-primary ${small && 'btn-sm'} me-3`}>
      <KTSVG path='/media/icons/duotune/files/fil010.svg' className='svg-icon-2' />
      Import Excel
      <input type='file' style={{display: 'none'}} name='avatar' accept='.xlsx' onChange={(e) => handleFile(e)} />
      <input type='hidden' name='avatar_remove' />
    </label>
	)
}

export default ExcelImportFile