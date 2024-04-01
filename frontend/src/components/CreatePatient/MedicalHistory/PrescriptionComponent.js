import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const PrescriptionComponent = (props) => {
  const { setMedicalHistory, isPrescription, prescriptionExplanation } = props;
  return (
    <Row>
      <Col md={4}>
        <Form.Group controlId="isPrescription" className="my-2">
          <Form.Label>
            <strong>
              Are you taking any prescription/non-prescription medication?
            </strong>
          </Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              id="isPrescriptionYes"
              name="isPrescription"
              label="Yes"
              checked={isPrescription === true} // Use checked prop to manage radio button state
              onChange={() =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  isPrescription: true,
                }))
              } // Set to true directly
            />
            <Form.Check
              inline
              type="radio"
              id="isPrescriptionNo"
              name="isPrescription"
              label="No"
              checked={isPrescription === false} // Use checked prop to manage radio button state
              onChange={() =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  isPrescription: false,
                }))
              } // Set to false directly
            />
          </div>
        </Form.Group>
      </Col>
      <Col md={8}>
        <Form.Group controlId="isPrescriptionExplanation" className="mt-2">
          <Form.Label>Please provide an explanation if applicable.</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Explanation"
            value={prescriptionExplanation} // Use value prop to bind input to state
            onChange={(e) =>
              setMedicalHistory((prevState) => ({
                ...prevState,
                prescriptionExplanation: e.target.value,
              }))
            } // Update isPrescriptionExplanation field in state
          />
        </Form.Group>
      </Col>
    </Row>
  );
};

export default PrescriptionComponent;
