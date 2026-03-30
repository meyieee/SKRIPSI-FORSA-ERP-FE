import { fullUrlServer, toAbsoluteUrl } from "../../_metronic"

type Props = {
	photo: any
	status: boolean
}

const ViewModalProfile = ({photo, status}: Props) => {
	return (
		<div className='me-7'>
			<div className='symbol symbol-150px'>
			{ (photo)
				? <img alt='uploaded profile'  src={`${fullUrlServer}/${photo}`} />
				: <img alt='blank profile' src={toAbsoluteUrl('/media/avatars/blank.png')} />
			}
			{ (status)
				? <div className='position-absolute translate-middle bottom-0 start-100 mb-0 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
				: <div className='position-absolute translate-middle bottom-0 start-100 mb-0 bg-danger rounded-circle border border-4 border-white h-20px w-20px'></div>
			}
			</div>
		</div>
	)
}

export default ViewModalProfile