import React, { useState } from "react";
import { Table, Row, Col, Image, Button, Modal } from "react-bootstrap";
import Loader from "../../components/Loader.js";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { useGetOldPatientByIdQuery } from "../../slices/patientsApiSlice.js";

import dentalImage from "../../assets/dentalimage.jpg";
import InformedConsentAgreement from "../../components/InformedConsentAgreement.js";

const OldPatientScreen = () => {
  const { id: patientId } = useParams();
  const navigate = useNavigate();

  const {
    data: patient,
    isLoading,
    error,
    refetch,
  } = useGetOldPatientByIdQuery(patientId);

  console.log(patient);

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigateHandler = () => {
    navigate("/oldRecords");
  };

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>{error.message}</p>}

      <Row>
        <Col className="mb-2 d-flex justify-content-center">
          <Image src={dentalImage} alt="image" fluid className="small-image" />
        </Col>
      </Row>
      <Link>
        <Button
          onClick={navigateHandler}
          variant="dark"
          className="text-light my-4"
          size="md"
        >
          <FaArrowLeft /> Go Back
        </Button>
      </Link>

      <h3>Patient Information Record</h3>

      <Row className=" justify-content-start">
        <Col md={6} lg={6}>
          <Table striped bordered hover size="sm">
            <tbody>
              <tr>
                <td className="text-center">First Name</td>
                <td className="col-8 text-center">
                  {patient?.firstName || "-"}
                </td>
              </tr>

              <tr>
                <td className="text-center">Middle Name</td>
                <td className="col-8 text-center">
                  {patient?.middleName || "-"}
                </td>
              </tr>
              <tr>
                <td className="text-center">Last Name</td>
                <td className="col-8 text-center">
                  {patient?.lastName || "-"}
                </td>
              </tr>
              <tr>
                <td className="text-center">Age</td>
                <td className="col-8 text-center">{patient?.age || "-"}</td>
              </tr>
              <tr>
                <td className="text-center">Gender</td>
                <td className="col-8 text-center">{patient?.gender || "-"}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row>
        <Col>
          {patient?.patientImage?.map((image, index) => (
            <React.Fragment key={index}>
              {image.url ? (
                <>
                  <Image
                    rounded
                    className="mx-2 my-2 clickable-image"
                    style={{
                      height: "200px",
                      width: "200px",
                      cursor: "pointer",
                    }}
                    fluid
                    src={image.url}
                    onClick={() => handleImageClick(image.url)}
                  />
                </>
              ) : (
                <h6>There are no images uploaded</h6>
              )}
            </React.Fragment>
          ))}
        </Col>
      </Row>

      <hr></hr>

      <InformedConsentAgreement />

      <Row className="mt-3">
        <Col sm={6} md={4} lg={4}>
          <Table striped bordered hover responsive className="table-sm">
            <tbody>
              <tr>
                <td className="text-center">
                  <strong>Consent Date:</strong>
                </td>
                <td className="text-center">
                  {formatDate(patient?.consentDate) || "-"}
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="d-flex gap-4 gap-sm-5">
        <Col sm={5} md={4} lg={2}>
          <h4>Patient Signature</h4>
          {patient?.consentSignature.url ? (
            <>
              <Image
                style={{ width: 200, height: 100, border: "1px solid black" }}
                src={patient?.consentSignature?.url}
                alt="Patient Signature"
              />
            </>
          ) : (
            <>
              <h6>Patient has No Signature</h6>
            </>
          )}
        </Col>
        <Col sm={5} md={4} lg={2}>
          <h4>Dentist Signature</h4>
          {patient?.dentistSignature.url ? (
            <>
              <Image
                style={{ width: 200, height: 100, border: "1px solid black" }}
                src={patient?.dentistSignature?.url}
                alt="Dentist Signature"
              />
            </>
          ) : (
            <>
              <h6>Dentist has No Signature</h6>
            </>
          )}
        </Col>
      </Row>

      <Row className="mt-3 justify-content-start">
        <Col>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt="Procedure Image"
                  style={{ width: "100%" }}
                />
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </>
  );
};

export default OldPatientScreen;
