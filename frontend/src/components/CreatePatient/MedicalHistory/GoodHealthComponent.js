import React from "react";
import { Form, Row, Col } from "react-bootstrap";
const GoodHealthComponent = (props) => {
  const { setMedicalHistory, isGoodHealth } = props;
  return (
    <Row>
      <Col md={3}>
        <Form.Group controlId="isGoodHealth" className="my-2">
          <Form.Label>
            <strong>Are you in Good Health?</strong>
          </Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              id="isGoodHealthYes"
              name="isGoodHealth"
              label="Yes"
              checked={isGoodHealth === true} // Use checked prop to manage radio button state
              onChange={() =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  isGoodHealth: true,
                }))
              } // Set to true directly
            />
            <Form.Check
              inline
              type="radio"
              id="isGoodHealthNo"
              name="isGoodHealth"
              label="No"
              checked={isGoodHealth === false} // Use checked prop to manage radio button state
              onChange={() =>
                setMedicalHistory((prevState) => ({
                  ...prevState,
                  isGoodHealth: false,
                }))
              } // Set to false directly
            />
          </div>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default GoodHealthComponent;
