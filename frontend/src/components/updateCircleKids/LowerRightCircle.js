import React from "react";
import KCircle from "../circles/KCircle";
import { Col, Row } from "react-bootstrap";

const LowerRightCircle = ({
  handleFill,
  fillColor,
  color,
  lowerRight,
  setFillColor,
}) => {
  return (
    <Col
      className="d-flex gap-2 justify-content-center my-2"
      xs={12}
      sm={12}
      md={5}
      lg={5}
    >
      <Row className="justify-content-center text-center">
        <h6>Lower Right</h6>
        <Col
          className="d-flex gap-2 justify-content-center my-2"
          xs={12}
          sm={12}
          md={5}
          lg={5}
        >
          <Row>
            <Col>
              <h6>85</h6>
              <KCircle
                handleFill={handleFill}
                fillColor={fillColor.circle11}
                circleIndex="circle11"
                color={color}
                defaultColor={lowerRight?.eleven}
                setFillColor={setFillColor}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>84</h6>
              <KCircle
                handleFill={handleFill}
                fillColor={fillColor.circle12}
                circleIndex="circle12"
                color={color}
                defaultColor={lowerRight?.twelve}
                setFillColor={setFillColor}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>83</h6>
              <KCircle
                handleFill={handleFill}
                fillColor={fillColor.circle13}
                circleIndex="circle13"
                color={color}
                defaultColor={lowerRight?.thirteen}
                setFillColor={setFillColor}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>82</h6>
              <KCircle
                handleFill={handleFill}
                fillColor={fillColor.circle14}
                circleIndex="circle14"
                color={color}
                defaultColor={lowerRight?.fourteen}
                setFillColor={setFillColor}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>81</h6>
              <KCircle
                handleFill={handleFill}
                fillColor={fillColor.circle15}
                circleIndex="circle15"
                color={color}
                defaultColor={lowerRight?.fifteen}
                setFillColor={setFillColor}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default LowerRightCircle;
