import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import GoBack from "../components/GoBack.js";
import { toast } from "react-toastify";
import dentalImage from "../assets/dentalimage.jpg";

import {
  useGetPatientByIdQuery,
  useUpdatePatientMutation,
} from "../slices/patientsApiSlice.js";

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
import SignatureModal from "../components/SignatureModal.js";

import PopModal from "../components/PopModal.js";
import InformedConsentAgreement from "../components/InformedConsentAgreement.js";
import DentistSignature from "../components/DentistSignature.js";
import InformedConsent from "../components/InformedConsent.js";

const CreatePatient = () => {
  const { id: patientId } = useParams();
  const navigate = useNavigate();

  const {
    data: patient,
    isLoading,
    refetch,
    // error,
  } = useGetPatientByIdQuery(patientId);

  const [showModal, setShowModal] = useState(true);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [isSaving, setIsSaving] = useState(false); // State to track whether the save button is clicked

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
  // Image upload
  const [signatureImage, setSignatureImage] = useState("");
  // Data privacy
  const [dataPrivacySignature, setDataPrivacySignature] = useState("");
  // informed consent
  const [consentSignature, setConsentSignature] = useState("");
  const [dentistSignature, setDentistSignature] = useState("");
  const [consentDate, setConsentDate] = useState("");

  // For minors
  const [forMinors, setForMinors] = useState({
    parentName: "",
    parentOccupation: "",
    referral: "",
    reasonForDentalConsult: "",
  });

  // const { parentName, parentOccupation, referral, reasonForDentalConsult } =
  //   forMinors;

  // Dental History
  const [dentalHistory, setDentalHistory] = useState({
    previousDentist: "",
    lastDentalVisit: "", // Or you can set it to a default date, e.g., new Date()
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

  const [updatePatient, { isLoading: loadingUpdate }] =
    useUpdatePatientMutation();

  useEffect(() => {
    // Set other properties
    if (patient) {
      setFirstName(patient.firstName);
      setMiddleName(patient.middleName);
      setLastName(patient.lastName);
      setGender(patient.gender);
      setAddress(patient.address);
      setContactNumber(patient.contactNumber);
      setEmail(patient.email);
      setBirthday(patient.birthday);
      setAge(patient.age);
      setOccupation(patient.occupation);
      setReligion(patient.religion);
      setBloodType(patient.bloodType);
      setBloodPressure(patient.bloodPressure);
      setDentalInsurance(patient.dentalInsurance);
      setEffectiveDate(patient.effectiveDate);
      setSignatureImage(patient.signatureImage);
      setDataPrivacySignature(patient.dataPrivacySignature);
      setConsentSignature(patient.consentSignature);
      setDentistSignature(patient.dentistSignature);
      setConsentDate(patient.consentDate);
    }
  }, [patient]);

  useEffect(() => {
    if (patient) {
      const firstGuardian = patient.forMinors[0];
      setForMinors({
        parentName: firstGuardian.parentName,
        parentOccupation: firstGuardian.parentOccupation,
        referral: firstGuardian.referral,
        reasonForDentalConsult: firstGuardian.reasonForDentalConsult,
      });
    }
  }, [patient]);

  useEffect(() => {
    if (patient && patient.dentalHistory) {
      const dentalHistoryData = patient.dentalHistory[0]; // Assuming there's only one dental history entry
      setDentalHistory({
        previousDentist: dentalHistoryData.previousDentist,
        lastDentalVisit: dentalHistoryData.lastDentalVisit || "", // Assuming lastDentalVisit is a Date
      });
    }
  }, [patient]);

  useEffect(() => {
    if (patient && patient.medicalHistory) {
      const medicalHistoryData = patient.medicalHistory[0]; // Assuming there's only one medical history entry
      setMedicalHistory({
        physicianName: medicalHistoryData.physicianName,
        specialty: medicalHistoryData.specialty,
        officeAddress: medicalHistoryData.officeAddress,
        officeNumber: medicalHistoryData.officeNumber || null,
        isGoodHealth: medicalHistoryData.isGoodHealth || null,
        isMedicalTreatment: medicalHistoryData.isMedicalTreatment || null,
        medicalTreatmentExplanation:
          medicalHistoryData.medicalTreatmentExplanation,
        isIllnessOrSurgicalOperation:
          medicalHistoryData.isIllnessOrSurgicalOperation || null,
        illnessOrSurgicalOperationExplanation:
          medicalHistoryData.illnessOrSurgicalOperationExplanation,
        isHospitalized: medicalHistoryData.isHospitalized || null,
        hospitalizedExplanation: medicalHistoryData.hospitalizedExplanation,
        isPrescription: medicalHistoryData.isPrescription || null,
        prescriptionExplanation: medicalHistoryData.prescriptionExplanation,
        isTobacco: medicalHistoryData.isTobacco || null,
        isAlcoholOrDangerousDrugs:
          medicalHistoryData.isAlcoholOrDangerousDrugs || null,
        allergies: medicalHistoryData.allergies || [],
        otherAllergies: medicalHistoryData.otherAllergies || [],
        isPregnant: medicalHistoryData.isPregnant || null,
        isNursing: medicalHistoryData.isNursing || null,
        isTakingPills: medicalHistoryData.isTakingPills || null,
        illnessOrDiseases: medicalHistoryData.illnessOrDiseases || [],
        otherIllnessOrDiseases: medicalHistoryData.otherIllnessOrDiseases || [],
      });
    }
  }, [patient]);

  const { parentName, parentOccupation, referral, reasonForDentalConsult } =
    forMinors;

  const { previousDentist, lastDentalVisit } = dentalHistory;

  const {
    physicianName,
    specialty,
    officeAddress,
    officeNumber,
    //
    isGoodHealth,
    //
    isMedicalTreatment,
    medicalTreatmentExplanation,
    //
    isIllnessOrSurgicalOperation,
    illnessOrSurgicalOperationExplanation,
    //
    isHospitalized,
    hospitalizedExplanation,
    //
    isPrescription,
    prescriptionExplanation,
    //
    isTobacco,
    isAlcoholOrDangerousDrugs,
  } = medicalHistory;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (isSaving) return; // If already saving, return to avoid multiple clicks

    setIsSaving(true); // Set isSaving to true when the button is clicked

    try {
      await updatePatient({
        patientId,
        //signature
        signatureImage,
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
        dataPrivacySignature,
        consentSignature,
        dentistSignature,
        consentDate,
      }).unwrap();

      setIsSaving(false);
      toast.success("Patient Updated");
      refetch();
      navigate(`/onePatient/${patientId}`);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Row>
        <Col className="mb-2 d-flex justify-content-center">
          <Image src={dentalImage} alt="image" fluid className="small-image" />
        </Col>
      </Row>
      <GoBack className="btn btn-light" />

      <h1 className="my-3">New Patient</h1>
      {isLoading && <Loader />}
      {/* Patient Info---------------------------- */}
      <PopModal
        dataPrivacySignature={dataPrivacySignature}
        setDataPrivacySignature={setDataPrivacySignature}
        show={showModal}
        onHide={handleCloseModal}
      />

      <Form onSubmit={submitHandler}>
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
          //
        />
        {/* For Minors Patient-------------------------------------------- */}
        <h5 className="my-2">If The Patient is Minor</h5>
        <ForMinorsComponent
          parentName={parentName}
          parentOccupation={parentOccupation}
          referral={referral}
          reasonForDentalConsult={reasonForDentalConsult}
          setForMinors={setForMinors}
          //
        />
        {/* Dental History--------------------------------------- */}
        <h5 className="my-2">Dental History</h5>
        <DentalHistoryComponent
          previousDentist={previousDentist}
          lastDentalVisit={lastDentalVisit}
          setDentalHistory={setDentalHistory}
        />
        {/* Medical History------------------------------ */}
        <h5 className="my-2">Medical History</h5>
        {/* PhysicianInfoComponent------------------- */}
        <PhysicianInfoComponent
          physicianName={physicianName}
          specialty={specialty}
          officeAddress={officeAddress}
          officeNumber={officeNumber}
          setMedicalHistory={setMedicalHistory}
        />
        <GoodHealthComponent
          isGoodHealth={isGoodHealth}
          setMedicalHistory={setMedicalHistory}
        />
        {/* Medical treatment------------ */}
        <MedicalTreatmentComponent
          isMedicalTreatment={isMedicalTreatment}
          medicalTreatmentExplanation={medicalTreatmentExplanation}
          setMedicalHistory={setMedicalHistory}
        />
        {/* IllnessOrSurgicalComponent-------------- */}
        <IllnessOrSurgicalComponent
          isIllnessOrSurgicalOperation={isIllnessOrSurgicalOperation}
          illnessOrSurgicalOperationExplanation={
            illnessOrSurgicalOperationExplanation
          }
          setMedicalHistory={setMedicalHistory}
        />
        {/* Hospitalized---------- */}
        <HospitalizedComponent
          isHospitalized={isHospitalized}
          hospitalizedExplanation={hospitalizedExplanation}
          setMedicalHistory={setMedicalHistory}
        />
        {/* Prescription---------- */}
        <PrescriptionComponent
          isPrescription={isPrescription}
          prescriptionExplanation={prescriptionExplanation}
          setMedicalHistory={setMedicalHistory}
        />
        {/* tobacco and drugs--------- */}
        <TobaccoDrugsComponent
          isTobacco={isTobacco}
          isAlcoholOrDangerousDrugs={isAlcoholOrDangerousDrugs}
          setMedicalHistory={setMedicalHistory}
        />
        {/* Allergies----------- */}
        <AllergiesComponent
          // allergies={allergies}
          // otherAllergies={otherAllergies}
          medicalHistory={medicalHistory}
          setMedicalHistory={setMedicalHistory}
          allergies={medicalHistory.allergies}
          patientId={patientId}
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
        <h4 className="my-3">Patient Signature</h4>
        <Row id="sig" className=" text-start my-1">
          <Col>
            <SignatureModal
              setSignatureImage={setSignatureImage}
              signatureImage={signatureImage}
              refetch
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <h3 className="text-center">
              INFORMED CONSENT TREATMENT TO BE DONE{" "}
            </h3>
          </Col>
        </Row>

        <InformedConsentAgreement />
        <Row>
          <Col sm={2} md={2} lg={2}>
            <Form.Group controlId="consentDate" className="mb-3">
              <Form.Label>Consent Date</Form.Label>
              <Form.Control
                required
                type="date"
                value={consentDate || ""}
                onChange={(e) => setConsentDate(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex">
            <InformedConsent
              consentSignature={consentSignature}
              setConsentSignature={setConsentSignature}
            />

            <DentistSignature
              dentistSignature={dentistSignature}
              setDentistSignature={setDentistSignature}
            />
          </Col>
        </Row>

        <Row className="justify-content-center text-center my-4">
          <Col>
            <Button
              type="submit"
              className="btn btn-primary mx-auto"
              disabled={
                !signatureImage.url ||
                !consentSignature.url ||
                !dentistSignature.url ||
                isSaving
              }
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CreatePatient;
