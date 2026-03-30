import React from 'react'
import {NavLink} from 'react-router-dom'
import '../components/styles/resourcemidtabstyles.scss'

type Tile = {
  to: string
  title: string
  sub?: string
  span?: number // berapa kolom yang akan di-span
}

type Cols = {
  sm?: number
  md?: number
  lg?: number
}

type MidTabProps = {
  tiles: Tile[]
  className?: string
  cols?: Cols // jumlah kolom per breakpoint
}

export const MiddleTab: React.FC<MidTabProps> = ({tiles, className = '', cols}) => {
  const style: React.CSSProperties = {
    // isi CSS variables hanya kalau diberikan
    ...(cols?.sm ? ({['--nav-cols-sm' as any]: cols.sm} as React.CSSProperties) : {}),
    ...(cols?.md ? ({['--nav-cols-md' as any]: cols.md} as React.CSSProperties) : {}),
    ...(cols?.lg ? ({['--nav-cols-lg' as any]: cols.lg} as React.CSSProperties) : {}),
  }

  return (
    <div className={`position-relative ${className}`}>
      <div className='midtab-grid rounded-2 shadow-sm' style={style}>
        {tiles.map((t) => {
          const tileStyle: React.CSSProperties = t.span
            ? ({['--tile-span' as any]: t.span} as React.CSSProperties)
            : {}

          return (
            <NavLink
              key={t.to}
              to={t.to}
              className={({isActive}) => `midtab-tile ${isActive ? 'active' : ''}`}
              style={tileStyle}
              {...(t.span ? {'data-span': true} : {})}
            >
              <div className='midtab-title'>{t.title}</div>
              {t.sub && <div className='midtab-sub'>({t.sub})</div>}
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
