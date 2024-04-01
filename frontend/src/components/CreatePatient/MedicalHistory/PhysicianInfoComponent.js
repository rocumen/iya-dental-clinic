import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const PhysicianInfoComponent = (props) => {
  const {
    physicianName,
    specialty,
    officeAddress,
    officeNumber,
    setMedicalHistory,
  } = props;
  return (
    <>
      <Row>
        <Col md={4}>
          <Form.Group controlId="physicianName" className="my-2">
            <Form.Label>Physician Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Dr."
              value={physicianName || ""}
              onChange={(e) =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  physicianName: e.target.value,
                }))
              }
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="specialty" className="my-2">
            <Form.Label>Physician Specialty</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Physician Specialty"
              value={specialty || ""}
              onChange={(e) =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  specialty: e.target.value,
                }))
              }
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Form.Group controlId="officeAddress" className="my-2">
            <Form.Label>Physician Office Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Office Address"
              value={officeAddress || ""}
              onChange={(e) =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  officeAddress: e.target.value,
                }))
              }
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="officeNumber" className="my-2">
            <Form.Label>Physician Office Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Office Number"
              value={officeNumber || ""}
              onChange={(e) =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  officeNumber: e.target.value,
                }))
              }
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default PhysicianInfoComponent;
