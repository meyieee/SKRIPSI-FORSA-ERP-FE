import { OnlineRoster } from '../../core/types'

export interface OnlineRosterContextType {
  roster: OnlineRoster[]
  setRoster: React.Dispatch<React.SetStateAction<OnlineRoster[]>>
  getRosterCount: () => number
}

export type { OnlineRoster }

