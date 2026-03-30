import { FC } from 'react'
import '../style/HeaderCommand.scss'

type FunctionButtonProps = {
  items: Array<{
    id: string
    label: string
    onClick?: () => void
  }>
  className?: string
}

const FunctionButton: FC<FunctionButtonProps> = ({ items, className }) => {
  return (
    <div className={`function-list ${className ?? ''}`}>
      <ul className='list-unstyled mb-0'>
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className="function-button"
            onClick={item.onClick}
          >
            {item.label}
          </button>
        ))}
      </ul>
    </div>
  )
}

export default FunctionButton
