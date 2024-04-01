import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const MedicalTreatmentComponent = (props) => {
  const { isMedicalTreatment, medicalTreatmentExplanation, setMedicalHistory } =
    props;

  // Ensure medicalTreatmentExplanation is never undefined
  const explanation = medicalTreatmentExplanation || "";

  return (
    <Row>
      <Col md={4}>
        <Form.Group controlId="isMedicalTreatment" className="my-2">
          <Form.Label>
            <strong>Are you under medical treatment now?</strong>
          </Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              id="isMedicalTreatmentYes"
              name="isMedicalTreatment"
              label="Yes"
              checked={isMedicalTreatment === true}
              onChange={() =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  isMedicalTreatment: true,
                }))
              }
            />
            <Form.Check
              inline
              type="radio"
              id="isMedicalTreatmentNo"
              name="isMedicalTreatment"
              label="No"
              checked={isMedicalTreatment === false}
              onChange={() =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  isMedicalTreatment: false,
                  medicalTreatmentExplanation: "", // Clear explanation when switching to "No"
                }))
              }
            />
          </div>
        </Form.Group>
      </Col>
      <Col md={8}>
        <Form.Group controlId="medicalTreatmentExplanation" className="my-2">
          <Form.Label>Please provide an explanation if applicable.</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Explanation"
            value={explanation}
            onChange={(e) =>
              setMedicalHistory((prevState) => ({
                ...prevState,
                medicalTreatmentExplanation: e.target.value,
              }))
            }
          />
        </Form.Group>
      </Col>
    </Row>
  );
};

export default MedicalTreatmentComponent;
