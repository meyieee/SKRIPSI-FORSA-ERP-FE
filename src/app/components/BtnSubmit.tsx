import {KTSVG} from '../../_metronic'

type Props = {
  isSubmit?: boolean
  pt?: string
}

const BtnSubmit = ({isSubmit, pt}: Props) => {
  return (
    <div className={`d-flex flex-stack pt-${pt ? pt : '15'}`}>
      <div className='mr-2'></div>
      <div>
        <button
          type='submit'
          disabled={isSubmit !== undefined ? isSubmit : false}
          className='btn btn-lg btn-primary me-3'
        >
          <span className='indicator-label'>
            Submit
            <KTSVG path='/media/icons/duotune/arrows/arr064.svg' className='svg-icon-3 ms-2 me-0' />
          </span>
        </button>
      </div>
    </div>
  )
}

export default BtnSubmit
