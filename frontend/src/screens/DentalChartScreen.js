import React, { useState, useEffect } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import GoBack from "../components/GoBack.js";
//Upper Right Circles
import KCircle1 from "../components/circles/upperRight/KCircle1.js";
import KCircle2 from "../components/circles/upperRight/KCircle2.js";
import KCircle3 from "../components/circles/upperRight/KCircle3.js";
import KCircle4 from "../components/circles/upperRight/KCircle4.js";
import KCircle5 from "../components/circles/upperRight/KCircle5.js";
//upper Left Circles
import KCircle6 from "../components/circles/upperLeft/KCircle6.js";
import KCircle7 from "../components/circles/upperLeft/KCircle7.js";
import KCircle8 from "../components/circles/upperLeft/KCircle8.js";
import KCircle9 from "../components/circles/upperLeft/KCircle9.js";
import KCircle10 from "../components/circles/upperLeft/KCircle10.js";
//Lower Right Circles
import KCircle11 from "../components/circles/lowerRight/KCircle11.js";
import KCircle12 from "../components/circles/lowerRight/KCircle12.js";
import KCircle13 from "../components/circles/lowerRight/KCircle13.js";
import KCircle14 from "../components/circles/lowerRight/KCircle14.js";
import KCircle15 from "../components/circles/lowerRight/KCircle15.js";
//Lower Left Circles
import KCircle16 from "../components/circles/lowerLeft/KCircle16.js";
import KCircle17 from "../components/circles/lowerLeft/KCircle17.js";
import KCircle18 from "../components/circles/lowerLeft/KCircle18.js";
import KCircle19 from "../components/circles/lowerLeft/KCircle19.js";
import KCircle20 from "../components/circles/lowerLeft/KCircle20.js";

import StatusLower from "../components/Dental Chart/StatusLower.js";
import StatusUpper from "../components/Dental Chart/StatusUpper.js";
import Legend from "../components/Dental Chart/Legend.js";

import dentalImage from "../assets/dentalimage.jpg";

import {
  useCreateDentalChartKidsMutation,
  useGetPatientByIdQuery,
} from "../slices/patientsApiSlice.js";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const DentalChartScreen = () => {
  const navigate = useNavigate();
  const { id: patientId } = useParams();
  const { data: patient, isLoading } = useGetPatientByIdQuery(patientId);
  const [createDentalChartKids, { isLoading: loadingChar }] =
    useCreateDentalChartKidsMutation();

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
    for (let i = 1; i <= 20; i++) {
      const circle = {};
      positions.forEach((position) => {
        circle[position] = "";
      });
      circles[`circle${i}`] = circle;
    }
    return circles;
  });

  // console.log(patient);

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
    };

    const upperLeftCircle = {
      six: fillColor.circle6,
      seven: fillColor.circle7,
      eight: fillColor.circle8,
      nine: fillColor.circle9,
      ten: fillColor.circle10,
    };

    const lowerRightCircle = {
      eleven: fillColor.circle11,
      twelve: fillColor.circle12,
      thirteen: fillColor.circle13,
      fourteen: fillColor.circle14,
      fifteen: fillColor.circle15,
    };

    const lowerLeftCircle = {
      sixteen: fillColor.circle16,
      seventeen: fillColor.circle17,
      eighteen: fillColor.circle18,
      nineteen: fillColor.circle19,
      twenty: fillColor.circle20,
    };

    // STATUS
    const statusTopRight = {
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
    };

    const statusTopLeft = {
      //UPPER LEFT SIDE
      box1: values.statusTopLeftBox1,
      box2: values.statusTopLeftBox2,
      box3: values.statusTopLeftBox3,
      box4: values.statusTopLeftBox4,
      box5: values.statusTopLeftBox5,
      box6: values.statusTopLeftBox6,
      box7: values.statusTopLeftBox7,
      box8: values.statusTopLeftBox8,
      box9: values.statusTopLeftBox9,
      box10: values.statusTopLeftBox10,
    };

    const statusBottomRight = {
      //LOWER RIGHT SIDE
      box1: values.statusBottomRightBox1,
      box2: values.statusBottomRightBox2,
      box3: values.statusBottomRightBox3,
      box4: values.statusBottomRightBox4,
      box5: values.statusBottomRightBox5,
      box6: values.statusBottomRightBox6,
      box7: values.statusBottomRightBox7,
      box8: values.statusBottomRightBox8,
      box9: values.statusBottomRightBox9,
      box10: values.statusBottomRightBox10,
    };

    const statusBottomLeft = {
      //LOWER LEFT SIDE
      box1: values.statusBottomLeftBox1,
      box2: values.statusBottomLeftBox2,
      box3: values.statusBottomLeftBox3,
      box4: values.statusBottomLeftBox4,
      box5: values.statusBottomLeftBox5,
      box6: values.statusBottomLeftBox6,
      box7: values.statusBottomLeftBox7,
      box8: values.statusBottomLeftBox8,
      box9: values.statusBottomLeftBox9,
      box10: values.statusBottomLeftBox10,
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
      const response = await createDentalChartKids({
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

      const { _id, dentalChartKids } = response.data;

      toast.success("Chart Saved");
      navigate(
        `/patients/dentalChartKids/${_id}/update/${dentalChartKids?._id}`
      );
    } catch (error) {
      console.log(error);
    }
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
        <Row>
          <Col>
            <GoBack />
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            <h1 className="text-center">Child Dental Record Chart</h1>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>INTRAORAL EXAMINATION</Col>
          <Col>Name: {patient?.lastName}</Col>
          <Col>Age: 12</Col>
          <Col>Gender: M</Col>
          <Col>Date</Col>
        </Row>
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
                    <h6>55</h6>
                    <KCircle1
                      handleFill={handleFill}
                      fillColor={fillColor.circle1}
                      circleIndex="circle1"
                      color={color}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <h6>54</h6>
                    <KCircle2
                      handleFill={handleFill}
                      fillColor={fillColor.circle2}
                      circleIndex="circle2"
                      color={color}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <h6>53</h6>
                    <KCircle3
                      handleFill={handleFill}
                      fillColor={fillColor.circle3}
                      circleIndex="circle3"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>52</h6>
                    <KCircle4
                      handleFill={handleFill}
                      fillColor={fillColor.circle4}
                      circleIndex="circle4"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>51</h6>
                    <KCircle5
                      handleFill={handleFill}
                      fillColor={fillColor.circle5}
                      circleIndex="circle5"
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
                    <KCircle6
                      handleFill={handleFill}
                      fillColor={fillColor.circle6}
                      circleIndex="circle6"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>62</h6>
                    <KCircle7
                      handleFill={handleFill}
                      fillColor={fillColor.circle7}
                      circleIndex="circle7"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>63</h6>
                    <KCircle8
                      handleFill={handleFill}
                      fillColor={fillColor.circle8}
                      circleIndex="circle8"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>64</h6>
                    <KCircle9
                      handleFill={handleFill}
                      fillColor={fillColor.circle9}
                      circleIndex="circle9"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>65</h6>
                    <KCircle10
                      handleFill={handleFill}
                      fillColor={fillColor.circle10}
                      circleIndex="circle10"
                      color={color}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr></hr>
        <Row className="justify-content-between text-center">
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
                    <KCircle11
                      handleFill={handleFill}
                      fillColor={fillColor.circle11}
                      circleIndex="circle11"
                      color={color}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <h6>84</h6>
                    <KCircle12
                      handleFill={handleFill}
                      fillColor={fillColor.circle12}
                      circleIndex="circle12"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>83</h6>
                    <KCircle13
                      handleFill={handleFill}
                      fillColor={fillColor.circle13}
                      circleIndex="circle13"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>82</h6>
                    <KCircle14
                      handleFill={handleFill}
                      fillColor={fillColor.circle14}
                      circleIndex="circle14"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>81</h6>
                    <KCircle15
                      handleFill={handleFill}
                      fillColor={fillColor.circle15}
                      circleIndex="circle15"
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
                    <KCircle16
                      handleFill={handleFill}
                      fillColor={fillColor.circle16}
                      circleIndex="circle16"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>72</h6>
                    <KCircle17
                      handleFill={handleFill}
                      fillColor={fillColor.circle17}
                      circleIndex="circle17"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>73</h6>
                    <KCircle18
                      handleFill={handleFill}
                      fillColor={fillColor.circle18}
                      circleIndex="circle18"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>74</h6>
                    <KCircle19
                      handleFill={handleFill}
                      fillColor={fillColor.circle19}
                      circleIndex="circle19"
                      color={color}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>75</h6>
                    <KCircle20
                      handleFill={handleFill}
                      fillColor={fillColor.circle20}
                      circleIndex="circle20"
                      color={color}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <StatusLower register={register} />
        <Legend register={register} />
        <Row>
          <Col>
            <div className="text-center">
              <Button type="submit">Submit</Button>
            </div>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default DentalChartScreen;
