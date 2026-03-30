import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap'
import type {TasksRow} from '../types'
import {useTasksContext} from '../TasksContext'
import {searchAssignees, AssigneeItem} from '../../../core/tasks/_requests'
import {fullUrlServer} from '../../../../../../../functions' // sesuaikan path
import {useAuth} from '../../../../../../auth'

interface CreateETaskModalProps {
  show: boolean
  onHide: () => void
  selectedItems?: TasksRow[]
}

const cleanLabel = (s?: string) => {
  const x = String(s ?? '')
    .replace(/\s*-\s*/g, ' ') // ganti " - " atau "-" jadi spasi
    .replace(/\s+/g, ' ') // rapikan spasi ganda
    .trim()

  return x
}

const CreateETaskModal: React.FC<CreateETaskModalProps> = ({show, onHide, selectedItems = []}) => {
  const {createTask} = useTasksContext()
  const {currentUser, auth} = useAuth()

  const seed = useMemo(() => selectedItems?.[0] ?? ({} as Partial<TasksRow>), [selectedItems])

  // ✅ state search assignee
  const [assigneeQuery, setAssigneeQuery] = useState('')
  const [assigneeId, setAssigneeId] = useState<string>('') // id_number yang disimpan ke DB
  const [assigneeName, setAssigneeName] = useState<string>('') // nama yang disimpan ke DB
  const [assigneeOptions, setAssigneeOptions] = useState<AssigneeItem[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const blurTimerRef = useRef<number | null>(null)

  // task owner picker
  const [ownerQuery, setOwnerQuery] = useState('')
  const [ownerName, setOwnerName] = useState<string>('')
  const [ownerOptions, setOwnerOptions] = useState<AssigneeItem[]>([])
  const [showOwnerDropdown, setShowOwnerDropdown] = useState(false)
  const [isOwnerSearching, setIsOwnerSearching] = useState(false)
  const ownerBlurTimerRef = useRef<number | null>(null)

  // ✅ tambahan helper (POST DATE default)
  const todayYMD = () => new Date().toISOString().slice(0, 10)

  // ✅ tambahan helper (TASK OWNER dari user login)
  const getLoginName = () => {
    const first =
      currentUser?.first_name ||
      auth?.user?.first_name ||
      (auth?.user as any)?.['employees.first_name'] ||
      ''
    const last =
      currentUser?.last_name ||
      auth?.user?.last_name ||
      (auth?.user as any)?.['employees.last_name'] ||
      ''

    const full = [first, last].filter(Boolean).join(' ').trim()
    if (full) return full

    return ''
  }

  const getLoginIdNumber = () => {
    return (
      currentUser?.id_number ||
      auth?.user?.id_number ||
      (auth?.user as any)?.['employees.id_number'] ||
      ''
    )
  }

  const [form, setForm] = useState({
    // NO: biarkan auto dari backend
    subject: seed.taks_subject || '',
    taskDateTime: '',
    dueDateTime: '',
    priority: '',
    status: 'Outstanding', // ✅ default Outstanding
    shortDesc: seed.short_description || '',
    postDate: '', // ✅ akan diisi saat modal dibuka
    taskOwner: '', // ✅ akan diisi user login
    completedDateTime: '', // ✅ tetap ada state tapi tidak dipakai/dikirim
  })

  // ✅ tambahan: saat modal dibuka, set Post Date hari ini + Task Owner user login + Status Outstanding
  useEffect(() => {
    if (!show) return
    const loginName = getLoginName()
    setForm((prev) => ({
      ...prev,
      status: 'Outstanding',
      postDate: todayYMD(),
      taskOwner: loginName,
      completedDateTime: '', // kosongkan
    }))
    setOwnerQuery(loginName)
    setOwnerName(loginName)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  useEffect(() => {
    if (!show) return
    const idNumber = getLoginIdNumber()
    if (!idNumber) return

    ;(async () => {
      try {
        const rows = await searchAssignees(idNumber)
        if (!rows.length) return
        const p = rows[0]
        const cleanName = cleanLabel(p.full_name)
        setOwnerQuery(cleanName)
        setOwnerName(cleanName)
        setForm((prev) => ({...prev, taskOwner: cleanName}))
      } catch {
        // ignore autofill failure
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  // debounce search
  useEffect(() => {
    if (!show) return
    if (!assigneeQuery.trim()) {
      setAssigneeOptions([])
      return
    }

    const t = window.setTimeout(async () => {
      try {
        setIsSearching(true)
        const rows = await searchAssignees(assigneeQuery.trim(), {lowerThanLogin: true})
        setAssigneeOptions(rows)
        setShowDropdown(true)
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => window.clearTimeout(t)
  }, [assigneeQuery, show])

  useEffect(() => {
    if (!show) return
    if (!ownerQuery.trim()) {
      setOwnerOptions([])
      return
    }

    const t = window.setTimeout(async () => {
      try {
        setIsOwnerSearching(true)
        const rows = await searchAssignees(ownerQuery.trim())
        setOwnerOptions(rows)
        setShowOwnerDropdown(true)
      } finally {
        setIsOwnerSearching(false)
      }
    }, 300)

    return () => window.clearTimeout(t)
  }, [ownerQuery, show])

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((s) => ({...s, [key]: e.target.value}))

  const pickAssignee = (p: AssigneeItem) => {
    const cleanName = cleanLabel(p.full_name)

    setAssigneeId(p.id_number)
    setAssigneeName(cleanName)
    setAssigneeQuery(cleanName)
    setShowDropdown(false)
  }

  const pickOwner = (p: AssigneeItem) => {
    const cleanName = cleanLabel(p.full_name)

    setOwnerName(cleanName)
    setOwnerQuery(cleanName)
    setForm((prev) => ({...prev, taskOwner: cleanName}))
    setShowOwnerDropdown(false)
  }

  const handleSubmit = async () => {
    if (!assigneeId) {
      alert('Please choose Assigned To from the list.')
      return
    }
    if (
      !form.subject ||
      !form.taskDateTime ||
      !form.dueDateTime ||
      !form.priority
      // ✅ status tidak perlu dicek lagi karena default Outstanding
    ) {
      alert('Please fill in all required fields.')
      return
    }

    await createTask({
      assignedToId: assigneeId,
      assignedToName: assigneeName || assigneeQuery,
      subject: form.subject,
      shortDescription: form.shortDesc,
      tasksDateTime: form.taskDateTime,
      dueDateTime: form.dueDateTime,
      priority: form.priority as any,

      // ✅ fix sesuai logic kamu
      status: 'Outstanding' as any,
      postDate: form.postDate || undefined,
      taskOwner: ownerName || ownerQuery || form.taskOwner || undefined,

      // ✅ jangan kirim completedDateTime
      // completeDateTime: ...
    })

    // reset
    setAssigneeQuery('')
    setAssigneeId('')
    setAssigneeName('')
    setAssigneeOptions([])
    setShowDropdown(false)
    setOwnerQuery('')
    setOwnerName('')
    setOwnerOptions([])
    setShowOwnerDropdown(false)
    setForm({
      subject: '',
      taskDateTime: '',
      dueDateTime: '',
      priority: '',
      status: 'Outstanding',
      shortDesc: '',
      postDate: todayYMD(), // ✅ default hari ini
      taskOwner: getLoginName(), // ✅ default user login
      completedDateTime: '',
    })

    onHide()
  }

  const isFormValid =
    !!assigneeId && form.subject && form.taskDateTime && form.dueDateTime && form.priority
  // ✅ status selalu valid

  return (
    <Modal show={show} onHide={onHide} centered size='lg'>
      <div
        style={{
          background: 'var(--bs-body-color)',
          color: 'var(--bs-body-bg)',
          padding: '10px 16px',
          fontWeight: 600,
          letterSpacing: 1,
          textAlign: 'center',
          borderRadius: 7,
        }}
      >
        CREATE E-TASKS
      </div>

      <div
        style={{
          background: 'var(--bs-secondary-bg)',
          padding: 12,
          borderBottom: `1px solid var(--bs-border-color)`,
        }}
      >
        <Row className='g-2 align-items-center'>
          <Col md={8} style={{position: 'relative'}}>
            <div className='d-flex align-items-center'>
              <div style={{minWidth: 110, fontWeight: 500}}>Assigned To</div>
              <div className='mx-2'>:</div>

              <Form.Control
                size='sm'
                value={cleanLabel(assigneeQuery)}
                onChange={(e) => {
                  setAssigneeQuery(cleanLabel(e.target.value))
                  setAssigneeId('')
                  setAssigneeName('')
                }}
                placeholder='Type a name or ID'
                onFocus={() => {
                  if (assigneeOptions.length) setShowDropdown(true)
                }}
                onBlur={() => {
                  // delay supaya click di dropdown tidak ketutup duluan
                  blurTimerRef.current = window.setTimeout(() => setShowDropdown(false), 150)
                }}
              />
            </div>

            {/* ✅ dropdown autocomplete */}
            {showDropdown && (isSearching || assigneeOptions.length > 0) && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 130,
                  right: 0,
                  zIndex: 9999,
                  background: 'var(--bs-body-bg)',
                  border: '1px solid var(--bs-border-color)',
                  borderRadius: 6,
                  marginTop: 6,
                  maxHeight: 220,
                  overflowY: 'auto',
                }}
                onMouseDown={(e) => {
                  e.preventDefault()
                  if (blurTimerRef.current) window.clearTimeout(blurTimerRef.current)
                }}
              >
                {isSearching && (
                  <div style={{padding: 10, fontSize: 13, opacity: 0.8}}>Searching...</div>
                )}

                {!isSearching &&
                  assigneeOptions.map((p) => (
                    <div
                      key={p.id_number}
                      style={{padding: '10px 12px', cursor: 'pointer', display: 'flex', gap: 10}}
                      onMouseDown={(e) => {
                        e.preventDefault() // ✅ penting: cegah blur/click ketutup
                        pickAssignee(p)
                      }}
                    >
                      <img
                        src={
                          p.photo
                            ? `${fullUrlServer}/${p.photo}`
                            : `${fullUrlServer}/media/avatars/blank.png`
                        }
                        alt=''
                        width={28}
                        height={28}
                        style={{borderRadius: '50%', objectFit: 'cover'}}
                      />
                      <div style={{lineHeight: 1.2}}>
                        <div style={{fontWeight: 600}}>{cleanLabel(p.full_name)}</div>
                        <div style={{fontSize: 12, opacity: 0.75}}>
                          {p.id_number} {p.email ? `• ${p.email}` : ''}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </Col>

          <Col md={4}>
            <div className='d-flex justify-content-end align-items-center w-100'>
              <div className='me-2' style={{fontWeight: 500}}>
                NO
              </div>
              <div className='mx-2'>:</div>
              <Form.Control size='sm' value='(auto)' disabled />
            </div>
          </Col>
        </Row>
      </div>

      <Modal.Body style={{background: 'var(--bs-body-bg)'}}>
        <Form>
          <Row className='mb-3'>
            <Col md={2} className='d-flex align-items-center fw-semibold'>
              Subject
            </Col>
            <Col md={10}>
              <Form.Control
                value={form.subject}
                onChange={update('subject')}
                placeholder='Write the subject'
              />
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col md={2} className='d-flex align-items-center fw-semibold'>
              Tasks DateTime
            </Col>
            <Col md={4}>
              <Form.Control
                type='datetime-local'
                value={form.taskDateTime}
                onChange={update('taskDateTime')}
              />
            </Col>
            <Col md={2} className='d-flex align-items-center fw-semibold'>
              Due DateTime
            </Col>
            <Col md={4}>
              <Form.Control
                type='datetime-local'
                value={form.dueDateTime}
                onChange={update('dueDateTime')}
              />
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col md={2} className='d-flex align-items-center fw-semibold'>
              Priority
            </Col>
            <Col md={4}>
              <Form.Select value={form.priority} onChange={update('priority')}>
                <option value=''>Select priority</option>
                <option value='P#1'>P#1</option>
                <option value='P#2'>P#2</option>
                <option value='P#3'>P#3</option>
              </Form.Select>
            </Col>

            {/* ✅ tambahan: Status tidak bisa diubah, default Outstanding */}
            <Col md={2} className='d-flex align-items-center fw-semibold'>
              Status
            </Col>
            <Col md={4}>
              <Form.Control value='Outstanding' disabled />
            </Col>
          </Row>

          <Row className='mb-4'>
            <Col md={2} className='d-flex align-items-start fw-semibold'>
              Short Description
            </Col>
            <Col md={10}>
              <Form.Control
                as='textarea'
                rows={6}
                value={form.shortDesc}
                onChange={update('shortDesc')}
              />
            </Col>
          </Row>

          <div
            style={{
              background: 'var(--bs-secondary-bg)',
              padding: 12,
              border: `1px solid var(--bs-border-color)`,
              borderRadius: 6,
            }}
          >
            <Row className='g-3 align-items-center'>
              {/* ✅ Post Date auto today, tidak editable */}
              <Col md={6}>
                <div className='mb-1 fw-semibold'>Post Date</div>
                <Form.Control type='date' value={form.postDate} disabled />
              </Col>

              {/* ✅ Task Owner auto user login, tidak editable */}
              <Col md={6}>
                <div className='mb-1 fw-semibold'>Task Owner</div>
                <div style={{position: 'relative'}}>
                  <Form.Control
                    value={cleanLabel(ownerQuery)}
                    onChange={(e) => {
                      setOwnerQuery(cleanLabel(e.target.value))
                      setOwnerName('')
                    }}
                    placeholder='Type a name or ID'
                    onFocus={() => {
                      if (ownerOptions.length) setShowOwnerDropdown(true)
                    }}
                    onBlur={() => {
                      ownerBlurTimerRef.current = window.setTimeout(
                        () => setShowOwnerDropdown(false),
                        150
                      )
                    }}
                  />

                  {showOwnerDropdown && (isOwnerSearching || ownerOptions.length > 0) && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        zIndex: 9999,
                        background: 'var(--bs-body-bg)',
                        border: '1px solid var(--bs-border-color)',
                        borderRadius: 6,
                        marginTop: 6,
                        maxHeight: 220,
                        overflowY: 'auto',
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        if (ownerBlurTimerRef.current)
                          window.clearTimeout(ownerBlurTimerRef.current)
                      }}
                    >
                      {isOwnerSearching && (
                        <div style={{padding: 10, fontSize: 13, opacity: 0.8}}>
                          Searching...
                        </div>
                      )}

                      {!isOwnerSearching &&
                        ownerOptions.map((p) => (
                          <div
                            key={p.id_number}
                            style={{
                              padding: '10px 12px',
                              cursor: 'pointer',
                              display: 'flex',
                              gap: 10,
                            }}
                            onMouseDown={(e) => {
                              e.preventDefault()
                              pickOwner(p)
                            }}
                          >
                            <img
                              src={
                                p.photo
                                  ? `${fullUrlServer}/${p.photo}`
                                  : `${fullUrlServer}/media/avatars/blank.png`
                              }
                              alt=''
                              width={28}
                              height={28}
                              style={{borderRadius: '50%', objectFit: 'cover'}}
                            />
                            <div style={{lineHeight: 1.2}}>
                              <div style={{fontWeight: 600}}>
                                {cleanLabel(p.full_name)}
                              </div>
                              <div style={{fontSize: 12, opacity: 0.75}}>
                                {p.id_number} {p.email ? ` | ${p.email}` : ''}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </Col>

              {/* ✅ Completed DateTime dihapus dari UI */}
            </Row>
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer className='justify-content-end'>
        <Button variant='danger' onClick={onHide}>
          Cancel
        </Button>
        <Button variant='primary' onClick={handleSubmit} disabled={!isFormValid}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateETaskModal
