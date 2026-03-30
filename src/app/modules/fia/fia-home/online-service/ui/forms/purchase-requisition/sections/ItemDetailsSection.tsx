import React from 'react'
import { ItemDetail } from '../../../../core/purchase-requisition'
import FormSection from '../../common/components/FormSection'

type ItemDetailsSectionProps = {
  values: ItemDetail[]
  setFieldValue: (field: string, value: any) => void
  onUpdateEstimatedTotal: (total: string) => void
}

export default function ItemDetailsSection({
  values,
  setFieldValue,
  onUpdateEstimatedTotal,
}: ItemDetailsSectionProps) {
  // Fallback untuk values jika undefined atau empty
  const safeValues = values || []
  
  const updateItem = (index: number, field: keyof ItemDetail, value: any) => {
    const newItems = [...safeValues]
    newItems[index] = { ...newItems[index], [field]: value }
    
    // Auto-calculate total price
    if (field === 'quantity' || field === 'unit_price') {
      const quantity = parseFloat(field === 'quantity' ? value : newItems[index].quantity) || 0
      const unitPrice = parseFloat(field === 'unit_price' ? value : newItems[index].unit_price) || 0
      newItems[index].totalPrice = (quantity * unitPrice).toFixed(2)
    }
    
    // Calculate estimated total cost
    const total = newItems.reduce((sum, item) => {
      return sum + (parseFloat(item.totalPrice) || 0)
    }, 0)
    onUpdateEstimatedTotal(total.toFixed(2))
    
    setFieldValue('itemDetails', newItems)
  }

  const addItem = () => {
    const newItem: ItemDetail = {
      id: Date.now().toString(),
      no: safeValues.length + 1,
      stockcode: '',
      stock_description: '',
      item_type: '',
      quantity: '',
      unit_price: '',
      totalPrice: '',
    }
    setFieldValue('itemDetails', [...safeValues, newItem])
  }

  const removeItem = (index: number) => {
    const newItems = safeValues.filter((_, i) => i !== index)
    // Re-index all items
    newItems.forEach((item, i) => {
      item.no = i + 1
    })
    
    // Recalculate estimated total cost
    const total = newItems.reduce((sum, item) => {
      return sum + (parseFloat(item.totalPrice) || 0)
    }, 0)
    onUpdateEstimatedTotal(total.toFixed(2))
    
    setFieldValue('itemDetails', newItems)
  }
  
  // Jika tidak ada item, tambahkan satu default
  if (safeValues.length === 0) {
    const defaultItem: ItemDetail = {
      id: '1',
      no: 1,
      stockcode: '',
      stock_description: '',
      item_type: '',
      quantity: '',
      unit_price: '',
      totalPrice: '',
    }
    setFieldValue('itemDetails', [defaultItem])
    return null // Return null untuk prevent render sebelum state update
  }

  return (
    <FormSection title='Item Details'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <div></div>
        <button 
          type='button' 
          className='btn btn-primary btn-sm' 
          onClick={addItem}
          style={{ fontSize: '1.2rem', padding: '0.25rem 0.5rem', lineHeight: '1' }}
        >
          +
        </button>
      </div>
      
      <div className='table-responsive'>
        <table className='table table-bordered item-details-table'>
          <thead>
            <tr>
              <th>Item Stockcode</th>
              <th>Stock Description</th>
              <th>Item Type [Goods/Service]</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {safeValues.map((item, index) => (
              <tr key={item.id}>
                <td>
                  <input 
                    type='text' 
                    className='form-control form-control-sm' 
                    value={item.stockcode} 
                    onChange={(e) => updateItem(index, 'stockcode', e.target.value)} 
                    placeholder='stockcode'
                  />
                </td>
                <td>
                  <input 
                    type='text' 
                    className='form-control form-control-sm' 
                    value={item.stock_description} 
                    onChange={(e) => updateItem(index, 'stock_description', e.target.value)} 
                    placeholder='stock_description'
                  />
                </td>
                <td>
                  <select 
                    className='form-control form-control-sm' 
                    value={item.item_type || ''} 
                    onChange={(e) => updateItem(index, 'item_type', e.target.value)}
                  >
                    <option value=''>Select...</option>
                    <option value='Goods'>Goods</option>
                    <option value='Service'>Service</option>
                  </select>
                </td>
                <td>
                  <input 
                    type='number' 
                    className='form-control form-control-sm' 
                    value={item.quantity} 
                    onChange={(e) => updateItem(index, 'quantity', e.target.value)} 
                    step='1'
                    min='0'
                    placeholder='quantity'
                  />
                </td>
                <td>
                  <input 
                    type='number' 
                    className='form-control form-control-sm' 
                    value={item.unit_price} 
                    onChange={(e) => updateItem(index, 'unit_price', e.target.value)} 
                    step='0.000000001'
                    min='0'
                    placeholder='unit_price'
                  />
                </td>
                <td>
                  <input 
                    type='text' 
                    className='form-control form-control-sm' 
                    value={item.totalPrice} 
                    readOnly 
                    placeholder='total_cost'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </FormSection>
  )
}

