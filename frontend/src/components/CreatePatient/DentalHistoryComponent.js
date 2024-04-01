import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const DentalHistoryComponent = (props) => {
  const { previousDentist, lastDentalVisit, setDentalHistory } = props;

  const dentalVisit = lastDentalVisit ? lastDentalVisit.split("T")[0] : "";

  return (
    <>
      <Row>
        <Col md={4}>
          <Form.Group controlId="previousDentist" className="my-2">
            <Form.Label>Previous Dentist Dr.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Dr."
              value={previousDentist || ""}
              onChange={(e) =>
                setDentalHistory((prevState) => ({
                  ...prevState,
                  previousDentist: e.target.value,
                }))
              }
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="lastDentalVisit" className="my-2">
            <Form.Label>Last Dental Visit</Form.Label>
            <Form.Control
              type="date"
              value={dentalVisit || ""} // Ensure it's not null
              onChange={(e) =>
                setDentalHistory((prevState) => ({
                  ...prevState,
                  lastDentalVisit: e.target.value,
                }))
              }
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default DentalHistoryComponent;
