import React from 'react'
import {NavLink} from 'react-router-dom'
import '../components/styles/resourcenavtabstyles.scss'

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

type NavTabProps = {
  tiles: Tile[]
  className?: string
  cols?: Cols // jumlah kolom per breakpoint
}

export const NavTab: React.FC<NavTabProps> = ({tiles, className = '', cols}) => {
  const style: React.CSSProperties = {
    // isi CSS variables hanya kalau diberikan
    ...(cols?.sm ? ({['--nav-cols-sm' as any]: cols.sm} as React.CSSProperties) : {}),
    ...(cols?.md ? ({['--nav-cols-md' as any]: cols.md} as React.CSSProperties) : {}),
    ...(cols?.lg ? ({['--nav-cols-lg' as any]: cols.lg} as React.CSSProperties) : {}),
  }

  return (
    <div className={`position-relative ${className}`}>
      <div className='navtab-grid rounded-2 shadow-sm' style={style}>
        {tiles.map((t) => {
          const tileStyle: React.CSSProperties = t.span
            ? ({['--tile-span' as any]: t.span} as React.CSSProperties)
            : {}

          return (
            <NavLink
              key={t.to}
              to={t.to}
              className={({isActive}) => `navtab-tile ${isActive ? 'active' : ''}`}
              style={tileStyle}
              {...(t.span ? {'data-span': true} : {})}
            >
              <div className='navtab-title'>{t.title}</div>
              {t.sub && <div className='navtab-sub'>({t.sub})</div>}
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
