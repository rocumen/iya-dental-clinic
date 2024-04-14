import React from "react";
import KCircle from "../circles/KCircle";
import { Col, Row } from "react-bootstrap";

const LowerLeftCircle = ({
  handleFill,
  fillColor,
  color,
  lowerLeft,
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
        <h6>Lower Left</h6>
        <Col
          className="d-flex gap-2 justify-content-center my-2"
          xs={12}
          sm={12}
          md={5}
          lg={5}
        >
          <Row>
            <Col>
              <h6>71</h6>
              <KCircle
                handleFill={handleFill}
                fillColor={fillColor.circle16}
                circleIndex="circle16"
                color={color}
                defaultColor={lowerLeft?.sixteen}
                setFillColor={setFillColor}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>72</h6>
              <KCircle
                handleFill={handleFill}
                fillColor={fillColor.circle17}
                circleIndex="circle17"
                color={color}
                defaultColor={lowerLeft?.seventeen}
                setFillColor={setFillColor}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>73</h6>
              <KCircle
                handleFill={handleFill}
                fillColor={fillColor.circle18}
                circleIndex="circle18"
                color={color}
                defaultColor={lowerLeft?.eighteen}
                setFillColor={setFillColor}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>74</h6>
              <KCircle
                handleFill={handleFill}
                fillColor={fillColor.circle19}
                circleIndex="circle19"
                color={color}
                defaultColor={lowerLeft?.nineteen}
                setFillColor={setFillColor}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>75</h6>
              <KCircle
                handleFill={handleFill}
                fillColor={fillColor.circle20}
                circleIndex="circle20"
                color={color}
                defaultColor={lowerLeft?.twenty}
                setFillColor={setFillColor}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default LowerLeftCircle;
