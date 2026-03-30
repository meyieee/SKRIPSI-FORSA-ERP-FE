import React, {useMemo, useState} from 'react'
import {AssetRow, getAssetPhotoUrl} from './dummy'

export type AssetGeneralInfoProps = {
  asset: AssetRow
  groupName?: string
  showSearch?: boolean
  onSearch?: (keyword: string) => void
}

const AssetGeneralInfo: React.FC<AssetGeneralInfoProps> = ({
  asset,
  groupName,
  showSearch = true,
  onSearch,
}) => {
  const badge = (asset.model || asset.assetType || 'AS')?.toString()?.trim()?.[0] || 'A'
  const [searchKey, setSearchKey] = useState('')
  const photoUrl = useMemo(() => getAssetPhotoUrl(asset.photo_key), [asset.photo_key])
  const hasPhoto = !!photoUrl && !photoUrl.includes('blank.png')

  const handleSearch = () => {
    if (onSearch) onSearch(searchKey.trim())
  }

  return (
    <div className='card mb-3 mt-3'>
      <div className='d-flex flex-wrap align-items-start p-5'>
        {/* Foto/ikon aset */}
        <div className='d-flex align-items-center'>
          <div className='overlay-wrapper position-relative'>
            {hasPhoto ? (
              <img
                src={photoUrl}
                alt='asset'
                className='rounded'
                style={{width: 110, height: 140, objectFit: 'cover'}}
              />
            ) : (
              <div
                className='d-flex align-items-center justify-content-center bg-light rounded'
                style={{width: 110, height: 140}}
              >
                <div className='symbol symbol-80px symbol-circle'>
                  <span className='symbol-label bg-primary text-white fw-bold fs-2'>{badge}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Identitas utama  */}
        <div className='flex-grow-1 d-flex flex-column justify-content-center ms-6'>
          <div className='text-dark mb-7'>
            <h2 className='fw-bold mb-1'>
              {asset.model || 'Unknown Model'}
              {asset.assetNo ? ` - ${asset.assetNo}` : ''}
            </h2>
            <div className='d-flex ms-2'>
              <p className='text-gray-700 me-10'>{groupName || asset.assetType || '-'}</p>
            </div>
          </div>

          {/* Info bawah: Manufacturer, Model, Serial No. */}
          <div className='d-flex flex-wrap'>
            <div className='me-20'>
              <p className='fw-bold'>Manufacturer</p>
              <p className='text-gray-700 ms-2'>{asset.manufacturer || '-'}</p>
            </div>
            <div className='me-20'>
              <p className='fw-bold'>Model</p>
              <p className='text-gray-700 ms-2'>{asset.model || '-'}</p>
            </div>
            <div>
              <p className='fw-bold text-nowrap'>Serial No.</p>
              <p className='text-gray-700 ms-2'>{asset.serialNo || '-'}</p>
            </div>
          </div>
        </div>

        {showSearch && (
          <div
            className='ms-auto align-self-start text-end w-150 w-lg-auto'
            style={{minWidth: 318}}
          >
            <div className='input-group input-group-sm'>
              <input
                type='text'
                className='form-control'
                placeholder='Search by Asset No / Model / Serial No'
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button className='btn btn-sm btn-light-primary' onClick={handleSearch}>
                Change
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AssetGeneralInfo
