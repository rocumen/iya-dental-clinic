import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const HospitalizedComponent = (props) => {
  const { setMedicalHistory, isHospitalized, hospitalizedExplanation } = props;
  return (
    <Row>
      <Col md={4}>
        <Form.Group controlId="isHospitalized" className="my-2">
          <Form.Label>
            <strong>Have you ever been Hospitalized?</strong>
          </Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              id="isHospitalizedYes"
              name="isHospitalized"
              label="Yes"
              checked={isHospitalized === true} // Use checked prop to manage radio button state
              onChange={() =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  isHospitalized: true,
                }))
              } // Set to true directly
            />
            <Form.Check
              inline
              type="radio"
              id="isHospitalizedNo"
              name="isHospitalized"
              label="No"
              checked={isHospitalized === false} // Use checked prop to manage radio button state
              onChange={() =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  isHospitalized: false,
                }))
              } // Set to false directly
            />
          </div>
        </Form.Group>
      </Col>
      <Col md={8}>
        <Form.Group controlId="isHospitalizedExplanation" className="mt-2">
          <Form.Label>Please provide an explanation if applicable.</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Explanation"
            value={hospitalizedExplanation} // Use value prop to bind input to state
            onChange={(e) =>
              setMedicalHistory((prevState) => ({
                ...prevState,
                hospitalizedExplanation: e.target.value,
              }))
            } // Update isHospitalizedExplanation field in state
          />
        </Form.Group>
      </Col>
    </Row>
  );
};

export default HospitalizedComponent;
