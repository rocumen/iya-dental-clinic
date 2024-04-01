import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const IllnessOrSurgicalComponent = (props) => {
  const {
    setMedicalHistory,
    isIllnessOrSurgicalOperation,
    illnessOrSurgicalOperationExplanation,
  } = props;

  // Ensure illnessOrSurgicalOperationExplanation is never undefined
  const explanation = illnessOrSurgicalOperationExplanation || "";

  return (
    <Row>
      <Col md={4}>
        <Form.Group controlId="isIllnessOrSurgicalOperation" className="my-2">
          <Form.Label>
            <strong>
              Have you ever had serious illness or surgical operation?
            </strong>
          </Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              id="illnessOrSurgicalOperationYes"
              name="illnessOrSurgicalOperation"
              label="Yes"
              checked={isIllnessOrSurgicalOperation === true}
              onChange={() =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  isIllnessOrSurgicalOperation: true,
                }))
              }
            />
            <Form.Check
              inline
              type="radio"
              id="illnessOrSurgicalOperationNo"
              name="illnessOrSurgicalOperation"
              label="No"
              checked={isIllnessOrSurgicalOperation === false}
              onChange={() =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  isIllnessOrSurgicalOperation: false,
                  illnessOrSurgicalOperationExplanation: "", // Clear explanation when switching to "No"
                }))
              }
            />
          </div>
        </Form.Group>
      </Col>
      <Col md={8}>
        <Form.Group
          controlId="illnessOrSurgicalOperationExplanation"
          className="mt-2"
        >
          <Form.Label>Please provide an explanation if applicable.</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Explanation"
            value={explanation}
            onChange={(e) =>
              setMedicalHistory((prevState) => ({
                ...prevState,
                illnessOrSurgicalOperationExplanation: e.target.value,
              }))
            }
          />
        </Form.Group>
      </Col>
    </Row>
  );
};

export default IllnessOrSurgicalComponent;
