const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '')

const getBrowserOrigin = () => {
  if (typeof window === 'undefined' || !window.location?.origin) {
    return ''
  }

  return trimTrailingSlash(window.location.origin)
}

const envApiBase = trimTrailingSlash(process.env.REACT_APP_API_BASE_URL?.trim() || '')
const envServerBase = envApiBase ? envApiBase.replace(/\/api$/, '') : ''
const browserOrigin = getBrowserOrigin()
const fallbackServerBase = 'http://127.0.0.1:3000'

export const fullUrlServer = envServerBase || browserOrigin || fallbackServerBase
export const apiBaseUrl = envApiBase || `${fullUrlServer}/api`
export const urlServer = fullUrlServer.replace(/^https?:\/\//, '')
export const urlSocketIo = fullUrlServer
