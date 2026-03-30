// options with remarks modal

import { Fragment, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

type Props = {
  action: (selectedOption: string, remarks: string) => Promise<void>;
  buttonLabel: React.ReactNode;
  buttonTitle: string;
  className?: string;
  modalTitle?: string;
  options: { label: string; value: string }[];
};

const ConfirmModalType2 = ({ action, buttonLabel, buttonTitle, className, modalTitle, options }: Props) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isRemarksFilled, setIsRemarksFilled] = useState(false); // 🔹 State untuk cek apakah remarks sudah diisi
  const remarksRef = useRef<HTMLTextAreaElement>(null);

  const handleClose = () => {
    setShow(false);
    setSelectedOption("");
    setIsRemarksFilled(false);
    if (remarksRef.current) remarksRef.current.value = ""; // Reset remarks
  };

  const handleShow = () => setShow(true);

  const handleConfirm = async () => {
    const remarks = remarksRef.current?.value.trim() || ""; // Ambil remarks
    if (!selectedOption || !remarks) return;

    setIsLoading(true);
    await action(selectedOption, remarks);
    setIsLoading(false);
    handleClose();
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
          <Modal.Title>{modalTitle || "Are you sure?"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="confirmDropdown">
            <Form.Label>Select an option:</Form.Label>
            <Form.Select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              disabled={isLoading}
            >
              <option value="">-- Select --</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="remarksInput" className="mt-3">
            <Form.Label>Remarks:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              ref={remarksRef} // Pakai useRef untuk remarks
              placeholder="Enter remarks..."
              disabled={isLoading}
              onChange={() => setIsRemarksFilled(!!remarksRef.current?.value.trim())} // 🔹 Update state saat remarks diisi
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled={isLoading} onClick={handleClose}>
            No
          </Button>
          <Button
            variant="primary"
            disabled={!selectedOption || isLoading || !isRemarksFilled} // 🔹 Tombol aktif jika remarks ada
            onClick={handleConfirm}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ConfirmModalType2;
