import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Modal, Button, Image, Col } from "react-bootstrap";
import { toast } from "react-toastify";

import { useUploadSignatureMutation } from "../slices/patientsApiSlice.js";
import Loader from "./Loader.js";

const SignatureModal = ({ setSignatureImage, signatureImage }) => {
  const [uploadSignature, { isLoading }] = useUploadSignatureMutation();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const signatureRef = useRef();
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
    formData.append("signatureImage", signatureBlob);

    try {
      // Upload the signature image to the server
      const { data } = await uploadSignature(formData); // unwrap()

      toast.success(data.message);

      setIsSaving(false);
      setSignatureImage(data.signatureImage);
      // refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }

    closeModal();
  };

  return (
    <div>
      <Button variant="dark" className="btn-md mx-2 btn-sm" onClick={openModal}>
        Patient Signature
      </Button>
      {signatureImage.url ? (
        <>
          <Modal centered show={modalIsOpen} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Signature</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {isLoading && <Loader />}

              {signatureImage?.url && (
                <>
                  <Image
                    src={signatureImage?.url}
                    alt="Signature"
                    style={{
                      width: 460,
                      height: 200,
                      border: "1px black solid",
                    }}
                  />
                </>
              )}
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <Modal centered show={modalIsOpen} onHide={closeModal}>
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

            <Button
              disabled={isSaving}
              variant="primary"
              onClick={handleUpload}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default SignatureModal;
