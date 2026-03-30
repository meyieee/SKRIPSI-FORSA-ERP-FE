import React from 'react'

export type OnlineCategoryKey = 'operation' | 'resource' | 'department' | 'general'

export type OnlineRequestType = {
  key: string
  label: string
  component: React.LazyExoticComponent<React.ComponentType<any>>
}

export type OnlineCategory = {
  key: OnlineCategoryKey
  label: string
  types: OnlineRequestType[]
}

