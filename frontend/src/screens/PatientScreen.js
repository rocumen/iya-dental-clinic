import React from "react";
import GoBack from "../components/GoBack.js";
import { useParams } from "react-router-dom";

import { useGetPatientByIdQuery } from "../slices/patientsApiSlice.js";
import { Link } from "react-router-dom";
import { Table, Row, Col, Image, Tab } from "react-bootstrap";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import MyDocument from "../components/PDFFile.js";

import InformedConsentAgreement from "../components/InformedConsentAgreement.js";

const PatientScreen = () => {
  const { id: patientId } = useParams();

  const { data: patient, isLoading, error } = useGetPatientByIdQuery(patientId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (!patient) {
    return <p>There are no Patient Record</p>;
  }

  const { forMinors, dentalHistory, medicalHistory } = patient;

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <Link>
        <GoBack />
      </Link>
      <h3>Patient Information Record</h3>

      {/* First Row */}
      <Row className="mt-3 justify-content-start">
        <Col md={6} lg={6}>
          <Table striped bordered hover size="sm">
            <tbody>
              <tr>
                <td>First Name</td>
                <td className="col-8 text-center">
                  {patient.firstName || "-"}
                </td>
              </tr>
              <tr>
                <td>Middle Name</td>
                <td className="col-8 text-center">
                  {patient.middleName || "-"}
                </td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td className="col-8 text-center">{patient.lastName || "-"}</td>
              </tr>
              <tr>
                <td>Occupation</td>
                <td className="col-8 text-center">
                  {patient.occupation || "-"}
                </td>
              </tr>
              <tr>
                <td>Gender</td>
                <td className="col-8 text-center">{patient.gender || "-"}</td>
              </tr>
              <tr>
                <td>Blood Type</td>
                <td className="col-8 text-center">
                  {patient.bloodType || "-"}
                </td>
              </tr>
              <tr>
                <td>Blood Pressure</td>
                <td className="col-8 text-center">
                  {patient.bloodPressure || "-"}
                </td>
              </tr>
              <tr>
                <td>Contact Number</td>
                <td className="col-8 text-center">
                  {patient.contactNumber || "-"}
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td className="col-8 text-center">{patient.email || "-"}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col md={6} lg={5}>
          <Table striped bordered hover size="sm">
            <tbody>
              <tr>
                <td>Birth Day</td>
                <td className="col-8 text-center">
                  {patient.birthday ? formatDate(patient.birthday) : "-"}
                </td>
              </tr>
              <tr>
                <td>Age</td>
                <td className="col-8 text-center">{patient.age || "-"}</td>
              </tr>
              <tr>
                <td>Religion</td>
                <td className="col-8 text-center">{patient.religion || "-"}</td>
              </tr>

              <tr>
                <td>Dental Insurance</td>
                <td className="col-8 text-center">
                  {patient.dentalInsurance || "-"}
                </td>
              </tr>
              <tr>
                <td>Effective Date</td>
                <td className="col-8 text-center">
                  {patient.effectiveDate
                    ? formatDate(patient.effectiveDate)
                    : "-"}
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      <h3>For minors</h3>

      {/* Second Row */}
      <Row>
        <Col md={8} lg={6}>
          <Table striped bordered hover size="sm">
            <tbody>
              {forMinors.map((minor, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>Parent Name</td>
                    <td className="col-8 text-center">
                      {minor.parentName || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td>Parent Occupation</td>
                    <td className="col-8 text-center">
                      {minor.parentOccupation || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td>Referral</td>
                    <td className="col-8 text-center">
                      {minor.referral || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td>Reason for Dental Consult</td>
                    <td className="col-8 text-center">
                      {minor.reasonForDentalConsult || "-"}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <h3>Dental History</h3>
      <Row>
        <Col md={6}>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Previous Dentist</th>
                <th>Last Dental Visit</th>
              </tr>
            </thead>
            <tbody>
              {dentalHistory.map((history, index) => (
                <tr key={index}>
                  <td className="text-center">
                    {history.previousDentist ? history.previousDentist : "-"}
                  </td>
                  <td className="text-center">
                    {history.lastDentalVisit
                      ? formatDate(history.lastDentalVisit)
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <h3>Medical History</h3>
      <Row>
        <Col md={4} lg={4}>
          <Table striped bordered hover size="sm">
            <tbody>
              {medicalHistory.map((history, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td className="text-center">
                      <strong>Physician Name:</strong>
                    </td>
                    <td className="text-center">
                      {history.physicianName || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <strong>Specialty:</strong>
                    </td>
                    <td className="text-center">{history.specialty || "-"}</td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <strong>Office address:</strong>
                    </td>
                    <td className="text-center">
                      {history.officeAddress || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <strong>Office Number:</strong>
                    </td>
                    <td className="text-center">
                      {history.officeNumber || "-"}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col md={12} lg={6}>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {medicalHistory.map((history, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td className="text-start">Are you in good Health?</td>
                    <td className="text-center">
                      {history.isGoodHealth ? "Yes" : "No"}
                    </td>
                    <td className="text-center">-</td>
                  </tr>

                  <tr>
                    <td className="text-start">
                      Are you under medical treatment now?
                    </td>
                    <td className="text-center">
                      {history.isMedicalTreatment ? "Yes" : "No"}
                    </td>
                    <td className="text-center">
                      {history.medicalTreatmentExplanation
                        ? history.medicalTreatmentExplanation
                        : "-"}
                    </td>
                  </tr>

                  <tr>
                    <td className="text-start">
                      Have you ever had serious illness or surgical operation?
                    </td>
                    <td className="text-center">
                      {history.isIllnessOrSurgicalOperation ? "Yes" : "No"}
                    </td>
                    <td className="text-center">
                      {history.illnessOrSurgicalOperationExplanation
                        ? history.illnessOrSurgicalOperationExplanation
                        : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      Have you ever been Hospitalized?
                    </td>
                    <td className="text-center">
                      {history.isHospitalized ? "Yes" : "No"}
                    </td>
                    <td className="text-center">
                      {history.hospitalizedExplanation
                        ? history.hospitalizedExplanation
                        : "-"}
                    </td>
                  </tr>

                  <tr>
                    <td className="text-start">
                      Are you taking any prescription/non-prescription
                      medication?
                    </td>
                    <td className="text-center">
                      {history.isPrescription ? "Yes" : "No"}
                    </td>
                    <td className="text-center">
                      {history.prescriptionExplanation
                        ? history.prescriptionExplanation
                        : "-"}
                    </td>
                  </tr>

                  <tr>
                    <td className="text-start">Do you use tobacco products?</td>
                    <td className="text-center">
                      {history.isTobacco ? "Yes" : "No"}
                    </td>
                    <td className="text-center">
                      {history.isTobacco ? history.isTobacco : "-"}
                    </td>
                  </tr>

                  <tr>
                    <td className="text-start">
                      Do you use alcohol, cocaine, or other dangerous drugs?
                    </td>
                    <td className="text-center">
                      {history.isAlcoholOrDangerousDrugs ? "Yes" : "No"}
                    </td>
                    <td className="text-center">-</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <h3>For Woman</h3>
      <Row>
        <Col md={4} lg={3}>
          <Table striped bordered hover size="sm">
            <tbody>
              {medicalHistory.map((history, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>Bleeding Time</td>
                    <td className="col-7 text-center">
                      {history.bleedingTime}
                    </td>
                  </tr>
                  <tr>
                    <td>is Pregnant</td>
                    <td className="col-7 text-center">
                      {history.isPregnant ? "Yes" : "No"}
                    </td>
                  </tr>
                  <tr>
                    <td>is Nursing</td>
                    <td className="col-7 text-center">
                      {history.isNursing ? "Yes" : "No"}
                    </td>
                  </tr>
                  <tr>
                    <td>isTakingPills</td>
                    <td className="col-7 text-center">
                      {history.isTakingPills ? "Yes" : "No"}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Col>

        <Col md={4} lg={4}>
          <Table striped bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>
                  <strong>Allergies</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {medicalHistory.map((allergyObj, index) => (
                <React.Fragment key={index}>
                  {allergyObj.length > 0 ? (
                    <>
                      {allergyObj.allergies.map((allergy, subIndex) => (
                        <tr key={subIndex}>
                          <td className="text-center col-6">{allergy}</td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      <tr>
                        <td className="text-center">
                          Patient has No Allergies
                        </td>
                      </tr>
                    </>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={4} lg={4}>
          <Table striped bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>
                  <strong>Illnesses</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {medicalHistory.map((illness, index) => (
                <React.Fragment key={index}>
                  {illness.length > 0 ? (
                    <>
                      {illness.illnessOrDiseases.map((i, subIndex) => (
                        <tr key={subIndex}>
                          <td className="text-center col-6">{i}</td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      <tr>
                        <td className="text-center col-6">
                          Patient has no illnesses
                        </td>
                      </tr>
                    </>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <h4>Patient Signature</h4>
        <Col>
          {patient?.signatureImage && (
            <React.Fragment>
              {patient.signatureImage.url ? (
                <Image
                  style={{ width: 200, height: 100, border: "1px solid black" }}
                  src={patient.signatureImage.url}
                />
              ) : (
                <h6>There is no Patient Signature</h6>
              )}
            </React.Fragment>
          )}
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
      <Row>
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

      <Row>
        <Col>
          <PDFDownloadLink
            document={<MyDocument patient={patient} />}
            fileName="FORM"
          >
            {({ loading }) =>
              loading ? (
                <button>Loading document</button>
              ) : (
                <button>Download</button>
              )
            }
          </PDFDownloadLink>
        </Col>
      </Row>
      <Row>
        <Col>
          <PDFViewer>
            <MyDocument patient={patient} />
          </PDFViewer>
        </Col>
      </Row>
    </>
  );
};

export default PatientScreen;
