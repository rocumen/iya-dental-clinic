import React, { useState, useEffect } from "react";
import {
  useGetDentalChartKidsQuery,
  useUpdateDentalChartKidsMutation,
  useGetPatientByIdQuery,
} from "../slices/patientsApiSlice.js";
import { useParams } from "react-router-dom";
import { Row, Col, Button, Image } from "react-bootstrap";

import StatusLower from "../components/Dental Chart/StatusLower.js";
import StatusUpper from "../components/Dental Chart/StatusUpper.js";

import UpperLeftCircle from "../components/updateCircleKids/UpperLeftCircle.js";
import UpperRightCircle from "../components/updateCircleKids/UpperRightCircle.js";
import LowerRightCircle from "../components/updateCircleKids/LowerRightCircle.js";
import LowerLeftCircle from "../components/updateCircleKids/LowerLeftCircle.js";
import Legend from "../components/Dental Chart/Legend.js";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

import dentalImage from "../assets/dentalimage.jpg";

const UpdateDentalChartKids = () => {
  const { patientId, dentalChartId } = useParams();

  const { data, isLoading } = useGetDentalChartKidsQuery({
    patientId,
    dentalChartId,
  });

  const { data: patient } = useGetPatientByIdQuery(patientId);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    // Populate the form field once data is available
    if (data && data?.statusTopLeft) {
      // TOP RIGHT
      setValue("statusTopRightBox1", data?.statusTopRight?.box1);
      setValue("statusTopRightBox2", data?.statusTopRight?.box2);
      setValue("statusTopRightBox3", data?.statusTopRight?.box3);
      setValue("statusTopRightBox4", data?.statusTopRight?.box4);
      setValue("statusTopRightBox5", data?.statusTopRight?.box5);
      setValue("statusTopRightBox6", data?.statusTopRight?.box6);
      setValue("statusTopRightBox7", data?.statusTopRight?.box7);
      setValue("statusTopRightBox8", data?.statusTopRight?.box8);
      setValue("statusTopRightBox9", data?.statusTopRight?.box9);
      setValue("statusTopRightBox10", data?.statusTopRight?.box10);
      // TOP LEFT
      setValue("statusTopLeftBox1", data?.statusTopLeft?.box1);
      setValue("statusTopLeftBox2", data?.statusTopLeft?.box2);
      setValue("statusTopLeftBox3", data?.statusTopLeft?.box3);
      setValue("statusTopLeftBox4", data?.statusTopLeft?.box4);
      setValue("statusTopLeftBox5", data?.statusTopLeft?.box5);
      setValue("statusTopLeftBox6", data?.statusTopLeft?.box6);
      setValue("statusTopLeftBox7", data?.statusTopLeft?.box7);
      setValue("statusTopLeftBox8", data?.statusTopLeft?.box8);
      setValue("statusTopLeftBox9", data?.statusTopLeft?.box9);
      setValue("statusTopLeftBox10", data?.statusTopLeft?.box10);
      //BOTTOM RIGHT
      setValue("statusBottomRightBox1", data?.statusBottomRight?.box1);
      setValue("statusBottomRightBox2", data?.statusBottomRight?.box2);
      setValue("statusBottomRightBox3", data?.statusBottomRight?.box3);
      setValue("statusBottomRightBox4", data?.statusBottomRight?.box4);
      setValue("statusBottomRightBox5", data?.statusBottomRight?.box5);
      setValue("statusBottomRightBox6", data?.statusBottomRight?.box6);
      setValue("statusBottomRightBox7", data?.statusBottomRight?.box7);
      setValue("statusBottomRightBox8", data?.statusBottomRight?.box8);
      setValue("statusBottomRightBox9", data?.statusBottomRight?.box9);
      setValue("statusBottomRightBox10", data?.statusBottomRight?.box10);
      // BOTTOM LEFT
      setValue("statusBottomLeftBox1", data?.statusBottomLeft?.box1);
      setValue("statusBottomLeftBox2", data?.statusBottomLeft?.box2);
      setValue("statusBottomLeftBox3", data?.statusBottomLeft?.box3);
      setValue("statusBottomLeftBox4", data?.statusBottomLeft?.box4);
      setValue("statusBottomLeftBox5", data?.statusBottomLeft?.box5);
      setValue("statusBottomLeftBox6", data?.statusBottomLeft?.box6);
      setValue("statusBottomLeftBox7", data?.statusBottomLeft?.box7);
      setValue("statusBottomLeftBox8", data?.statusBottomLeft?.box8);
      setValue("statusBottomLeftBox9", data?.statusBottomLeft?.box9);
      setValue("statusBottomLeftBox10", data?.statusBottomLeft?.box10);
    }
  }, [data, setValue]);

  useEffect(() => {
    if (data && data?.xrayTaken) {
      setValue("periapical", data?.xrayTaken?.periapical);
      setValue("panoramic", data?.xrayTaken?.panoramic);
      setValue("cephalometric", data?.xrayTaken?.cephalometric);
      setValue("occlusal", data?.xrayTaken?.occlusal);
      setValue("othersXray", data?.xrayTaken?.othersXray);
    }

    if (data && data?.periodontalScreening) {
      setValue("gingivitis", data?.periodontalScreening?.gingivitis);
      setValue(
        "earlyPeriodontitis",
        data?.periodontalScreening?.earlyPeriodontitis
      );
      setValue(
        "moderatePeriodontitis",
        data?.periodontalScreening?.moderatePeriodontitis
      );
      setValue(
        "advancedPeriodontitis",
        data?.periodontalScreening?.advancedPeriodontitis
      );
    }

    if (data && data?.occlusion) {
      setValue("class", data?.occlusion?.class);
      setValue("overjet", data?.occlusion?.overjet);
      setValue("overbite", data?.occlusion?.overbite);
      setValue("midlineDeviation", data?.occlusion?.midlineDeviation);
      setValue("crossbite", data?.occlusion?.crossbite);
    }

    if (data && data?.appliances) {
      setValue("orthodontic", data?.appliances?.orthodontic);
      setValue("stayplate", data?.appliances?.stayplate);
      setValue("othersAppliances", data?.appliances?.othersAppliances);
    }

    if (data && data?.tmd) {
      setValue("clenching", data?.tmd?.clenching);
      setValue("clicking", data?.tmd?.clicking);
      setValue("trismus", data?.tmd?.trismus);
      setValue("muscleSpasm", data?.tmd?.muscleSpasm);
    }
  }, [data, setValue]);

  // console.log(data);
  const [updateDentalChartKids] = useUpdateDentalChartKidsMutation();

  const [color, setColor] = useState("#D3D3D3"); // Default color is gray

  const [fillColor, setFillColor] = useState({
    circle1: {
      colorTop: data?.upperRightCircle?.one?.colorTop || "",
      colorBottom: data?.upperRightCircle?.one?.colorTop || "",
      colorRight: data?.upperRightCircle?.one?.colorRight || "",
      colorLeft: data?.upperRightCircle?.one?.colorLeft || "",
      donut_hole: data?.upperRightCircle?.one?.donut_hole || "",
    },
    circle2: {
      colorTop: data?.upperRightCircle?.two?.colorTop || "",
      colorBottom: data?.upperRightCircle?.two?.colorTop || "",
      colorRight: data?.upperRightCircle?.two?.colorRight || "",
      colorLeft: data?.upperRightCircle?.two?.colorLeft || "",
      donut_hole: data?.upperRightCircle?.two?.donut_hole || "",
    },
    circle3: {
      colorTop: data?.upperRightCircle?.three?.colorTop || "",
      colorBottom: data?.upperRightCircle?.three?.colorTop || "",
      colorRight: data?.upperRightCircle?.three?.colorRight || "",
      colorLeft: data?.upperRightCircle?.three?.colorLeft || "",
      donut_hole: data?.upperRightCircle?.three?.donut_hole || "",
    },
    circle4: {
      colorTop: data?.upperRightCircle?.four?.colorTop || "",
      colorBottom: data?.upperRightCircle?.four?.colorTop || "",
      colorRight: data?.upperRightCircle?.four?.colorRight || "",
      colorLeft: data?.upperRightCircle?.four?.colorLeft || "",
      donut_hole: data?.upperRightCircle?.four?.donut_hole || "",
    },
    circle5: {
      colorTop: data?.upperRightCircle?.five?.colorTop || "",
      colorBottom: data?.upperRightCircle?.five?.colorTop || "",
      colorRight: data?.upperRightCircle?.five?.colorRight || "",
      colorLeft: data?.upperRightCircle?.five?.colorLeft || "",
      donut_hole: data?.upperRightCircle?.five?.donut_hole || "",
    },
    circle6: {
      colorTop: data?.upperLeftCircle?.six?.colorTop || "",
      colorBottom: data?.upperLeftCircle?.six?.colorTop || "",
      colorRight: data?.upperLeftCircle?.six?.colorRight || "",
      colorLeft: data?.upperLeftCircle?.six?.colorLeft || "",
      donut_hole: data?.upperLeftCircle?.six?.donut_hole || "",
    },
    circle7: {
      colorTop: data?.upperLeftCircle?.seven?.colorTop || "",
      colorBottom: data?.upperLeftCircle?.seven?.colorTop || "",
      colorRight: data?.upperLeftCircle?.seven?.colorRight || "",
      colorLeft: data?.upperLeftCircle?.seven?.colorLeft || "",
      donut_hole: data?.upperLeftCircle?.seven?.donut_hole || "",
    },
    circle8: {
      colorTop: data?.upperLeftCircle?.eight?.colorTop || "",
      colorBottom: data?.upperLeftCircle?.eight?.colorTop || "",
      colorRight: data?.upperLeftCircle?.eight?.colorRight || "",
      colorLeft: data?.upperLeftCircle?.eight?.colorLeft || "",
      donut_hole: data?.upperLeftCircle?.eight?.donut_hole || "",
    },
    circle9: {
      colorTop: data?.upperLeftCircle?.nine?.colorTop || "",
      colorBottom: data?.upperLeftCircle?.nine?.colorTop || "",
      colorRight: data?.upperLeftCircle?.nine?.colorRight || "",
      colorLeft: data?.upperLeftCircle?.nine?.colorLeft || "",
      donut_hole: data?.upperLeftCircle?.nine?.donut_hole || "",
    },
    circle10: {
      colorTop: data?.upperLeftCircle?.ten?.colorTop || "",
      colorBottom: data?.upperLeftCircle?.ten?.colorTop || "",
      colorRight: data?.upperLeftCircle?.ten?.colorRight || "",
      colorLeft: data?.upperLeftCircle?.ten?.colorLeft || "",
      donut_hole: data?.upperLeftCircle?.ten?.donut_hole || "",
    },
    circle11: {
      colorTop: data?.lowerRightCircle?.eleven?.colorTop || "",
      colorBottom: data?.lowerRightCircle?.eleven?.colorTop || "",
      colorRight: data?.lowerRightCircle?.eleven?.colorRight || "",
      colorLeft: data?.lowerRightCircle?.eleven?.colorLeft || "",
      donut_hole: data?.lowerRightCircle?.eleven?.donut_hole || "",
    },
    circle12: {
      colorTop: data?.lowerRightCircle?.twelve?.colorTop || "",
      colorBottom: data?.lowerRightCircle?.twelve?.colorTop || "",
      colorRight: data?.lowerRightCircle?.twelve?.colorRight || "",
      colorLeft: data?.lowerRightCircle?.twelve?.colorLeft || "",
      donut_hole: data?.lowerRightCircle?.twelve?.donut_hole || "",
    },
    circle13: {
      colorTop: data?.lowerRightCircle?.thirteen?.colorTop || "",
      colorBottom: data?.lowerRightCircle?.thirteen?.colorTop || "",
      colorRight: data?.lowerRightCircle?.thirteen?.colorRight || "",
      colorLeft: data?.lowerRightCircle?.thirteen?.colorLeft || "",
      donut_hole: data?.lowerRightCircle?.thirteen?.donut_hole || "",
    },
    circle14: {
      colorTop: data?.lowerRightCircle?.fourteen?.colorTop || "",
      colorBottom: data?.lowerRightCircle?.fourteen?.colorTop || "",
      colorRight: data?.lowerRightCircle?.fourteen?.colorRight || "",
      colorLeft: data?.lowerRightCircle?.fourteen?.colorLeft || "",
      donut_hole: data?.lowerRightCircle?.fourteen?.donut_hole || "",
    },
    circle15: {
      colorTop: data?.lowerRightCircle?.fifteen?.colorTop || "",
      colorBottom: data?.lowerRightCircle?.fifteen?.colorTop || "",
      colorRight: data?.lowerRightCircle?.fifteen?.colorRight || "",
      colorLeft: data?.lowerRightCircle?.fifteen?.colorLeft || "",
      donut_hole: data?.lowerRightCircle?.fifteen?.donut_hole || "",
    },
    circle16: {
      colorTop: data?.lowerLeftCircle?.sixteen?.colorTop || "",
      colorBottom: data?.lowerLeftCircle?.sixteen?.colorTop || "",
      colorRight: data?.lowerLeftCircle?.sixteen?.colorRight || "",
      colorLeft: data?.lowerLeftCircle?.sixteen?.colorLeft || "",
      donut_hole: data?.lowerLeftCircle?.sixteen?.donut_hole || "",
    },
    circle17: {
      colorTop: data?.lowerLeftCircle?.seventeen?.colorTop || "",
      colorBottom: data?.lowerLeftCircle?.seventeen?.colorTop || "",
      colorRight: data?.lowerLeftCircle?.seventeen?.colorRight || "",
      colorLeft: data?.lowerLeftCircle?.seventeen?.colorLeft || "",
      donut_hole: data?.lowerLeftCircle?.seventeen?.donut_hole || "",
    },
    circle18: {
      colorTop: data?.lowerLeftCircle?.eighteen?.colorTop || "",
      colorBottom: data?.lowerLeftCircle?.eighteen?.colorTop || "",
      colorRight: data?.lowerLeftCircle?.eighteen?.colorRight || "",
      colorLeft: data?.lowerLeftCircle?.eighteen?.colorLeft || "",
      donut_hole: data?.lowerLeftCircle?.eighteen?.donut_hole || "",
    },
    circle19: {
      colorTop: data?.lowerLeftCircle?.nineteen?.colorTop || "",
      colorBottom: data?.lowerLeftCircle?.nineteen?.colorTop || "",
      colorRight: data?.lowerLeftCircle?.nineteen?.colorRight || "",
      colorLeft: data?.lowerLeftCircle?.nineteen?.colorLeft || "",
      donut_hole: data?.lowerLeftCircle?.nineteen?.donut_hole || "",
    },
    circle20: {
      colorTop: data?.lowerLeftCircle?.twenty?.colorTop || "",
      colorBottom: data?.lowerLeftCircle?.twenty?.colorTop || "",
      colorRight: data?.lowerLeftCircle?.twenty?.colorRight || "",
      colorLeft: data?.lowerLeftCircle?.twenty?.colorLeft || "",
      donut_hole: data?.lowerLeftCircle?.twenty?.donut_hole || "",
    },
  });

  useEffect(() => {
    // console.log(fillColor);
  }, [fillColor]);

  const handleFill = (circleIndex, section, color) => {
    setFillColor((prevState) => ({
      ...prevState,
      [circleIndex]: {
        ...prevState[circleIndex],
        [section]: color,
      },
    }));
  };

  const submitHandler = async (values) => {
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

    const statusTopRight = {
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
      box1: values.statusTopLeftBox1,
      box2: values.statusTopLeftBox2,
      box3: values.statusTopLeftBox3,
      box4: values.statusTopLeftBox4,
      box5: values.statusTopLeftBox5,
      box6: values.statusTopLeftBox6,
      box7: values.statusTopLeftBox7,
      box8: values.statusTopLeftBox8,
      box9: values.statusTopLeftBox9,
      box10: values.statusTopRightBox10,
    };

    const statusBottomRight = {
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
      box1: values.statusBottomLeftBox1,
      box2: values.statusBottomLeftBox2,
      box3: values.statusBottomLeftBox3,
      box4: values.statusBottomLeftBox4,
      box5: values.statusBottomLeftBox5,
      box6: values.statusBottomLeftBox6,
      box7: values.statusBottomLeftBox7,
      box8: values.statusBottomLeftBox8,
      box9: values.statusBottomLeftBox9,
      box10: values.statusBottomRightBox10,
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
      await updateDentalChartKids({
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
      }).unwrap();

      toast.success("Chart Saved");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {isLoading && <h5>Loading</h5>}

      <Row>
        <Col className="mb-2 d-flex justify-content-center">
          <Image src={dentalImage} alt="image" fluid className="small-image" />
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <h1 className="text-center">Update Child Dental Record Chart</h1>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>INTRAORAL EXAMINATION</Col>
        <Col>
          <strong>Name:</strong> {patient?.lastName}, {patient?.firstName}
        </Col>
        <Col>Age: {patient?.age}</Col>
        <Col>Gender: {patient?.gender}</Col>
        <Col>Date</Col>
      </Row>
      {/* Status Upper */}
      <StatusUpper register={register} data={data} />
      {/* Color Selector */}
      <Row>
        <Col className="d-flex my-3 text-center justify-content-center">
          <div className="mx-2 circleRed" onClick={() => setColor("#ed0202")}>
            {/* Red */}
          </div>
          <div className="mx-2 circleBlue" onClick={() => setColor("#1c00f0")}>
            {/* Blue */}
          </div>
          <div className="mx-2 circleBlack" onClick={() => setColor("#000000")}>
            {/* Black */}
          </div>
          <div className="mx-2 circleClear" onClick={() => setColor("#D3D3D3")}>
            {/* Clear */}
          </div>
        </Col>
      </Row>
      {/* Circles 1-5 */}
      <Row className="justify-content-between text-center">
        <UpperRightCircle
          upperRight={data?.upperRightCircle}
          handleFill={handleFill}
          fillColor={fillColor}
          color={color}
          setFillColor={setFillColor}
        />

        <UpperLeftCircle
          upperLeft={data?.upperLeftCircle}
          handleFill={handleFill}
          fillColor={fillColor}
          color={color}
          setFillColor={setFillColor}
        />
      </Row>
      <hr></hr>
      <Row className="justify-content-between text-center">
        <LowerRightCircle
          lowerRight={data?.lowerRightCircle}
          handleFill={handleFill}
          fillColor={fillColor}
          color={color}
          setFillColor={setFillColor}
        />

        <LowerLeftCircle
          lowerLeft={data?.lowerLeftCircle}
          handleFill={handleFill}
          fillColor={fillColor}
          color={color}
          setFillColor={setFillColor}
        />
      </Row>

      <StatusLower register={register} />
      <Legend register={register} />
      <Row>
        <Col>
          <div className="text-center">
            <Button type="submit">Save</Button>
          </div>
        </Col>
      </Row>
    </form>
  );
};

export default UpdateDentalChartKids;
