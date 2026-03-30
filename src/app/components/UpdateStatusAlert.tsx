import { Fragment, useContext, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ID, KTSVG } from '../../_metronic';
import { AlertMessengerContext } from './index';
import { useAuth } from '../modules/auth';

export type UpdateStatusProps = {
  action: any
  status: boolean | number | undefined
  id: ID
  className?: string
  textButton?: string | any
  branch_code?: string | null | undefined
  comType?: string
  noRemarks?: boolean
}

const UpdateStatusAlert =({action, status, id, className, textButton, branch_code, comType, noRemarks}: UpdateStatusProps) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {currentUser} = useAuth()
  const { addSuccessMessage, addErrorMessage } = useContext(AlertMessengerContext);

  function onSuccess(msg: string) {
    const time = new Date().toLocaleString();
    addSuccessMessage({
      title: `Success!`,
      message: `${msg} - time: ${time}`,
    });
  }

  function onError(msg: string) {
    const time = new Date().toLocaleString();
    addErrorMessage({
      title: 'Error!',
      message: `${msg} - time: ${time}`,
    });
  }

  const remarks = useRef<HTMLTextAreaElement>(null);

  return (
    <Fragment>
      <button
        onClick={handleShow}
        className={className ? className : status ? 'btn btn-sm btn-link btn-color-gray-500 btn-active-color-danger' : 'btn btn-sm btn-link btn-color-gray-500 btn-active-color-success'}
        title={status ? 'Deactivate' : 'Activate'}
      >
        {textButton ? textButton : status
					? <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
					: <KTSVG path='/media/icons/duotune/files/fil011.svg' className='svg-icon-3' />
        }
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to {status ? 'deactivate' : 'activate'} item?</Modal.Title>
        </Modal.Header>
        {!noRemarks &&
        <div className='modal-body'>
					<label className="form-label">Remarks:</label>
					<textarea
						className='form-control'
						id="message"
						name="message"
            ref={remarks}
					/>
        </div>}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>No</Button>
          <Button
            variant="primary"
            onClick={
              (branch_code && comType) 
                ? ()=>action(id, branch_code, status, remarks?.current?.value, currentUser?.id_number, comType, onSuccess, onError).then(() => handleClose())
                : comType
                  ? ()=>action(id, status, remarks?.current?.value, currentUser?.id_number, comType, onSuccess, onError).then(() => handleClose())
                  : ()=>action(id, status, remarks?.current?.value).then(() => handleClose())
            }>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default UpdateStatusAlert
