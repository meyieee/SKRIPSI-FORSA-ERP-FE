import { FC } from 'react'
import { Link } from 'react-router-dom'
import { WithChildren } from '../../_metronic'
import  ViewModalProfile  from './ViewModalProfile'

type Props = {
	editRoute: string
	data: any
	titleLeft: string
	titleRight: string
	withPhoto: boolean
}

const ViewModalTop: FC<Props & WithChildren> = (props) => {
	const {editRoute, data, titleLeft, titleRight, withPhoto, children} = props

	return (
		<div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
			{withPhoto ? <ViewModalProfile photo={data?.photo} status={data?.status} /> : <></>}
			<div className='flex-grow-1'>
				<div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
					<div className='d-flex flex-column'>
						<div className='d-flex align-items-center mb-2'>
							<span className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
							{titleLeft} - {titleRight}
							</span>
						</div>

						<div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
							{children}
						</div>
					</div>

					<div className='d-flex my-4'>
						<Link
							to={`/control-file/${editRoute}/edit/${data?.id}`}
							state={data}
							className='btn btn-sm btn-primary me-3'
						>
							Edit
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ViewModalTop
