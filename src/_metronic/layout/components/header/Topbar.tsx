import {FC, useEffect, useState} from 'react'
import clsx from 'clsx'
import {fullUrlServer, KTSVG, toAbsoluteUrl} from '../../../helpers'
import {HeaderUserMenu, ThemeModeSwitcher} from '../../../partials'
import {useLayout} from '../../core'
import {useAuth} from '../../../../app/modules/auth/core/Auth'
import {
  fetchPersonalInfo,
  toServerFileUrl,
} from '../../../../app/modules/fia/fia-resource/personal-info/core/_requests'
// import CompanySizeContext from './CompanySizeContext'

const defaultAvatarUrl = toAbsoluteUrl('/media/svg/avatars/blank.svg')

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'

// -------- NOTE: ---------
// DO NOT DELETE THE COMMENTS

const Topbar: FC = () => {
  // const { updateCompanySize } = useContext(CompanySizeContext);
  const {config} = useLayout()
  const {currentUser} = useAuth()
  const [avatarUrl, setAvatarUrl] = useState<string>(defaultAvatarUrl)

  useEffect(() => {
    let isMounted = true

    const directPhoto = String(currentUser?.['employees.photo'] || '').trim()
    if (directPhoto) {
      setAvatarUrl(`${fullUrlServer}/${directPhoto.replace(/^\/+/, '')}`)
      return () => {
        isMounted = false
      }
    }

    const idNumber = String(currentUser?.id_number || '').trim()
    if (!idNumber) {
      setAvatarUrl(defaultAvatarUrl)
      return () => {
        isMounted = false
      }
    }

    ;(async () => {
      try {
        const payload = await fetchPersonalInfo(idNumber)
        const photoUrl = toServerFileUrl(payload?.header?.photo || '')
        if (isMounted) {
          setAvatarUrl(photoUrl || defaultAvatarUrl)
        }
      } catch {
        if (isMounted) {
          setAvatarUrl(defaultAvatarUrl)
        }
      }
    })()

    return () => {
      isMounted = false
    }
  }, [currentUser])

  // function onFilterValueSelected(e: any) {
  //   return updateCompanySize(e.target.value)
  // }

  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      {/* begin::Filter Button */}
      {/* <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        <select
          name='status'
          data-control='select2'
          data-hide-search='true'
          className='form-select form-select-solid form-select-sm w-125px me-3'
          defaultValue='active'
          onChange={onFilterValueSelected}
        >
          <option value='big'>ERP (Default)</option>
          <option value='medium'>Medium Company</option>
          <option value='small'>Small Company</option>
        </select>
      </div> */}
      {/* end::Filter Button */}

      {/* begin::Theme mode */}
      <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        <ThemeModeSwitcher
          toggleBtnClass={clsx('btn-active-light-primary btn-custom', toolbarButtonHeightClass)}
        />
      </div>
      {/* end::Theme mode */}

      {/* begin::User */}
      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        id='kt_header_user_menu_toggle'
      >
        {/* begin::Toggle */}
        <div
          className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <img
            src={avatarUrl}
            alt='Profile'
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = defaultAvatarUrl
            }}
          />
        </div>
        <HeaderUserMenu avatarUrl={avatarUrl} />
        {/* end::Toggle */}
      </div>
      {/* end::User */}

      {/* begin::Aside Toggler */}
      {config.header.left === 'menu' && (
        <div className='d-flex align-items-center d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_header_menu_mobile_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
          </div>
        </div>
      )}
    </div>
  )
}

export {Topbar}
