import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import GoBack from "../../components/GoBack.js";
import { toast } from "react-toastify";
import dentalImage from "../../assets/dentalimage.jpg";

import {
  useGetOldPatientByIdQuery,
  useUpdateOldPatientMutation,
  useUploadPatientImageMutation,
} from "../../slices/patientsApiSlice.js";

// uploadPatientImage
// Components

import SignatureModal from "../../components/SignatureModal.js";

import PopModal from "../../components/PopModal.js";
import InformedConsentAgreement from "../../components/InformedConsentAgreement.js";
import DentistSignature from "../../components/DentistSignature.js";
import InformedConsent from "../../components/InformedConsent.js";

const UpdateOldPatient = () => {
  const { id: patientId } = useParams();
  const navigate = useNavigate();

  const {
    data: patient,
    isLoading,
    refetch,
    // error,
  } = useGetOldPatientByIdQuery(patientId);

  const [uploadPatientImage] = useUploadPatientImageMutation();

  const [showModal, setShowModal] = useState(true);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [isSaving, setIsSaving] = useState(false); // State to track whether the save button is clicked

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("");
  const [patientImage, setPatientImage] = useState([]);

  // Image upload
  const [signatureImage, setSignatureImage] = useState("");
  // Data privacy
  const [dataPrivacySignature, setDataPrivacySignature] = useState("");
  // informed consent
  const [consentSignature, setConsentSignature] = useState("");
  const [dentistSignature, setDentistSignature] = useState("");
  const [consentDate, setConsentDate] = useState("");

  const [updatePatient] = useUpdateOldPatientMutation();

  useEffect(() => {
    // Set other properties
    if (patient) {
      setFirstName(patient.firstName);
      setMiddleName(patient.middleName);
      setLastName(patient.lastName);
      setGender(patient.gender);
      setAge(patient.age);

      setSignatureImage(patient.signatureImage);
      setDataPrivacySignature(patient.dataPrivacySignature);
      setConsentSignature(patient.consentSignature);
      setDentistSignature(patient.dentistSignature);
      setConsentDate(patient.consentDate);
      setPatientImage(patient.patientImage);
    }
  }, [patient]);

  useEffect(() => {
    setPatientImage(patientImage);
  }, [patientImage]);

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
        age,
        patientImage,

        dataPrivacySignature,
        consentSignature,
        dentistSignature,
        consentDate,
      }).unwrap();

      setIsSaving(false);
      toast.success("Patient Updated");
      refetch();
      navigate(`/oldPatient/${patientId}`);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleFileUpload = async (e) => {
    const fileInput = document.getElementById("fileInput");
    const files = fileInput.files;

    if (!files.length) {
      toast.error("Please select at least one file.");
      return;
    }

    if (files.length > 5) {
      toast.error("You can only upload 5 Images");
      return;
    }

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];

    for (const file of files) {
      if (!allowedMimeTypes.includes(file.type)) {
        toast.error("Only images (JPEG, PNG, GIF) are allowed to upload");
        return;
      }
    }

    if (isSaving) return; // If already saving, return to avoid multiple clicks

    setIsSaving(true); // Set isSaving to true when the button is clicked

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("patientImage", files[i]);
    }

    try {
      const { data } = await uploadPatientImage(formData); // Update function name
      toast.success(data.message);

      setIsSaving(false);
      setPatientImage(data.patientImages);
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
      {isLoading && <Loader />}

      <h1 className="my-3">New Patient</h1>
      <Row>
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
      </Row>
      <Row>
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
      <Row className="justify-content-start my-2">
        {/* Image Upload */}
        <Col md={3}>
          <p className="text-danger">Maximum of 5 Images</p>
          <Form.Group>
            <Form.Control
              id="fileInput"
              type="file"
              label="Choose file"
              multiple // Allow multiple file selection
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Button
            disabled={isSaving || patientImage?.length > 0}
            onClick={handleFileUpload}
          >
            {isSaving ? "Uploading..." : "Upload"}
          </Button>
        </Col>
      </Row>

      {/* Patient Info---------------------------- */}
      <PopModal
        dataPrivacySignature={dataPrivacySignature}
        setDataPrivacySignature={setDataPrivacySignature}
        show={showModal}
        onHide={handleCloseModal}
      />

      <Form onSubmit={submitHandler}>
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
              //   disabled={
              //     !signatureImage.url ||
              //     !consentSignature.url ||
              //     !dentistSignature.url ||
              //     isSaving
              //   }
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default UpdateOldPatient;
