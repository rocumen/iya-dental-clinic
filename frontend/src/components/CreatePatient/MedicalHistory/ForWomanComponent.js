import React from "react";
import { Form, Col, Row } from "react-bootstrap";

const ForWomanComponent = (props) => {
  const { setMedicalHistory, isPregnant, isNursing, isTakingPills } = props;
  return (
    <Row className="my-2 justify-content-start">
      <h5>For woman only:</h5>
      <Col md={3}>
        <Form.Group controlId="isPregnant" className="my-2">
          <Form.Label>
            <strong>Are you Pregnant?</strong>
          </Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              id="isPregnantYes"
              name="isPregnant"
              label="Yes"
              checked={isPregnant === true}
              onChange={() =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  isPregnant: true,
                }))
              }
            />
            <Form.Check
              inline
              type="radio"
              id="isPregnantNo"
              name="isPregnant"
              label="No"
              checked={isPregnant === false}
              onChange={() =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  isPregnant: false,
                }))
              }
            />
          </div>
        </Form.Group>
      </Col>

      <Col md={3}>
        <Form.Group controlId="isNursing" className="my-2">
          <Form.Label>
            <strong>Are you Nursing?</strong>
          </Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              id="isNursingYes"
              name="isNursing"
              label="Yes"
              checked={isNursing === true}
              onChange={() =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  isNursing: true,
                }))
              }
            />
            <Form.Check
              inline
              type="radio"
              id="isNursingNo"
              name="isNursing"
              label="No"
              checked={isNursing === false}
              onChange={() =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  isNursing: false,
                }))
              }
            />
          </div>
        </Form.Group>
      </Col>

      <Col md={5}>
        <Form.Group controlId="isTakingPills" className="my-2">
          <Form.Label>
            <strong>Are you taking birth control pills?</strong>
          </Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              id="isTakingPillsYes"
              name="isTakingPills"
              label="Yes"
              checked={isTakingPills === true}
              onChange={() =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  isTakingPills: true,
                }))
              }
            />
            <Form.Check
              inline
              type="radio"
              id="isTakingPillsNo"
              name="isTakingPills"
              label="No"
              checked={isTakingPills === false}
              onChange={() =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  isTakingPills: false,
                }))
              }
            />
          </div>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default ForWomanComponent;
