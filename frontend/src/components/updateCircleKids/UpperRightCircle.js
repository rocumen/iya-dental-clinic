import React from "react";
import KCircle from "../circles/KCircle";
import { Col, Row } from "react-bootstrap";

const UpperRightCircle = ({
  handleFill,
  fillColor,
  color,
  upperRight,
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
        <h6>Upper Right</h6>
        <Col
          className="d-flex gap-2 justify-content-center my-2"
          xs={12}
          sm={12}
          md={5}
          lg={5}
        >
          <Row>
            <Col>
              <h6>61</h6>
              <KCircle
                handleFill={handleFill}
                fillColor={fillColor.circle1}
                circleIndex="circle1"
                color={color}
                defaultColor={upperRight?.one}
                setFillColor={setFillColor}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>62</h6>
              <KCircle
                handleFill={handleFill}
                fillColor={fillColor.circle2}
                circleIndex="circle2"
                color={color}
                defaultColor={upperRight?.two}
                setFillColor={setFillColor}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>63</h6>
              <KCircle
                handleFill={handleFill}
                fillColor={fillColor.circle3}
                circleIndex="circle3"
                color={color}
                defaultColor={upperRight?.three}
                setFillColor={setFillColor}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>64</h6>
              <KCircle
                handleFill={handleFill}
                fillColor={fillColor.circle4}
                circleIndex="circle4"
                color={color}
                defaultColor={upperRight?.four}
                setFillColor={setFillColor}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>65</h6>
              <KCircle
                handleFill={handleFill}
                fillColor={fillColor.circle5}
                circleIndex="circle5"
                color={color}
                defaultColor={upperRight?.five}
                setFillColor={setFillColor}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default UpperRightCircle;
