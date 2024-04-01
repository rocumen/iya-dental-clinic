import React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import PrivacyConsent from "./PrivacyConsent";

const PopModal = ({
  show,
  onHide,
  dataPrivacySignature,
  setDataPrivacySignature,
}) => {
  const handleCloseModal = () => {
    // Check if dataPrivacySignature is empty
    if (!dataPrivacySignature.url) {
      // Don't close the modal if dataPrivacySignature is empty
      return;
    }
    // Close the modal
    onHide();
  };
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      backdrop="static" // Prevents closing on backdrop click
      keyboard={false} // Disables closing on escape key press
    >
      <Container>
        <Row>
          <Col>
            <Modal.Header
              //closeButton={!dataPrivacySignature.url}
              className="text-center"
            >
              <Modal.Title className="text-center">Privacy Consent</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              In compliance to RA 10173 or the Data Protection Act of 2012 (DPA
              of 2012) and its Implementing Rules and Regulations, we are
              detailing here the processing of the data you will provide to us.
              The following are the personal data that the we may need to
              collect: Name, Birthday, Religion, Nationality, Address,
              Occupation, Home/Office/Fax/Cel/Mobile Numbers, Guardian’s
              Name(for minors), Email Address, Dental/Medical History, Dental
              Charting, disposal of personal data, pictures, and videos
              collected shall be stored in the OneDrive for a period of five
              years. Upon expiration of such period, all personal data shall be
              disposed in a secure manner that will forbids further processing,
              unauthorized disclosure and editing. The HRMDO shall implement
              reasonable and appropriate organizational, physical, and technical
              security measures to protect your personal data. Only authorized
              personnel shall have access to the data collected and processed.
              Under RA 10173, the following are some of the rights the data
              subject may exercise, (for the full list of rights see{" "}
              <a
                target="_blank"
                href="https://privacy.gov.ph/npc-privacy-policy-2/"
              >
                https://www.privacy.gov.ph/know-your-rights/
              </a>
              ): <br /> <br />
              <strong>
                1. Right to be informed on the collection and processing of
                personal data through this consent form;
              </strong>{" "}
              <br />
              <strong>
                2. Right to object on the processing of personal data or to
                restrict the processing of personal data upon request;
              </strong>{" "}
              <br />
              <strong>
                3. Right to access the personal data collected and processed
                upon request;
              </strong>{" "}
              <br />
              <strong>
                4. Right to request for rectification of personal data; and
              </strong>{" "}
              <br />
              <strong>5. Right to withdraw his or her consent.</strong>
            </Modal.Body>
            <Row>
              <Col className="text-center mb-3">
                <PrivacyConsent
                  dataPrivacySignature={dataPrivacySignature}
                  setDataPrivacySignature={setDataPrivacySignature}
                  handleCloseModal={handleCloseModal}
                />
              </Col>
            </Row>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};

export default PopModal;
