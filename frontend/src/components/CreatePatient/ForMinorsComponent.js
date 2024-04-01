import React from "react";
import { Form, Row, Col } from "react-bootstrap";
// import { useGetPatientByIdQuery } from "../../slices/patientsApiSlice";

const ForMinorsComponent = ({
  parentName,
  parentOccupation,
  referral,
  reasonForDentalConsult,
  setForMinors,
}) => {
  const handleInputChange = (key, value) => {
    setForMinors((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <>
      <Row>
        <Col md={3}>
          <Form.Group controlId="parentName" className="my-2">
            <Form.Label>Parent Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Parent Name"
              value={parentName || ""}
              onChange={(e) => handleInputChange("parentName", e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="parentOccupation" className="my-2">
            <Form.Label>Parent Occupation</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Parent Occupation"
              value={parentOccupation || ""}
              onChange={(e) =>
                handleInputChange("parentOccupation", e.target.value)
              }
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="referral" className="my-2">
            <Form.Label>Referral</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Referral"
              value={referral || ""}
              onChange={(e) => handleInputChange("referral", e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="reasonForDentalConsult" className="my-2">
            <Form.Label>Reason For Dental Consult</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Reason for Dental Consult"
              value={reasonForDentalConsult || ""}
              onChange={(e) =>
                handleInputChange("reasonForDentalConsult", e.target.value)
              }
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default ForMinorsComponent;
