import React from 'react'
import { OnlineCategoryKey, requestRegistry } from '../registry'
import '../style/fia-online-services.scss'

type Props = {
  active: OnlineCategoryKey
  activeType: string
  onSelect: (key: OnlineCategoryKey, typeKey: string) => void
}

const keys: OnlineCategoryKey[] = ['operation', 'resource', 'department', 'general']

export default function CategoryTabs({ active, activeType, onSelect }: Props) {
  return (
    <div className='online-navbar mb-5'>
      {keys.map((k) => (
        <div key={k} className='online-navbar__block'>
          <div className='online-navbar__header'>
            <span className='online-navbar__title'>{requestRegistry[k].label}</span>
            <span className='online-navbar__more'>More...</span>
          </div>
          <div className='online-navbar__links'>
            {requestRegistry[k].types.map((type) => (
              <a
                key={type.key}
                className={`online-navbar__link ${active === k && activeType === type.key ? 'active' : ''}`}
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  onSelect(k, type.key)
                }}
              >
                <span className='dot'>•</span>
                <span>{type.label}</span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}


