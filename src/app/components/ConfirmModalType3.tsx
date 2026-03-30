//Yes or No With remarks modal

import { Fragment, useContext, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { AlertMessengerContext } from "./alert/AlertContextProvider";
import { useAuth } from "../modules/auth";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

type Props = {
  action: (remarks: string, user_id: string | undefined, onSuccess: (msg: string) => void, onError: (msg: string) => void) => Promise<void>;
  textButton: React.ReactNode;
  buttonTitle?: string;
  className?: string;
  modalTitle?: string;
};

const ConfirmModalType3 = ({action, textButton, buttonTitle, className, modalTitle}: Props) => {
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

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRemarksFilled, setIsRemarksFilled] = useState(false);
  const remarksRef = useRef<HTMLTextAreaElement>(null);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setIsLoading(false);
    setIsRemarksFilled(false);
    if (remarksRef.current) remarksRef.current.value = "";
  };

  const handleConfirm = async () => {
    const remarks = remarksRef.current?.value.trim() || "";
    if (!remarks) return;

    setIsLoading(true);
    await action(remarks, currentUser?.id_number, onSuccess, onError);
    setIsLoading(false);
    handleClose();
  };

  return (
    <Fragment>
      <OverlayTrigger
            placement="top"
            overlay={<Tooltip>{buttonTitle || "Open Confirmation"}</Tooltip>}
          >
            <button
              type="button"
              onClick={handleShow}
              className={className || "btn btn-primary me-2"}
            >
              {textButton}
            </button>
      </OverlayTrigger>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle || "Are you sure?"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="remarksInput">
            <Form.Label>Remarks:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              ref={remarksRef}
              placeholder="Enter remarks..."
              disabled={isLoading}
              onChange={() => setIsRemarksFilled(!!remarksRef.current?.value.trim())}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" disabled={isLoading} onClick={handleClose}>
            No
          </Button>
          <Button
            variant="primary"
            disabled={isLoading || !isRemarksFilled}
            onClick={handleConfirm}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ConfirmModalType3;