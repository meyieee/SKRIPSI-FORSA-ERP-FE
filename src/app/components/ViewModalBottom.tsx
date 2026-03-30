import { FC } from 'react'
import { WithChildren } from '../../_metronic'

const ViewModalBottom: FC<WithChildren> = (props) => {
	const {children} = props
	return (
		<div className='flex-row-fluid py-lg-5 px-lg-15'>
			{children}
		</div>
	)
}

export default ViewModalBottom