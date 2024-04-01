import React from "react";
import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import GoBack from "../components/GoBack.js";
import { toast } from "react-toastify";

import { useCreatePatientMutation } from "../slices/patientsApiSlice.js";

// Components
import PatientInfo from "../components/CreatePatient/PatientInfo.js";
import ForMinorsComponent from "../components/CreatePatient/ForMinorsComponent.js";
import DentalHistoryComponent from "../components/CreatePatient/DentalHistoryComponent.js";
import PhysicianInfoComponent from "../components/CreatePatient/MedicalHistory/PhysicianInfoComponent.js";
import GoodHealthComponent from "../components/CreatePatient/MedicalHistory/GoodHealthComponent.js";
import MedicalTreatmentComponent from "../components/CreatePatient/MedicalHistory/MedicalTreatmentComponent.js";
import IllnessOrSurgicalComponent from "../components/CreatePatient/MedicalHistory/IllnessOrSurgicalComponent.js";
import HospitalizedComponent from "../components/CreatePatient/MedicalHistory/HospitalizedComponent.js";
import PrescriptionComponent from "../components/CreatePatient/MedicalHistory/PrescriptionComponent.js";
import TobaccoDrugsComponent from "../components/CreatePatient/MedicalHistory/TobaccoDrugsComponent.js";
import AllergiesComponent from "../components/CreatePatient/MedicalHistory/AllergiesComponent.js";
import ForWomanComponent from "../components/CreatePatient/MedicalHistory/ForWomanComponent.js";
import MedicalConditionComponent from "../components/CreatePatient/MedicalHistory/MedicalConditionComponent.js";

const CreatePatient = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState(null);
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [age, setAge] = useState(null);
  const [occupation, setOccupation] = useState("");
  const [religion, setReligion] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [dentalInsurance, setDentalInsurance] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");

  // For minors
  const [forMinors, setForMinors] = useState({
    parentName: "",
    parentOccupation: "",
    referral: "",
    reasonForDentalConsult: "",
  });

  // Dental History
  const [dentalHistory, setDentalHistory] = useState({
    previousDentist: "",
    lastDentalVisit: null, // Or you can set it to a default date, e.g., new Date()
  });

  // Medical History
  const [medicalHistory, setMedicalHistory] = useState({
    physicianName: "",
    specialty: "",
    officeAddress: "",
    officeNumber: null,
    isGoodHealth: null,
    isMedicalTreatment: null,
    medicalTreatmentExplanation: "",
    isIllnessOrSurgicalOperation: null,
    illnessOrSurgicalOperationExplanation: "",
    isHospitalized: null,
    hospitalizedExplanation: "",
    isPrescription: null,
    prescriptionExplanation: "",
    isTobacco: null,
    isAlcoholOrDangerousDrugs: null,
    allergies: [],
    otherAllergies: [],
    isPregnant: null,
    isNursing: null,
    isTakingPills: null,
    illnessOrDiseases: [],
    otherIllnessOrDiseases: [],
  });

  const [createPatient, { isLoading: createLoading, refetch }] =
    useCreatePatientMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await createPatient({
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
        // for minor
        forMinors,
        // Dental history
        dentalHistory,
        // Medical History
        medicalHistory,
      });

      const { _id } = response.data; // Assuming the ID of the newly created patient is returned in the response

      toast.success("Patient Created");

      setTimeout(() => {
        navigate(`/patients/updatePatient/${_id}`);
      }, 2000);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <GoBack className="btn btn-light my-3" />

      <h1>Create New Patient</h1>
      {createLoading && <Loader />}
      {/* Patient Info---------------------------- */}
      <PatientInfo
        firstName={firstName}
        middleName={middleName}
        lastName={lastName}
        gender={gender}
        address={address}
        contactNumber={contactNumber}
        email={email}
        birthday={birthday}
        age={age}
        occupation={occupation}
        religion={religion}
        bloodType={bloodType}
        bloodPressure={bloodPressure}
        dentalInsurance={dentalInsurance}
        effectiveDate={effectiveDate}
        //SET
        setFirstName={setFirstName}
        setMiddleName={setMiddleName}
        setLastName={setLastName}
        setGender={setGender}
        setAddress={setAddress}
        setContactNumber={setContactNumber}
        setEmail={setEmail}
        setBirthday={setBirthday}
        setAge={setAge}
        setOccupation={setOccupation}
        setReligion={setReligion}
        setBloodType={setBloodType}
        setBloodPressure={setBloodPressure}
        setDentalInsurance={setDentalInsurance}
        setEffectiveDate={setEffectiveDate}
      />

      <Form onSubmit={submitHandler}>
        {/* For Minors Patient-------------------------------------------- */}
        <h5 className="my-2">If The Patient is Minor</h5>

        <ForMinorsComponent
          parentName={forMinors.parentName}
          parentOccupation={forMinors.parentOccupation}
          referral={forMinors.referral}
          reasonForDentalConsult={forMinors.reasonForDentalConsult}
          setForMinors={setForMinors}
        />
        {/* Dental History--------------------------------------- */}
        <h5 className="my-2">Dental History</h5>

        <DentalHistoryComponent
          previousDentist={dentalHistory.previousDentist}
          lastDentalVisit={dentalHistory.lastDentalVisit}
          setDentalHistory={setDentalHistory}
        />

        {/* Medical History------------------------------ */}

        <h5 className="my-2">Medical History</h5>

        {/* PhysicianInfoComponent------------------- */}
        <PhysicianInfoComponent
          physicianName={medicalHistory.physicianName}
          specialty={medicalHistory.specialty}
          officeAddress={medicalHistory.officeAddress}
          officeNumber={medicalHistory.officeNumber}
          setMedicalHistory={setMedicalHistory}
        />

        <GoodHealthComponent
          isGoodHealth={medicalHistory.isGoodHealth}
          setMedicalHistory={setMedicalHistory}
        />

        {/* Medical treatment------------ */}
        <MedicalTreatmentComponent
          isMedicalTreatment={medicalHistory.isMedicalTreatment}
          medicalTreatmentExplanation={
            medicalHistory.medicalTreatmentExplanation
          }
          setMedicalHistory={setMedicalHistory}
        />
        {/* IllnessOrSurgicalComponent-------------- */}
        <IllnessOrSurgicalComponent
          isIllnessOrSurgicalOperation={
            medicalHistory.isIllnessOrSurgicalOperation
          }
          illnessOrSurgicalOperationExplanation={
            medicalHistory.illnessOrSurgicalOperationExplanation
          }
          setMedicalHistory={setMedicalHistory}
        />
        {/* Hospitalized---------- */}
        <HospitalizedComponent
          isHospitalized={medicalHistory.isHospitalized}
          hospitalizedExplanation={medicalHistory.hospitalizedExplanation}
          setMedicalHistory={setMedicalHistory}
        />
        {/* Prescription---------- */}
        <PrescriptionComponent
          isPrescription={medicalHistory.isPrescription}
          prescriptionExplanation={medicalHistory.prescriptionExplanation}
          setMedicalHistory={setMedicalHistory}
        />
        {/* tobacco and drugs--------- */}
        <TobaccoDrugsComponent
          isTobacco={medicalHistory.isTobacco}
          isAlcoholOrDangerousDrugs={medicalHistory.isAlcoholOrDangerousDrugs}
          setMedicalHistory={setMedicalHistory}
        />
        {/* Allergies----------- */}
        <AllergiesComponent
          allergies={medicalHistory.allergies}
          otherAllergies={medicalHistory.otherAllergies}
          medicalHistory={medicalHistory}
          setMedicalHistory={setMedicalHistory}
        />
        {/* For Woman Only----------- */}
        <ForWomanComponent
          isPregnant={medicalHistory.isPregnant}
          isNursing={medicalHistory.isNursing}
          isTakingPills={medicalHistory.isTakingPills}
          setMedicalHistory={setMedicalHistory}
        />

        {/* Medical Conditions------------ */}
        <MedicalConditionComponent
          illnessOrDiseases={medicalHistory.illnessOrDiseases}
          setMedicalHistory={setMedicalHistory}
          medicalHistory={medicalHistory}
        />
        {/* <Row className="justify-content-center text-center my-4">
          <Col>
            <SignatureModal saveSignature={saveSignature} />
          </Col>
        </Row> */}
        <Row className="justify-content-center text-center my-4">
          <Col>
            <Button type="submit" className="btn btn-primary mx-auto">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CreatePatient;
