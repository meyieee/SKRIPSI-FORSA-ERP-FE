import {Company} from '../core/types'

export const MOCK_COMPANIES: Company[] = [
  { id: '10001-001', code: '10001-001', name: 'PT Automation Based Resource - HO', type: 'Head Office', uom: 'EA',
    stats: {soh: 10, reserve: 1, available: 9, onOrder: 10, inTransit: 0, combineStock: 0, targetLevel: 20, reorder: 10},
    addresses: { billTo: {to:'Office', fullAddress:'Jl. Walanda Maramis No 7A', attention:'Finance', phone:'021-123-456-789'}, shipTo:{to:'Admin Room', fullAddress:'Jl. Walanda Maramis No 7A', attention:'Admin', phone:'0811-495-299'} }
  },
  { id: '10001-002', code: '10001-002', name: 'PT Abase Branch - Site Manado', type: 'Branch', uom: 'EA',
    stats: {soh: 5, available: 5, onOrder: 5, inTransit: 2, targetLevel: 7, reorder: 5} },
  { id: '10001-003', code: '10001-003', name: 'PT Abase Branch - Site Balikpapan', type: 'Branch', uom: 'EA',
    stats: {soh: 3, available: 3, onOrder: 3, inTransit: 1, targetLevel: 4, reorder: 5} },
  { id: '30001-001', code: '30001-001', name: 'PT Supplier Equipment Machinery', type: 'Supplier', uom: 'EA',
    stats: {soh: 30, reserve: 3, available: 27, onOrder: 0, inTransit: 1, combineStock: 31, targetLevel: 40} },
  { id: '30001-002', code: '30001-002', name: 'PT Sarana Prasarana', type: 'Supplier', uom: 'EA',
    stats: {soh: 10, available: 10, onOrder: 10, inTransit: 2, combineStock: 12, targetLevel: 15} },
  { id: '40001-001', code: '40001-001', name: 'PT Contractor Equipment Berat', type: 'Contractor', uom: 'BOX',
    stats: {soh: 10, available: 10, onOrder: 2, inTransit: 1, combineStock: 13, targetLevel: 20, reorder: 2} },
]



