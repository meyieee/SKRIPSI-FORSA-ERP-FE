import { FC } from 'react'
import { Modal } from 'react-bootstrap'
import { createPortal } from 'react-dom'
import { KTSVG, WithChildren } from '../../_metronic'

type Props = {
	title: string
	show: boolean | undefined
	modalSize?: string
	handleClose: (() => void) | undefined
}

const modalsRoot = document.getElementById('root-modals') || document.body

const ViewModal: FC<Props & WithChildren> = (props) => {
	const {title, show, modalSize, handleClose, children} = props

	return createPortal(
		<Modal
			id='kt_modal_create_app'
			tabIndex={-1}
			aria-hidden='true'
			dialogClassName={`modal-dialog modal-dialog-centered mw-${modalSize ? modalSize : '900px'}`}
			show={show}
			onHide={handleClose}
		>
			<div className='modal-header'>
				<h2>{title}</h2>
				<div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
					<KTSVG className='svg-icon-1' path='/media/icons/duotune/arrows/arr061.svg' />
				</div>
			</div>

			<div className='modal-body py-lg-8 px-lg-8'>
				{children}
			</div>
		</Modal>,
		modalsRoot
	)
}

export default ViewModal
