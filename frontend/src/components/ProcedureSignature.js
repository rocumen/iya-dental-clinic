import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Modal, Button, Image, Col } from "react-bootstrap";
import { toast } from "react-toastify";

import { useUploadProcedureSignatureMutation } from "../slices/patientsApiSlice.js";
import Loader from "./Loader.js";

const ProcedureSignature = ({ setProcedureSignature, procedureSignature }) => {
  const [uploadProcedureSignature, { isLoading }] =
    useUploadProcedureSignatureMutation();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const signatureRef = useRef();

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
    if (isSaving) return;

    setIsSaving(true);
    // Get the signature data URL from the canvas
    const signatureData = signatureRef.current.toDataURL();

    // Convert the data URL to a Blob
    const signatureBlob = await fetch(signatureData).then((res) => res.blob());

    // Create a FormData object and append the signature image Blob
    const formData = new FormData();
    formData.append("procedureSignature", signatureBlob);

    // console.log(formData.get("signatureImage"));

    try {
      // Upload the signature image to the server
      const { data } = await uploadProcedureSignature(formData); // unwrap()

      toast.success(data.message);
      setIsSaving(false);
      setProcedureSignature(data.procedureSignature); // Assuming your backend returns the signature image details
      // refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }

    closeModal();
  };
  return (
    <>
      <Button variant="dark" className="btn-sm text-light" onClick={openModal}>
        Patient Signature
      </Button>
      {procedureSignature.url ? (
        <>
          <Modal show={modalIsOpen} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Signature</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {isLoading && <Loader />}

              {procedureSignature?.url && (
                <>
                  <h5 className="text-center my-3">Your Signature</h5>
                  <Image
                    src={procedureSignature?.url}
                    alt="Signature"
                    style={{ width: 460, height: 200 }}
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
    </>
  );
};

export default ProcedureSignature;
