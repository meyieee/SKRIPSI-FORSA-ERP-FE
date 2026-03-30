import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { KTSVG } from "../../_metronic";

type Props = {
  action: Function
  textButton?: string | any
  className?: string
  isSubmit?: boolean
  title?: string
}

const ConfirmModalOriginal = ({ action, textButton, className, isSubmit, title }: Props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAlert = () => action().then(handleClose);

  return (
    <>
      <button type="button" title={title} onClick={handleShow} className={className ? className : 'btn btn-link btn-sm btn-color-gray-500 btn-active-color-danger'}>
        {textButton ? textButton : <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />}
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" disabled={isSubmit} onClick={handleAlert}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmModalOriginal;
