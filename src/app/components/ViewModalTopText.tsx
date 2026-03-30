import { KTSVG } from "../../_metronic"

const ViewModalTopText = ({iconTitle="", iconRoute='general/gen018', text=""}: any) => {
	return (
		<span
			className='d-flex align-items-center text-gray-400 me-5 mb-2'
		>
			<i title={iconTitle} className='text-hover-primary'>
				<KTSVG
					path={`/media/icons/duotune/${iconRoute}.svg`}
					className='svg-icon-4 me-1'
				/>
			</i>
			{text}
		</span>
	)
}

export default ViewModalTopText