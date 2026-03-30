import React from 'react'
import {Row, Col, Nav, Tab} from 'react-bootstrap'
import {KTCard, KTCardBody} from '../../../../../../../../_metronic'
import {Company} from '../core/types'
import DetailsTab from './company-mastery-info/DetailsTab'
import ContactInfoTab from './company-mastery-info/ContactInfoTab'
import DocumentsTab from './company-mastery-info/DocumentsTab'
import ContractAgreementTab from './company-mastery-info/ContractAgreementTab'

type Props = {
  company?: Company | null
}

const CompanyMasteryInfo: React.FC<Props> = ({company}) => {
  if (!company) return null

  return (
    <KTCard className='mt-5'>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>COMPANY MASTERY INFO</span>
        </h3>
        <div className='card-toolbar'>
          <span className='text-muted'>More Detail…</span>
        </div>
      </div>

      <KTCardBody className='py-4'>
        {/* Header card */}
        <div className='border rounded p-4 mb-4'>
          <Row className='g-4'>
            <Col sm={3}>
              <div className='border rounded d-flex align-items-center justify-content-center bg-light' style={{height: 120}}>
                Photo
              </div>
            </Col>
            <Col sm={9}>
              <div className='fw-semibold fs-6 mb-2'>{company.name || '-'}</div>
              <div className='text-muted small mb-3'>
                * Head Quarter Office
              </div>
              <Row className='g-3'>
                <Col md={4}>
                  <div className='text-muted small mb-1'>* Company Type</div>
                  <div className='fw-semibold'>{company.type || '-'}</div>
                </Col>
                <Col md={4}>
                  <div className='text-muted small mb-1'>* Bill To</div>
                  <div className='fw-semibold'>{company.addresses?.billTo?.to || 'Office'}</div>
                </Col>
                <Col md={4}>
                  <div className='text-muted small mb-1'>* Ship To</div>
                  <div className='fw-semibold'>{company.addresses?.shipTo?.to || 'Admin Room'}</div>
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
              <Nav.Link eventKey='contact'>Contact Info</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='documents'>Documents</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='contract'>Contract Agreement</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey='details'>
              <DetailsTab company={company} />
            </Tab.Pane>

            <Tab.Pane eventKey='contact'>
              <ContactInfoTab company={company} />
            </Tab.Pane>

            <Tab.Pane eventKey='documents'>
              <DocumentsTab company={company} />
            </Tab.Pane>

            <Tab.Pane eventKey='contract'>
              <ContractAgreementTab company={company} />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </KTCardBody>
    </KTCard>
  )
}

export default CompanyMasteryInfo

