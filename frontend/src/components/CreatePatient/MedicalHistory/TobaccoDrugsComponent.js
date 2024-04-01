import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const TobaccoDrugsComponent = (props) => {
  const { setMedicalHistory, isTobacco, isAlcoholOrDangerousDrugs } = props;
  return (
    <Row>
      <Col md={4}>
        <Form.Group controlId="isTobacco" className="my-2">
          <Form.Label>
            <strong>Do you use tobacco products?</strong>
          </Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              id="isTobaccoYes"
              name="isTobacco"
              label="Yes"
              checked={isTobacco === true} // Use checked prop to manage radio button state
              onChange={() =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  isTobacco: true,
                }))
              } // Set to true directly
            />
            <Form.Check
              inline
              type="radio"
              id="isTobaccoNo"
              name="isTobacco"
              label="No"
              checked={isTobacco === false} // Use checked prop to manage radio button state
              onChange={() =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  isTobacco: false,
                }))
              } // Set to false directly
            />
          </div>
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group controlId="isAlcoholOrDangerousDrugs" className="my-2">
          <Form.Label>
            <strong>
              Do you use alcohol, cocaine, or other dangerous drugs?
            </strong>
          </Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              id="isAlcoholOrDangerousDrugsYes"
              name="isAlcoholOrDangerousDrugs"
              label="Yes"
              checked={isAlcoholOrDangerousDrugs === true} // Use checked prop to manage radio button state
              onChange={() =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  isAlcoholOrDangerousDrugs: true,
                }))
              } // Set to true directly
            />
            <Form.Check
              inline
              type="radio"
              id="isAlcoholOrDangerousDrugsNo"
              name="isAlcoholOrDangerousDrugs"
              label="No"
              checked={isAlcoholOrDangerousDrugs === false} // Use checked prop to manage radio button state
              onChange={() =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  isAlcoholOrDangerousDrugs: false,
                }))
              } // Set to false directly
            />
          </div>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default TobaccoDrugsComponent;
