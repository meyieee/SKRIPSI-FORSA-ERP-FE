import React from 'react'
import {Row, Col, Nav, Tab} from 'react-bootstrap'
import RegisterTab from './register-tab/RegisterTab'
import DetailsTab, {SOHRow as DetailsSOHRow} from './register-tab/DetailsTab'
import SupplierTab from './register-tab/SupplierTab'
import TransactionTab from './register-tab/TransactionTab'
import DocumentsTab from './register-tab/DocumentsTab'

export type StockItem = {
  code: string
  desc: string
  uom: string
  site?: string
  branch?: string
  storage?: string
  bin?: string
}

type SOHRow = {no: number; branch: string; storage?: string; qty: number}

type Props = {
  item?: StockItem | null
  sohAll?: SOHRow[]
  sohGlobal?: SOHRow[]
}

const fmt = (n?: number) =>
  typeof n === 'number' ? n.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '-'

const StockRegisterInfo: React.FC<Props> = ({item, sohAll = [], sohGlobal = []}) => {
  // data diteruskan ke DetailsTab; format helper tetap lokal

  return (
    <div className='mt-5'>
      {/* Header */}
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2 className='fw-bold fs-4 text-dark mb-0 flex-grow-1'>STOCK REGISTER INFO</h2>
        <span className='text-muted'>More Detail…</span>
      </div>

      <div>
        {/* Header card */}
        <div className='border rounded p-4 mb-4'>
          <Row className='g-4'>
            <Col sm={3}>
              <div className='border rounded d-flex align-items-center justify-content-center bg-light' style={{height: 120}}>
                Photo
              </div>
            </Col>
            <Col sm={9}>
              <div className='fw-semibold fs-6 mb-2'>{item?.desc || '-'}</div>
              <div className='text-muted small mb-3'>
                * {item?.code || ''} · {item?.uom || ''}
              </div>
              <Row className='g-3'>
                <Col md={4}>
                  <div className='text-muted small mb-1'>* Branch | Site</div>
                  <div className='fw-semibold'>
                    {item?.branch || '-'} {item?.site ? `| ${item.site}` : ''}
                  </div>
                </Col>
                <Col md={4}>
                  <div className='text-muted small mb-1'>* Storage</div>
                  <div className='fw-semibold'>{item?.storage || '-'}</div>
                </Col>
                <Col md={4}>
                  <div className='text-muted small mb-1'>* Bin Location</div>
                  <div className='fw-semibold'>{item?.bin || '-'}</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        {/* Tabs */}
        <Tab.Container defaultActiveKey='details'>
          <Nav variant='tabs' className='mb-3 border-bottom'>
            <Nav.Item>
              <Nav.Link eventKey='details'>Details</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='register'>Register</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='supplier'>Supplier</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='transaction'>Transaction</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='documents'>Documents</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey='details'>
              <DetailsTab sohAll={sohAll as DetailsSOHRow[]} sohGlobal={sohGlobal as DetailsSOHRow[]} />
            </Tab.Pane>

            <Tab.Pane eventKey='register'>
              <RegisterTab />
            </Tab.Pane>

            <Tab.Pane eventKey='supplier'>
              <SupplierTab />
            </Tab.Pane>

            <Tab.Pane eventKey='transaction'>
              <TransactionTab />
            </Tab.Pane>

            <Tab.Pane eventKey='documents'>
              <DocumentsTab />
            </Tab.Pane>

            {/* You can add other panes here later if needed */}
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  )
}

export default StockRegisterInfo

