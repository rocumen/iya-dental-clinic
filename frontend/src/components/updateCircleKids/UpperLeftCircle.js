import React from "react";
import KCircle from "../circles/KCircle";
import { Col, Row } from "react-bootstrap";

const UpperLeftCircle = ({
  handleFill,
  fillColor,
  color,
  upperLeft,
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
        <h6>Upper Left</h6>
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
                fillColor={fillColor.circle6}
                circleIndex="circle6"
                color={color}
                defaultColor={upperLeft?.six}
                setFillColor={setFillColor}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>62</h6>
              <KCircle
                handleFill={handleFill}
                fillColor={fillColor.circle7}
                circleIndex="circle7"
                color={color}
                defaultColor={upperLeft?.seven}
                setFillColor={setFillColor}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>63</h6>
              <KCircle
                handleFill={handleFill}
                fillColor={fillColor.circle8}
                circleIndex="circle8"
                color={color}
                defaultColor={upperLeft?.eight}
                setFillColor={setFillColor}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>64</h6>
              <KCircle
                handleFill={handleFill}
                fillColor={fillColor.circle9}
                circleIndex="circle9"
                color={color}
                defaultColor={upperLeft?.nine}
                setFillColor={setFillColor}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>65</h6>
              <KCircle
                handleFill={handleFill}
                fillColor={fillColor.circle10}
                circleIndex="circle10"
                color={color}
                defaultColor={upperLeft?.ten}
                setFillColor={setFillColor}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default UpperLeftCircle;
