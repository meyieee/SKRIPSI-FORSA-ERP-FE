import React, {useEffect, useRef, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import {useMutation, useQueryClient} from '@tanstack/react-query'

import './scss/rosterstyles.scss'
import AddEventModal from './modal/AddEventModal'

import {UseReactQuery} from '../../../../../../functions'
import {cache_fiaresourceonlinefeeds_roster} from '../../../../../../constans/CachesName'
import {
  getRosterNotesByMonth,
  postRosterNote,
  putRosterNote,
  removeRosterNote,
  type RosterNote,
} from '../../core/roster'

type CalendarEvent = {
  id: string
  title: string
  date: string
  classNames?: string[]
}

const getRosterNoteClassName = (text: string) => {
  const note = String(text || '').trim().toUpperCase()
  if (note === 'D') return 'roster-note-d'
  if (note === 'O') return 'roster-note-o'
  if (note === 'N') return 'roster-note-n'
  return 'roster-note-default'
}

const RosterTab: React.FC = () => {
  const hostRef = useRef<HTMLDivElement>(null)
  const qc = useQueryClient()

  const now = new Date()
  const [activeYear, setActiveYear] = useState(now.getFullYear())
  const [activeMonth, setActiveMonth] = useState(now.getMonth() + 1)

  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null)
  const [initialTitle, setInitialTitle] = useState('')

  // karena UseReactQuery pakai queryKey: [cacheName], kita embed year/month ke cacheName
  const cacheKey = `${cache_fiaresourceonlinefeeds_roster}?y=${activeYear}&m=${activeMonth}`

  const rosterQuery = UseReactQuery<RosterNote[]>({
    cacheName: cacheKey,
    enabled: true,
    func: async () => getRosterNotesByMonth({year: activeYear, month: activeMonth}),
  })

  const events: CalendarEvent[] = (rosterQuery.data ?? []).map((n) => ({
    id: String(n.id),
    title: n.text,
    date: n.date,
    classNames: [getRosterNoteClassName(n.text)],
  }))

  const invalidate = () => qc.invalidateQueries({queryKey: [cacheKey]})

  const createMut = useMutation({
    mutationFn: (payload: {date: string; text: string}) => postRosterNote(payload),
    onSuccess: invalidate,
  })

  const updateMut = useMutation({
    mutationFn: (args: {id: number; text: string}) => putRosterNote(args.id, {text: args.text}),
    onSuccess: invalidate,
  })

  const deleteMut = useMutation({
    mutationFn: (id: number) => removeRosterNote(id),
    onSuccess: invalidate,
  })

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedDate(undefined)
    setEditMode(false)
    setSelectedNoteId(null)
    setInitialTitle('')
  }

  // klik tanggal selalu membuka mode tambah agenda baru untuk tanggal itu
  const handleDateClick = (arg: any) => {
    const dateStr: string = arg.dateStr // "YYYY-MM-DD"

    setSelectedDate(dateStr)
    setEditMode(false)
    setSelectedNoteId(null)
    setInitialTitle('')

    setShowModal(true)
  }

  const handleSubmit = async (event: {title: string; date: string}) => {
    const text = event.title?.trim()
    const date = event.date

    if (!text || !date) return

    if (editMode && selectedNoteId) {
      await updateMut.mutateAsync({id: selectedNoteId, text})
    } else {
      await createMut.mutateAsync({date, text})
    }

    handleCloseModal()
  }

  const handleDelete = async () => {
    if (!selectedNoteId) return
    await deleteMut.mutateAsync(selectedNoteId)
    handleCloseModal()
  }

  useEffect(() => {
    const leftChunk = hostRef.current?.querySelector(
      '.fc .fc-toolbar .fc-toolbar-chunk:first-child'
    )
    if (leftChunk && !leftChunk.querySelector('.roster-title')) {
      const span = document.createElement('span')
      span.className = 'roster-title'
      span.textContent = 'My Online Roster'
      leftChunk.appendChild(span)
    }
  }, [])

  return (
    <div ref={hostRef}>
      <div className='calendar-wrapper'>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          initialDate={new Date()}
          height={500}
          events={events}
          dateClick={handleDateClick}
          headerToolbar={{left: '', center: 'prev title next', right: 'today'}}
          datesSet={(arg) => {
            const d = arg.view.currentStart
            setActiveYear(d.getFullYear())
            setActiveMonth(d.getMonth() + 1)
          }}
          eventClick={(info) => {
            setSelectedNoteId(Number(info.event.id))
            setSelectedDate(info.event.startStr)
            setInitialTitle(info.event.title)
            setEditMode(true)
            setShowModal(true)
          }}
        />

        <AddEventModal
          show={showModal}
          handleClose={handleCloseModal}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          initialDate={selectedDate}
          title={initialTitle}
          editMode={editMode}
        />

        {rosterQuery.isError && (
          <div style={{marginTop: 8}}>
            <small style={{color: 'red'}}>
              {(rosterQuery.error as any)?.message ?? 'Failed to load roster'}
            </small>
          </div>
        )}
      </div>
    </div>
  )
}

export default RosterTab
