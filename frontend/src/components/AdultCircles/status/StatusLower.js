import React from "react";
import { Row, Col } from "react-bootstrap";

const StatusLower = ({ register }) => {
  return (
    <>
      <Row className="justify-content-between">
        <Col className="text-center " xs={5} sm={5} md={5} lg={5}>
          <h6>Status Lower Right</h6>
        </Col>
        <Col className="text-center" xs={5} sm={5} md={5} lg={5}>
          <h6>Status Lower Left</h6>
        </Col>
      </Row>

      <Row className="justify-content-between">
        <Col xs={5} sm={5} md={5} lg={5} className="d-flex align-items-center">
          {/* LEFT SIDE */}
          <div className="box">
            <input {...register("statusBottomRightBox1")} type="text" />
          </div>
          <div className="box">
            <input {...register("statusBottomRightBox2")} type="text" />
          </div>
          <div className="box">
            <input {...register("statusBottomRightBox3")} type="text" />
          </div>
          <div className="box">
            <input {...register("statusBottomRightBox4")} type="text" />
          </div>
          <div className="box">
            <input {...register("statusBottomRightBox5")} type="text" />
          </div>
          <div className="box">
            <input {...register("statusBottomRightBox6")} type="text" />
          </div>
          <div className="box">
            <input {...register("statusBottomRightBox7")} type="text" />
          </div>
          <div className="box">
            <input {...register("statusBottomRightBox8")} type="text" />
          </div>
        </Col>

        {/* RIGHT SIDE */}
        <Col xs={5} sm={5} md={5} lg={5} className="d-flex">
          <div className="box ">
            <input {...register("statusBottomLeftBox1")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusBottomLeftBox2")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusBottomLeftBox3")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusBottomLeftBox4")} type="text" />
          </div>

          <div className="box ">
            <input {...register("statusBottomLeftBox5")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusBottomLeftBox6")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusBottomLeftBox7")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusBottomLeftBox8")} type="text" />
          </div>
        </Col>
      </Row>

      {/* LEFT SIDE */}
      <Row className="justify-content-between">
        <Col xs={5} sm={5} md={5} lg={5} className="d-flex">
          <div className="box ">
            <input {...register("statusBottomRightBox9")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusBottomRightBox10")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusBottomRightBox11")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusBottomRightBox12")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusBottomRightBox13")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusBottomRightBox14")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusBottomRightBox15")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusBottomRightBox16")} type="text" />
          </div>
        </Col>

        {/* RIGHT SIDE LOWER */}
        <Col xs={5} sm={5} md={5} lg={5} className="d-flex">
          <div className="box ">
            <input {...register("statusBottomLeftBox9")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusBottomLeftBox10")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusBottomLeftBox11")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusBottomLeftBox12")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusBottomLeftBox13")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusBottomLeftBox14")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusBottomLeftBox15")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusBottomLeftBox16")} type="text" />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default StatusLower;
