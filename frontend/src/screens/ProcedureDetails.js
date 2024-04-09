import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetProcedureQuery,
  useGetPatientByIdQuery,
} from "../slices/patientsApiSlice.js";
import Loader from "../components/Loader.js";
import { Row, Col, Table, Image, Modal, Button } from "react-bootstrap";
import Message from "../components/Message.js";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

import dentalImage from "../assets/dentalimage.jpg";

const ProcedureDetails = () => {
  const { patientId, procedureId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [chartType, setChartType] = useState("");

  const navigate = useNavigate();

  const handleShowConfirmationModal = (type) => {
    setChartType(type);
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => setShowConfirmationModal(false);

  const { data: patient } = useGetPatientByIdQuery(patientId);

  const {
    data: procedure,
    isLoading,
    error,
  } = useGetProcedureQuery({
    patientId,
    procedureId,
  });

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const lastBalance = procedure?.map((a) => a.previousBalance);

  const totalAmountCharged = procedure?.map(
    (amount) => amount.totalAmountCharged
  );

  const amountPaid = procedure?.map((amount) => amount.amountPaid);

  const handleCreateChart = () => {
    if (chartType === "adult") {
      navigate(`/patients/dentalChartAdult/${patientId}`);
    } else if (chartType === "kid") {
      navigate(`/patients/dentalChartKids/${patientId}`);
    }
    setShowConfirmationModal(false);
  };
  return (
    <>
      {isLoading && <Loader />}
      {error && <Message />}
      <Row>
        <Col className="mb-2 d-flex justify-content-center">
          <Image src={dentalImage} alt="image" fluid className="small-image" />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Table striped bordered hover responsive className="table-sm">
            <tbody>
              {procedure?.map((p, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td className="col-4 text-center">
                      <strong>Procedure Date:</strong>
                    </td>
                    <td className="col-6 text-center">
                      {formatDate(p.procedureDate || "-")}
                    </td>
                  </tr>
                  <tr>
                    <td className="col-4 text-center">
                      <strong>Patient Name:</strong>
                    </td>
                    <td className="col-6 text-center">
                      {p.patientName || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="col-4 text-center">
                      <strong>Dentist:</strong>
                    </td>
                    <td className="col-6 text-center">{p.dentists || "-"}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th className="col-2">Tooth number</th>
                <th className="col-6">Procedure</th>
                <th className="col-2">Amount Charged</th>
              </tr>
            </thead>
            <tbody>
              {procedure?.map((p, index) => (
                <React.Fragment key={index}>
                  {p.procedureArray.map((a, index) => (
                    <tr key={index}>
                      <td className="text-center ">
                        <div className="my-2">{a.toothNumbers}</div>
                      </td>
                      <td
                        className="text-start"
                        style={{ maxWidth: "100%", overflowX: "hidden" }}
                      >
                        <div
                          className="my-2"
                          style={{ whiteSpace: "pre-wrap" }}
                        >
                          {a.procedureExplanation}
                        </div>
                      </td>

                      <td className="text-center">
                        <div className="my-2">
                          {a.amountCharged !== null
                            ? `₱${a.amountCharged.toLocaleString()}`
                            : "-"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row>
        <Col md={5}>
          <Table striped bordered hover responsive className="table-sm">
            <tbody>
              {procedure?.map((p, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>
                      <strong>Previous Balance:</strong>
                    </td>
                    <td className="text-center">{lastBalance}</td>
                  </tr>
                  <tr>
                    <td className="col-6">
                      <strong>Total Amount Charged:</strong>
                    </td>
                    <td className="text-center">
                      {p.totalAmountCharged === null &&
                      p.totalAmountCharged === 0
                        ? "-"
                        : `₱${p.totalAmountCharged.toLocaleString()}`}
                    </td>
                  </tr>
                  <tr>
                    <td className="col-6">
                      <strong>Amount Paid:</strong>
                    </td>
                    <td className="text-center">
                      {p.amountPaid !== null
                        ? `₱${p.amountPaid.toLocaleString()}`
                        : "₱0"}
                    </td>
                  </tr>
                  <tr>
                    <td className="col-6">
                      <strong>Balance:</strong>
                    </td>
                    <td className="text-center">
                      {p.balance !== null
                        ? `₱${
                            Number(lastBalance) +
                            Number(totalAmountCharged) -
                            amountPaid
                          }`
                        : "₱0"}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={5}>
          <Table striped bordered hover responsive className="table-sm">
            <tbody>
              {procedure?.map((p, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td className="text-center">Next Appointment:</td>
                    <td className="text-center">
                      {p.nextAppointment ? formatDate(p.nextAppointment) : "-"}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>

          {patient?.dentalChartAdult || patient?.dentalChartKids ? (
            <>
              <h6>View Dental Chart</h6>
              <div className="d-flex gap-3">
                <LinkContainer
                  to={`/patients/dentalChartKids/${patientId}/update/${patient?.dentalChartKids?._id}`}
                >
                  <div>
                    <Button>Dental Chart Kids</Button>
                  </div>
                </LinkContainer>
                <LinkContainer
                  to={`/patients/dentalChartAdult/${patientId}/update/${patient?.dentalChartAdult?._id}`}
                >
                  <div>
                    <Button>Dental Chart Adult</Button>
                  </div>
                </LinkContainer>
              </div>
            </>
          ) : (
            <>
              <h6>There are no Chart</h6>
              <div className="d-flex gap-3">
                <Button onClick={() => handleShowConfirmationModal("kid")}>
                  Create Dental Chart for Kid
                </Button>
                <Button onClick={() => handleShowConfirmationModal("adult")}>
                  Create Dental Chart for Adult
                </Button>
              </div>
            </>
          )}
          <Modal
            show={showConfirmationModal}
            onHide={handleCloseConfirmationModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to create a new chart for{" "}
              {chartType === "kid" ? "kid" : "adult"}?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseConfirmationModal}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleCreateChart}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>

      <Row className="my-3">
        <h3>Patient Signature</h3>
        <Col>
          {procedure?.map((a, index) => (
            <React.Fragment key={index}>
              <Image
                style={{ width: 200, height: 100, border: "1px solid black" }}
                src={a.procedureSignature.url}
              />
            </React.Fragment>
          ))}
        </Col>
      </Row>

      <Row>
        <Col>
          {procedure?.map((proc, index) => (
            <React.Fragment key={index}>
              {proc.rx.map((image, idx) => (
                <React.Fragment key={idx}>
                  {image.url ? (
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
                  ) : (
                    <h6>There are no images uploaded</h6>
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
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

export default ProcedureDetails;
