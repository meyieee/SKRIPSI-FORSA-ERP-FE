import React from 'react'
import {NavLink} from 'react-router-dom'
import './styles/navtabstyles.scss'

type Tile = {
  to: string
  title: string
  sub?: string
  span?: number
}

type Cols = {
  sm?: number
  md?: number
  lg?: number
}

type NavTabProps = {
  tiles: Tile[]
  className?: string
  cols?: Cols
  autoStretch?: boolean
}

export const NavTab: React.FC<NavTabProps> = ({
  tiles,
  className = '',
  cols,
  autoStretch = true,
}) => {
  const colsSm = cols?.sm || 2
  const colsMd = cols?.md || 4
  const colsLg = cols?.lg || cols?.md || 4

  const style: React.CSSProperties = {
    ...(cols?.sm ? ({['--nav-cols-sm' as any]: cols.sm} as React.CSSProperties) : {}),
    ...(cols?.md ? ({['--nav-cols-md' as any]: cols.md} as React.CSSProperties) : {}),
    ...(cols?.lg ? ({['--nav-cols-lg' as any]: cols.lg} as React.CSSProperties) : {}),
  }

  // Deteksi breakpoint
  const getActiveColumns = (): number => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1200) return colsLg
      if (window.innerWidth >= 768) return colsMd
    }
    return colsSm
  }

  const [activeColumns, setActiveColumns] = React.useState(getActiveColumns)

  React.useEffect(() => {
    const handleResize = () => setActiveColumns(getActiveColumns())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [colsSm, colsMd, colsLg])

  // Hitung item di baris terakhir
  const remainder = tiles.length % activeColumns
  const hasIncompleteLastRow = remainder !== 0 && autoStretch
  const lastRowStartIndex = hasIncompleteLastRow ? tiles.length - remainder : tiles.length

  const mainTiles = hasIncompleteLastRow ? tiles.slice(0, lastRowStartIndex) : tiles
  const lastRowTiles = hasIncompleteLastRow ? tiles.slice(lastRowStartIndex) : []

  return (
    <div className={`position-relative ${className}`}>
      <div className='dnavtab-grid rounded-2 shadow-sm' style={style}>
        {/* Tiles normal (baris penuh) */}
        {mainTiles.map((t) => {
          const tileStyle: React.CSSProperties = t.span
            ? ({['--tile-span' as any]: t.span} as React.CSSProperties)
            : {}

          return (
            <NavLink
              key={t.to}
              to={t.to}
              className={({isActive}) => `dnavtab-tile ${isActive ? 'active' : ''}`}
              style={tileStyle}
              {...(t.span ? {'data-span': true} : {})}
            >
              <div className='dnavtab-title'>{t.title}</div>
              {t.sub && <div className='dnavtab-sub'>({t.sub})</div>}
            </NavLink>
          )
        })}

        {/* Baris terakhir yang tidak penuh - dalam subgrid */}
        {lastRowTiles.length > 0 && (
          <div
            className='dnavtab-lastrow'
            style={{
              gridColumn: '1 / -1',
              display: 'grid',
              gridTemplateColumns: `repeat(${lastRowTiles.length}, 1fr)`,
              gap: 0,
            }}
          >
            {lastRowTiles.map((t, idx) => {
              const tileStyle: React.CSSProperties = t.span
                ? ({['--tile-span' as any]: t.span} as React.CSSProperties)
                : {}

              return (
                <NavLink
                  key={t.to}
                  to={t.to}
                  className={({isActive}) => `dnavtab-tile ${isActive ? 'active' : ''}`}
                  style={{
                    ...tileStyle,
                    borderRight: idx === lastRowTiles.length - 1 ? 'none' : undefined,
                  }}
                  {...(t.span ? {'data-span': true} : {})}
                >
                  <div className='dnavtab-title'>{t.title}</div>
                  {t.sub && <div className='dnavtab-sub'>({t.sub})</div>}
                </NavLink>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}