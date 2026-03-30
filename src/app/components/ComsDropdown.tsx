import { Fragment } from 'react';
import type { ComData } from '../types/comData';

interface ComsDropdownProps {
  label?: string;
  Coms: ComData[];
}

const ComsDropdown = ({ label, Coms }: ComsDropdownProps) => {
  return (
  <Fragment>
     <option value=''>{label || `${Coms?.length > 0 ? 'Select Item' : 'Item is not available'}`}</option>
         {
            Coms?.map((items: ComData, i:number) => items.status && (
              <option key={i} value={items.com_code}>{items.com_code} - {items.com_name}</option>
            ))
          }
  </Fragment>
  )
}

export default ComsDropdown