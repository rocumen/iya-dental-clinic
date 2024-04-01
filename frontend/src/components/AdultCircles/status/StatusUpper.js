import { Row, Col } from "react-bootstrap";

import React from "react";

const StatusUpper = ({ register, data }) => {
  return (
    <>
      {/* Left Boxes */}
      <Row className="justify-content-between">
        <Col className="text-center " xs={5} sm={5} md={5} lg={5}>
          <h6>Status Upper Right</h6>
        </Col>
        <Col className="text-center" xs={5} sm={5} md={5} lg={5}>
          <h6>Status Upper Left</h6>
        </Col>
      </Row>

      <Row className="justify-content-between">
        <Col xs={5} sm={5} md={5} lg={5} className="d-flex">
          {/* LEFT SIDE */}
          <div className="box ">
            <input {...register("statusTopRightBox1")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopRightBox2")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopRightBox3")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopRightBox4")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopRightBox5")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopRightBox6")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopRightBox7")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopRightBox8")} type="text" />
          </div>
        </Col>

        {/* RIGHT SIDE */}
        <Col xs={5} sm={5} md={5} lg={5} className="d-flex">
          <div className="box ">
            <input {...register("statusTopLeftBox1")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopLeftBox2")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopLeftBox3")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopLeftBox4")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopLeftBox5")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopLeftBox6")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopLeftBox7")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopLeftBox8")} type="text" />
          </div>
        </Col>
      </Row>

      {/* LEFT SIDE */}
      <Row className="justify-content-between">
        <Col xs={5} sm={5} md={5} lg={5} className="d-flex">
          <div className="box ">
            <input {...register("statusTopRightBox9")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopRightBox10")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopRightBox11")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopRightBox12")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopRightBox13")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopRightBox14")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopRightBox15")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopRightBox16")} type="text" />
          </div>
        </Col>

        {/* RIGHT SIDE LOWER */}
        <Col xs={5} sm={5} md={5} lg={5} className="d-flex">
          <div className="box ">
            <input {...register("statusTopLeftBox9")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopLeftBox10")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopLeftBox11")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopLeftBox12")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopLeftBox13")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopLeftBox14")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopLeftBox15")} type="text" />
          </div>
          <div className="box ">
            <input {...register("statusTopLeftBox16")} type="text" />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default StatusUpper;
