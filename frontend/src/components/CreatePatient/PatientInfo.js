import React from "react";
import { Form, Row, Col } from "react-bootstrap";
//import { useGetPatientByIdQuery } from "../../slices/patientsApiSlice.js";

const PatientInfo = (props) => {
  const {
    firstName,
    middleName,
    lastName,
    gender,
    address,
    contactNumber,
    email,
    birthday,
    age,
    occupation,
    religion,
    bloodType,
    bloodPressure,
    dentalInsurance,
    effectiveDate,

    //SET
    setFirstName,
    setMiddleName,
    setLastName,
    setGender,
    setAddress,
    setContactNumber,
    setEmail,
    setBirthday,
    setAge,
    setOccupation,
    setReligion,
    setBloodType,
    setBloodPressure,
    setDentalInsurance,
    setEffectiveDate,

    //
  } = props;

  return (
    <>
      <Row className="justify-content-center">
        <Col md={3}>
          <Form.Group controlId="firstName" className="my-2">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              value={firstName || ""}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="middleName" className="my-2">
            <Form.Label>Middle Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Middle Name"
              value={middleName || ""}
              onChange={(e) => setMiddleName(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="lastName" className="my-2">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              value={lastName || ""}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="gender" className="my-2">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              value={gender || ""}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Choose Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="others">Others</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="address" className="my-2">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={address || ""}
              placeholder="Enter Complete Address"
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="birthday" className="my-2">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              value={birthday || ""}
              onChange={(e) => setBirthday(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="age" className="my-2">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              value={age || ""}
              placeholder="Enter Age"
              max="99" // Set the maximum value to 99
              onChange={(e) => setAge(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row className="justify-content-start">
        <Col md={3}>
          <Form.Group controlId="religion" className="my-2">
            <Form.Label>Religion</Form.Label>
            <Form.Control
              type="text"
              value={religion || ""}
              placeholder="Enter Religion"
              onChange={(e) => setReligion(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="occupation" className="my-2">
            <Form.Label>Occupation</Form.Label>
            <Form.Control
              type="text"
              value={occupation || ""}
              placeholder="Enter occupation"
              onChange={(e) => setOccupation(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email || ""}
              placeholder="Enter Email Address"
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="contactNumber" className="my-2">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="number"
              value={contactNumber || ""}
              placeholder="Enter Contact Number"
              onChange={(e) => setContactNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Form.Group controlId="bloodType" className="my-2">
            <Form.Label>Blood Type</Form.Label>
            <Form.Control
              type="text"
              value={bloodType || ""}
              placeholder="Enter Blood type"
              onChange={(e) => setBloodType(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="bloodPressure" className="my-2">
            <Form.Label>Blood Pressure</Form.Label>
            <Form.Control
              type="text"
              value={bloodPressure || ""}
              placeholder="Enter Blood Pressure"
              onChange={(e) => setBloodPressure(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="dentalInsurance" className="my-2">
            <Form.Label>Dental Insurance</Form.Label>
            <Form.Control
              type="text"
              value={dentalInsurance || ""}
              placeholder="Enter Dental Insurance"
              onChange={(e) => setDentalInsurance(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="effectiveDate" className="my-2">
            <Form.Label>Effective Date</Form.Label>
            <Form.Control
              type="date"
              value={effectiveDate || ""}
              onChange={(e) => setEffectiveDate(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default PatientInfo;
