import React from "react";
import { Modal, Button } from "react-bootstrap";

const LogoutConfirmationDialog = ({ show, onHide, onConfirm }) => {
  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        Are you sure you want to logout?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutConfirmationDialog;
