import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Modal, Button, Image, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "./Loader.js";

import { useUploadDentistSignatureMutation } from "../slices/patientsApiSlice.js";

const DentistSignature = (props) => {
  const [uploadDentistSignature, { isLoading: dentistLoading }] =
    useUploadDentistSignatureMutation();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // State to track whether the save button is clicked
  const [isEditing, setIsEditing] = useState(false); // State to track whether the signature is being edited
  const signatureRef = useRef();

  const { dentistSignature, setDentistSignature } = props;

  const openModal = (edit = false) => {
    setModalIsOpen(true);
    setIsEditing(edit);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsEditing(false); // Reset editing state when modal is closed
  };

  const handleClear = () => {
    signatureRef.current.clear();
  };

  const handleUploadDentist = async () => {
    if (isSaving) return; // If already saving, return to avoid multiple clicks

    setIsSaving(true); // Set isSaving to true when the button is clicked

    // Get the signature data URL from the canvas
    const signatureData = signatureRef.current.toDataURL();

    // Convert the data URL to a Blob
    const signatureBlob = await fetch(signatureData).then((res) => res.blob());

    // Create a FormData object and append the signature image Blob
    const formData = new FormData();
    formData.append("dentistSignature", signatureBlob);

    try {
      // Upload the signature image to the server
      const { data } = await uploadDentistSignature(formData); // unwrap()

      toast.success(data.message);
      setIsSaving(false); // Reset isSaving to false after uploading
      setDentistSignature(data.dentistSignature); // Assuming your backend returns the signature image details
    } catch (error) {
      console.log(error);
    }

    closeModal(); // Close the modal after saving
  };

  return (
    <>
      <Button
        variant="dark"
        className="btn-md mx-2 btn-sm"
        onClick={() => openModal()}
      >
        Dentist Signature
      </Button>
      {dentistSignature.url && !isEditing ? (
        <>
          <Modal centered show={modalIsOpen} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Dentist Signature</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {dentistLoading && <Loader />}
              {dentistSignature?.url && (
                <>
                  <Image
                    src={dentistSignature?.url}
                    alt={"dentistSignature"}
                    style={{
                      width: 460,
                      height: 200,
                      border: "1px black solid",
                    }}
                  />
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button variant="primary" onClick={() => openModal(true)}>
                Edit
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <>
          <Modal centered show={modalIsOpen} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Sign Here</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SignatureCanvas
                ref={signatureRef}
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: "sigCanvas",
                }}
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

              <Button
                variant="primary"
                onClick={handleUploadDentist}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default DentistSignature;
