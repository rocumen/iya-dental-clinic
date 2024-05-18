import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();
  const handleNavigateToPatientList = () => {
    navigate("/");
  };
  const handleNavigateToArchived = () => {
    navigate("/archived");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Row>
        <Col>
          <Button variant="primary" onClick={handleNavigateToPatientList}>
            Patient List
          </Button>
        </Col>
        <Col>
          <Button variant="secondary" onClick={handleNavigateToArchived}>
            Archived Patients
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default HomeScreen;
