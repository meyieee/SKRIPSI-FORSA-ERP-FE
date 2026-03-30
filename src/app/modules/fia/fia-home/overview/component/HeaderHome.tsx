import React, {useState} from 'react'
import HomePhoneBookModal from './HomePhoneBookModal'

const HeaderHome: React.FC<{title: string}> = ({title}) => {
  const [showPhonebookModal, setShowPhonebookModal] = useState(false)

  const handlePhonebookClick = () => {
    setShowPhonebookModal(true)
  }

  const handleClosePhonebookModal = () => {
    setShowPhonebookModal(false)
  }

  return (
    <>
      <div className='d-flex align-items-center p-5' style={{width: '100%'}}>
        <h2 className='fw-bold mb-0 flex-grow-1'>{title}</h2>
        <div className='d-flex justify-content-end gap-2' style={{minWidth: 0}}>
          <button className='btn btn-primary' onClick={handlePhonebookClick}>
            Search Phonebook
          </button>
        </div>
      </div>
      <HomePhoneBookModal show={showPhonebookModal} handleClose={handleClosePhonebookModal} />
    </>
  )
}

export default HeaderHome
