import {useThemeMode} from '../../../../../../../../_metronic'

type Props = {
  label: string
  subLabel: string
  value: number
  active?: boolean
  color: 'primary'|'success'|'warning'|'info'|'secondary'
  onClick?: () => void
}

export const SummaryStat = ({label, subLabel, value, active, color, onClick}: Props) => {
  const {mode} = useThemeMode()
  const isDark = mode === 'dark'
  const base = active ? `shadow-lg bg-${color} text-white` : `bg-light-${color} text-${color}`
  return (
    <button className={`w-100 px-4 py-6 rounded-2 text-center border-0 ${base} ${isDark ? 'dark-mode-hover-white' : ''}`}
            style={{cursor:'pointer', transition:'all  ' + '0.3s ease'}} onClick={onClick}>
      <div className={`fw-bold fs-2x mb-2 ${active ? 'text-white':'text-' + color}`}>{value}</div>
      <div className={`fw-semibold fs-7 ${active ? 'text-white':'text-' + color}`}>{label}</div>
      <div className={`fs-8 ${active ? 'text-white':'text-muted'}`}>{subLabel}</div>
    </button>
  )
}


