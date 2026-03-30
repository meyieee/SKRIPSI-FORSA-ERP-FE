import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { KTSVG } from "../../_metronic";

type Props = {
  action: Function
  textButton?: string | any
  className?: string
}

const DeleteAlert = ({ action, textButton, className }: Props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAlert = () => action().then(handleClose);

  return (
    <>
      <button type="button" onClick={handleShow} className={className ? className : 'btn btn-link btn-sm btn-color-gray-500 btn-active-color-danger'}>
        {textButton ? textButton : <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />}
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete item?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleAlert}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteAlert;
