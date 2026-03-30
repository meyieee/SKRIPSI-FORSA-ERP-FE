import React, {useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import AddEventModal from '../add-edit/AddEvent'

const CompanyCalendar: React.FC = () => {
  const [events, setEvents] = useState([
    {title: 'Valentine Days', date: '2024-02-14'},
    {title: 'Department Retreat', date: '2024-02-27'},
    // Tambahkan event lain sesuai kebutuhan
  ])
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined)

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedDate(undefined)
  }

  const handleAddEvent = (event: {title: string; date: string}) => {
    setEvents((prev) => [...prev, event])
  }

  return (
    <div className='card card-xl-stretch mb-5 mb-xl-8 p-5'>
      <h3 className='mb-5'>COMPANY CALENDAR</h3>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={handleDateClick}
        initialView='dayGridMonth'
        height={500}
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: '',
        }}
      />
      <AddEventModal
        show={showModal}
        handleClose={handleCloseModal}
        onSubmit={handleAddEvent}
        initialDate={selectedDate}
      />
    </div>
  )
}

export default CompanyCalendar
