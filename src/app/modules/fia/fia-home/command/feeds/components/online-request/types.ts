import { OnlineRequest } from '../../core/types'

export interface OnlineRequestContextType {
  requests: OnlineRequest[]
  setRequests: React.Dispatch<React.SetStateAction<OnlineRequest[]>>
  getRequestsCount: () => number
}

export type { OnlineRequest }

