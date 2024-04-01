import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Modal, Button, Col } from "react-bootstrap";
import { toast } from "react-toastify";
// import Loader from "./Loader.js";

import { useUploadDataPrivacySignatureMutation } from "../slices/patientsApiSlice.js";

//
const PrivacyConsent = ({
  dataPrivacySignature,
  setDataPrivacySignature,
  handleCloseModal,
}) => {
  //@upload routes
  const [uploadDataPrivacySignature] = useUploadDataPrivacySignatureMutation();
  const signatureRef = useRef();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // State to track whether the save button is clicked

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleClear = () => {
    signatureRef.current.clear();
  };

  const handleUpload = async () => {
    if (isSaving) return; // If already saving, return to avoid multiple clicks

    setIsSaving(true); // Set isSaving to true when the button is clicked

    // Get the signature data URL from the canvas
    const signatureData = signatureRef.current.toDataURL();

    // Convert the data URL to a Blob
    const signatureBlob = await fetch(signatureData).then((res) => res.blob());

    // Create a FormData object and append the signature image Blob
    const formData = new FormData();
    formData.append("dataPrivacySignature", signatureBlob);

    // console.log(formData.get("signatureImage"));

    try {
      // Upload the signature image to the server
      const { data } = await uploadDataPrivacySignature(formData); // unwrap()

      toast.success(data.message);
      setIsSaving(false);
      setDataPrivacySignature(data.dataPrivacySignature); // Assuming your backend returns the signature image details
      //   refetch();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }

    closeModal();
  };

  return (
    <div>
      <Button variant="dark" className="btn-sm mx-2" onClick={openModal}>
        Sign Data Privacy
      </Button>

      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignatureCanvas
            ref={signatureRef}
            canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Col md={2} className="me-auto">
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Col>

          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>

          <Button disabled={isSaving} variant="primary" onClick={handleUpload}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PrivacyConsent;
