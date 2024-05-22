import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Row, Col, Button, Image } from "react-bootstrap";
import Legend from "../../components/Dental Chart/Legend.js";
import { FaArrowLeft } from "react-icons/fa";
//Upper Right Circles
import ACircle1 from "../../components/AdultCircles/UpperRight/ACircle1.js";
import ACircle2 from "../../components/AdultCircles/UpperRight/ACircle2.js";
import ACircle3 from "../../components/AdultCircles/UpperRight/ACircle3.js";
import ACircle4 from "../../components/AdultCircles/UpperRight/ACircle4.js";
import ACircle5 from "../../components/AdultCircles/UpperRight/ACircle5.js";
import ACircle6 from "../../components/AdultCircles/UpperRight/ACircle6.js";
import ACircle7 from "../../components/AdultCircles/UpperRight/ACircle7.js";
import ACircle8 from "../../components/AdultCircles/UpperRight/ACircle8.js";
//upper Left Circles
import ACircle9 from "../../components/AdultCircles/UpperLeft/ACircle9.js";
import ACircle10 from "../../components/AdultCircles/UpperLeft/ACircle10.js";
import ACircle11 from "../../components/AdultCircles/UpperLeft/ACircle11.js";
import ACircle12 from "../../components/AdultCircles/UpperLeft/ACircle12.js";
import ACircle13 from "../../components/AdultCircles/UpperLeft/ACircle13.js";
import ACircle14 from "../../components/AdultCircles/UpperLeft/ACircle14.js";
import ACircle15 from "../../components/AdultCircles/UpperLeft/ACircle15.js";
import ACircle16 from "../../components/AdultCircles/UpperLeft/ACircle16.js";
//Lower Right Circles
import ACircle17 from "../../components/AdultCircles/LowerRight/ACircle17.js";
import ACircle18 from "../../components/AdultCircles/LowerRight/ACircle18.js";
import ACircle19 from "../../components/AdultCircles/LowerRight/ACircle19.js";
import ACircle20 from "../../components/AdultCircles/LowerRight/ACircle20.js";
import ACircle21 from "../../components/AdultCircles/LowerRight/ACircle21.js";
import ACircle22 from "../../components/AdultCircles/LowerRight/ACircle22.js";
import ACircle23 from "../../components/AdultCircles/LowerRight/ACircle23.js";
import ACircle24 from "../../components/AdultCircles/LowerRight/ACircle24.js";
//Lower Left Circles
import ACircle25 from "../../components/AdultCircles/LowerLeft/ACircle25.js";
import ACircle26 from "../../components/AdultCircles/LowerLeft/ACircle26.js";
import ACircle27 from "../../components/AdultCircles/LowerLeft/ACircle27.js";
import ACircle28 from "../../components/AdultCircles/LowerLeft/ACircle28.js";
import ACircle29 from "../../components/AdultCircles/LowerLeft/ACircle29.js";
import ACircle30 from "../../components/AdultCircles/LowerLeft/ACircle30.js";
import ACircle31 from "../../components/AdultCircles/LowerLeft/ACircle31.js";
import ACircle32 from "../../components/AdultCircles/LowerLeft/ACircle32.js";

import StatusLower from "../../components/AdultCircles/status/StatusLower.js";

import StatusUpper from "../../components/AdultCircles/status/StatusUpper.js";

import dentalImage from "../../assets/dentalimage.jpg";

import {
  useCreateOldDentalChartAdultMutation,
  useGetOldPatientByIdQuery,
} from "../../slices/patientsApiSlice.js";

const OldAdultDentalChart = () => {
  const { id: patientId } = useParams();
  const navigate = useNavigate();
  const { data: patient, isLoading } = useGetOldPatientByIdQuery(patientId);
  // const [createDentalChartKids, { isLoading: loadingChar }] =
  //   useCreateDentalChartKidsMutation();

  const [createOldDentalChartAdult, { isLoading: loadingChar }] =
    useCreateOldDentalChartAdultMutation();

  const [color, setColor] = useState("#D3D3D3"); // Default color is gray

  const { register, handleSubmit } = useForm();

  // const statusFormSubmit = (values) => {
  //   console.log(values);
  // };

  const [fillColor, setFillColor] = useState(() => {
    const circles = {};
    const positions = [
      "colorTop",
      "colorBottom",
      "colorRight",
      "colorLeft",
      "donut_hole",
    ];
    for (let i = 1; i <= 32; i++) {
      const circle = {};
      positions.forEach((position) => {
        circle[position] = "";
      });
      circles[`circle${i}`] = circle;
    }
    return circles;
  });

  const handleFill = (circleIndex, section, color) => {
    setFillColor((prevState) => ({
      ...prevState,
      [circleIndex]: {
        ...prevState[circleIndex],
        [section]: color,
      },
    }));
  };

  const onSubmit = async (values) => {
    const upperRightCircle = {
      one: fillColor.circle1,
      two: fillColor.circle2,
      three: fillColor.circle3,
      four: fillColor.circle4,
      five: fillColor.circle5,
      six: fillColor.circle6,
      seven: fillColor.circle7,
      eight: fillColor.circle8,
    };

    const upperLeftCircle = {
      nine: fillColor.circle9,
      ten: fillColor.circle10,
      eleven: fillColor.circle11,
      twelve: fillColor.circle12,
      thirteen: fillColor.circle13,
      fourteen: fillColor.circle14,
      fifteen: fillColor.circle15,
      sixteen: fillColor.circle16,
    };

    const lowerRightCircle = {
      seventeen: fillColor.circle17,
      eighteen: fillColor.circle18,
      nineteen: fillColor.circle19,
      twenty: fillColor.circle20,
      twentyone: fillColor.circle21,
      twentytwo: fillColor.circle22,
      twentythree: fillColor.circle23,
      twentyfour: fillColor.circle24,
    };

    const lowerLeftCircle = {
      twentyfive: fillColor.circle25,
      twentysix: fillColor.circle26,
      twentyseven: fillColor.circle27,
      twentyeight: fillColor.circle28,
      twentynine: fillColor.circle29,
      thirty: fillColor.circle30,
      thirtyone: fillColor.circle31,
      thirtytwo: fillColor.circle32,
    };

    // STATUS
    const statusTopRight = {
      //UPPER Right SIDE
      box1: values.statusTopRightBox1,
      box2: values.statusTopRightBox2,
      box3: values.statusTopRightBox3,
      box4: values.statusTopRightBox4,
      box5: values.statusTopRightBox5,
      box6: values.statusTopRightBox6,
      box7: values.statusTopRightBox7,
      box8: values.statusTopRightBox8,
      box9: values.statusTopRightBox9,
      box10: values.statusTopRightBox10,
      box11: values.statusTopRightBox11,
      box12: values.statusTopRightBox12,
      box13: values.statusTopRightBox13,
      box14: values.statusTopRightBox14,
      box15: values.statusTopRightBox15,
      box16: values.statusTopRightBox16,
    };

    const statusTopLeft = {
      //UPPER LEFT SIDE
      box1: values.statusTopRightBox1,
      box2: values.statusTopRightBox2,
      box3: values.statusTopRightBox3,
      box4: values.statusTopRightBox4,
      box5: values.statusTopRightBox5,
      box6: values.statusTopRightBox6,
      box7: values.statusTopRightBox7,
      box8: values.statusTopRightBox8,
      box9: values.statusTopRightBox9,
      box10: values.statusTopRightBox10,
      box11: values.statusTopRightBox11,
      box12: values.statusTopRightBox12,
      box13: values.statusTopRightBox13,
      box14: values.statusTopRightBox14,
      box15: values.statusTopRightBox15,
      box16: values.statusTopRightBox16,
    };

    const statusBottomRight = {
      //LOWER RIGHT SIDE
      box1: values.statusTopRightBox1,
      box2: values.statusTopRightBox2,
      box3: values.statusTopRightBox3,
      box4: values.statusTopRightBox4,
      box5: values.statusTopRightBox5,
      box6: values.statusTopRightBox6,
      box7: values.statusTopRightBox7,
      box8: values.statusTopRightBox8,
      box9: values.statusTopRightBox9,
      box10: values.statusTopRightBox10,
      box11: values.statusTopRightBox11,
      box12: values.statusTopRightBox12,
      box13: values.statusTopRightBox13,
      box14: values.statusTopRightBox14,
      box15: values.statusTopRightBox15,
      box16: values.statusTopRightBox16,
    };

    const statusBottomLeft = {
      //LOWER LEFT SIDE
      box1: values.statusTopRightBox1,
      box2: values.statusTopRightBox2,
      box3: values.statusTopRightBox3,
      box4: values.statusTopRightBox4,
      box5: values.statusTopRightBox5,
      box6: values.statusTopRightBox6,
      box7: values.statusTopRightBox7,
      box8: values.statusTopRightBox8,
      box9: values.statusTopRightBox9,
      box10: values.statusTopRightBox10,
      box11: values.statusTopRightBox11,
      box12: values.statusTopRightBox12,
      box13: values.statusTopRightBox13,
      box14: values.statusTopRightBox14,
      box15: values.statusTopRightBox15,
      box16: values.statusTopRightBox16,
    };

    const xrayTaken = {
      periapical: values.periapical,
      panoramic: values.panoramic,
      cephalometric: values.cephalometric,
      occlusal: values.occlusal,
      othersXray: values.othersXray,
    };

    const periodontalScreening = {
      gingivitis: values.gingivitis,
      earlyPeriodontitis: values.earlyPeriodontitis,
      moderatePeriodontitis: values.moderatePeriodontitis,
      advancedPeriodontitis: values.advancedPeriodontitis,
    };

    const occlusion = {
      class: values.class,
      overjet: values.overjet,
      overbite: values.overbite,
      midlineDeviation: values.midlineDeviation,
      crossbite: values.crossbite,
    };

    const appliances = {
      orthodontic: values.orthodontic,
      stayplate: values.stayplate,
      othersAppliances: values.othersAppliances,
    };

    const tmd = {
      clenching: values.clenching,
      clicking: values.clicking,
      trismus: values.trismus,
      muscleSpasm: values.muscleSpasm,
    };

    try {
      const response = await createOldDentalChartAdult({
        patientId,
        upperRightCircle,
        upperLeftCircle,
        lowerLeftCircle,
        lowerRightCircle,
        statusTopRight,
        statusTopLeft,
        statusBottomRight,
        statusBottomLeft,
        xrayTaken,
        periodontalScreening,
        occlusion,
        appliances,
        tmd,
      }); //.unwrap();

      const { _id, dentalChartAdult } = response.data;

      console.log(response);
      toast.success("Chart Saved");
      navigate(`/oldAdultChart/${_id}/update/${dentalChartAdult?._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateHandler = () => {
    navigate("/");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col className="mb-2 d-flex justify-content-center">
            <Image
              src={dentalImage}
              alt="image"
              fluid
              className="small-image"
            />
          </Col>
        </Row>
        <Link>
          <Button
            onClick={navigateHandler}
            variant="dark"
            className="text-light my-2"
            size="md"
          >
            <FaArrowLeft /> Go Back
          </Button>
        </Link>
        <Row className="my-3">
          <Col>
            <h1 className="text-center">Adult Dental Record Chart</h1>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            <strong>INTRAORAL EXAMINATION:</strong>
          </Col>
          <Col>
            <strong>Name:</strong> {patient?.lastName}, {patient?.firstName}
          </Col>
          <Col>
            <strong>Age:</strong> {patient?.age}
          </Col>
          <Col>
            <strong>Gender:</strong> {patient?.gender}
          </Col>
          {/* <Col>{Date.now()}</Col> */}
        </Row>
        <hr style={{ height: "1px" }} />
        {/* Status Upper */}
        <StatusUpper register={register} />
        {/* Color Selector */}
        <Row>
          <Col className="d-flex my-3 text-center justify-content-center">
            <div className="mx-2 circleRed" onClick={() => setColor("#ed0202")}>
              {/* Red */}
            </div>
            <div
              className="mx-2 circleBlue"
              onClick={() => setColor("#1c00f0")}
            >
              {/* Blue */}
            </div>
            <div
              className="mx-2 circleBlack"
              onClick={() => setColor("#000000")}
            >
              {/* Black */}
            </div>
            <div
              className="mx-2 circleClear"
              onClick={() => setColor("#D3D3D3")}
            >
              {/* Clear */}
            </div>
          </Col>
        </Row>
        {/* Circles 1-5 */}
        <Row className="justify-content-between text-center">
          <Col
            className="d-flex gap-2 justify-content-center my-2"
            xs={12}
            sm={12}
            md={6}
            lg={5}
          >
            <Row className="justify-content-center text-center">
              <h6>Upper Right</h6>
              <Col
                className="d-flex gap-2 justify-content-center my-2"
                xs={12}
                sm={12}
                md={6}
                lg={5}
              >
                <Row>
                  <Col>
                    <h6>18</h6>
                    <ACircle1
                      handleFill={handleFill}
                      fillColor={fillColor.circle1}
                      circleIndex="circle1"
                      color={color}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <h6>17</h6>
                    <ACircle2
                      handleFill={handleFill}
                      fillColor={fillColor.circle2}
                      circleIndex="circle2"
                      color={color}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <h6>16</h6>
                    <ACircle3
                      handleFill={handleFill}
                      fillColor={fillColor.circle3}
                      circleIndex="circle3"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>15</h6>
                    <ACircle4
                      handleFill={handleFill}
                      fillColor={fillColor.circle4}
                      circleIndex="circle4"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>14</h6>
                    <ACircle5
                      handleFill={handleFill}
                      fillColor={fillColor.circle5}
                      circleIndex="circle5"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>13</h6>
                    <ACircle6
                      handleFill={handleFill}
                      fillColor={fillColor.circle6}
                      circleIndex="circle6"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>12</h6>
                    <ACircle7
                      handleFill={handleFill}
                      fillColor={fillColor.circle7}
                      circleIndex="circle7"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>11</h6>
                    <ACircle8
                      handleFill={handleFill}
                      fillColor={fillColor.circle8}
                      circleIndex="circle8"
                      color={color}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col
            className="d-flex gap-2 justify-content-center my-2"
            xs={12}
            sm={12}
            md={6}
            lg={5}
          >
            <Row className="justify-content-center text-center">
              <h6>Upper Left</h6>
              <Col
                className="d-flex gap-2 justify-content-center my-2"
                xs={12}
                sm={12}
                md={6}
                lg={5}
              >
                <Row>
                  <Col>
                    <h6>21</h6>
                    <ACircle9
                      handleFill={handleFill}
                      fillColor={fillColor.circle9}
                      circleIndex="circle9"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>22</h6>
                    <ACircle10
                      handleFill={handleFill}
                      fillColor={fillColor.circle10}
                      circleIndex="circle10"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>23</h6>
                    <ACircle11
                      handleFill={handleFill}
                      fillColor={fillColor.circle11}
                      circleIndex="circle11"
                      color={color}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <h6>24</h6>
                    <ACircle12
                      handleFill={handleFill}
                      fillColor={fillColor.circle12}
                      circleIndex="circle12"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>25</h6>
                    <ACircle13
                      handleFill={handleFill}
                      fillColor={fillColor.circle13}
                      circleIndex="circle13"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>26</h6>
                    <ACircle14
                      handleFill={handleFill}
                      fillColor={fillColor.circle14}
                      circleIndex="circle14"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>27</h6>
                    <ACircle15
                      handleFill={handleFill}
                      fillColor={fillColor.circle15}
                      circleIndex="circle15"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>28</h6>
                    <ACircle16
                      handleFill={handleFill}
                      fillColor={fillColor.circle16}
                      circleIndex="circle16"
                      color={color}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr style={{ height: "2px" }} />
        <Row className="justify-content-between text-center">
          <Col
            className="d-flex gap-2 justify-content-center my-2"
            xs={12}
            sm={12}
            md={6}
            lg={5}
          >
            <Row className="justify-content-center text-center">
              <h6>Lower Right</h6>
              <Col
                className="d-flex gap-2 justify-content-center my-2"
                xs={12}
                sm={12}
                md={6}
                lg={5}
              >
                <Row>
                  <Col>
                    <h6>48</h6>
                    <ACircle17
                      handleFill={handleFill}
                      fillColor={fillColor.circle17}
                      circleIndex="circle17"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>47</h6>
                    <ACircle18
                      handleFill={handleFill}
                      fillColor={fillColor.circle18}
                      circleIndex="circle18"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>46</h6>
                    <ACircle19
                      handleFill={handleFill}
                      fillColor={fillColor.circle19}
                      circleIndex="circle19"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>45</h6>
                    <ACircle20
                      handleFill={handleFill}
                      fillColor={fillColor.circle20}
                      circleIndex="circle20"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>44</h6>
                    <ACircle21
                      handleFill={handleFill}
                      fillColor={fillColor.circle21}
                      circleIndex="circle21"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>43</h6>
                    <ACircle22
                      handleFill={handleFill}
                      fillColor={fillColor.circle22}
                      circleIndex="circle22"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>42</h6>
                    <ACircle23
                      handleFill={handleFill}
                      fillColor={fillColor.circle23}
                      circleIndex="circle23"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>41</h6>
                    <ACircle24
                      handleFill={handleFill}
                      fillColor={fillColor.circle24}
                      circleIndex="circle24"
                      color={color}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col
            className="d-flex gap-2 justify-content-center my-2"
            xs={12}
            sm={12}
            md={6}
            lg={5}
          >
            <Row className="justify-content-center text-center">
              <h6>Lower Left</h6>
              <Col
                className="d-flex gap-2 justify-content-center my-2"
                xs={12}
                sm={12}
                md={6}
                lg={5}
              >
                <Row>
                  <Col>
                    <h6>31</h6>
                    <ACircle25
                      handleFill={handleFill}
                      fillColor={fillColor.circle25}
                      circleIndex="circle25"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>32</h6>
                    <ACircle26
                      handleFill={handleFill}
                      fillColor={fillColor.circle26}
                      circleIndex="circle26"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>33</h6>
                    <ACircle27
                      handleFill={handleFill}
                      fillColor={fillColor.circle27}
                      circleIndex="circle27"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>34</h6>
                    <ACircle28
                      handleFill={handleFill}
                      fillColor={fillColor.circle28}
                      circleIndex="circle28"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>35</h6>
                    <ACircle29
                      handleFill={handleFill}
                      fillColor={fillColor.circle29}
                      circleIndex="circle29"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>36</h6>
                    <ACircle30
                      handleFill={handleFill}
                      fillColor={fillColor.circle30}
                      circleIndex="circle30"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>37</h6>
                    <ACircle31
                      handleFill={handleFill}
                      fillColor={fillColor.circle31}
                      circleIndex="circle31"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>38</h6>
                    <ACircle32
                      handleFill={handleFill}
                      fillColor={fillColor.circle32}
                      circleIndex="circle32"
                      color={color}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <StatusLower register={register} />
        <hr className="my-5" style={{ height: "1px" }} />
        <Legend register={register} />
        <Row>
          <Col>
            <div className="text-center">
              <Button type="submit">Save</Button>
            </div>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default OldAdultDentalChart;
