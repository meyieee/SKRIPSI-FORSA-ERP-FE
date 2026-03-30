type Props = {
	title: string | any
	body: string | any
}

const ViewModalBottomText = ({title, body}: Props) => {
	return (
		<div className='row mb-7'>
			<label className='col-lg-4 fw-bold text-muted'>{title}</label>

			<div className='col-lg-8 fv-row'>
				<span className='fw-bold fs-6'>{body}</span>
			</div>
		</div>
	)
}

export default ViewModalBottomText