// yes or no modal

import { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type Props = {
  action: Function;
  buttonLabel: React.ReactNode;
  buttonTitle: string;
  className?: string;
  modalTitle?: string;
};

const ConfirmModalType1 = ({ action, buttonLabel, buttonTitle, className, modalTitle }: Props) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = () => {
    setIsLoading(true); 
    action()
    .then(()=>{
        setIsLoading(false); 
        handleClose()
    });
  };

  return (
    <Fragment>
      <button
        type="button"
        title={buttonTitle}
        onClick={handleShow}
        className={className || "btn btn-primary me-2"}
      >
        {buttonLabel}
      </button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle || 'Are you sure?'}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" disabled={isLoading} onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" disabled={isLoading}  onClick={handleConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ConfirmModalType1;
