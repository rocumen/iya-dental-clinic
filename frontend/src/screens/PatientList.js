import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Row, Col, Modal } from "react-bootstrap";
import { FaPlus, FaEdit } from "react-icons/fa";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { toast } from "react-toastify";
import Paginate from "../components/Paginate.js";
import IncomingAppointments from "../components/IncomingAppointments.js";

import {
  useGetAllPatientsQuery,
  useCreatePatientMutation,
} from "../slices/patientsApiSlice.js";

import ProcedureListModal from "../components/ProcedureListModal.js";
import SearchBox from "../components/SearchBox.js";

const PatientList = () => {
  const navigate = useNavigate();
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error, refetch } = useGetAllPatientsQuery({
    pageNumber,
    keyword,
  });
  const [createPatient] = useCreatePatientMutation();

  const [showModal, setShowModal] = useState(false);

  const createPatientHandler = async () => {
    setShowModal(false);

    try {
      const response = await createPatient();
      const { _id } = response.data;
      toast.success("Patient Created");
      setTimeout(() => {
        navigate(`/patients/updatePatient/${_id}`);
      }, 500);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  const handleCancel = () => {
    setShowModal(false);
  };

  useEffect(() => {
    refetch();
  }, [pageNumber, keyword]);

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <Row>
        <Col className="me-5">
          <h1>Patient Records</h1>
        </Col>
      </Row>
      <Row className="align-items-center mb-3">
        <Col className="ms-auto">
          <SearchBox />
        </Col>
        <Col className="d-flex justify-content-end gap-1">
          {/* Modal incoming Appointment */}
          <IncomingAppointments patient={data?.patients} />
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <FaPlus />
            New Patient
          </Button>
          <Modal show={showModal} onHide={handleCancel}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to create a new Patient?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={createPatientHandler}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th className="col-1"></th>
                <th className="col-2">NAME</th>
                <th className="col-2">PROCEDURE DONE</th>
                <th className="col-2">LAST VISIT</th>
                <th className="col-2">PROCEDURE HISTORY</th>
                <th className="col-2"></th>
              </tr>
            </thead>
            <tbody>
              {data?.patients?.map((patient) => (
                <tr key={patient._id}>
                  <td className="justify-content-center align-item-center">
                    <LinkContainer to={`/patients/onePatient/${patient._id}`}>
                      <div className="text-center my-3">
                        <Button variant="light" className="btn-sm mx-1 border">
                          View
                        </Button>
                      </div>
                    </LinkContainer>
                  </td>
                  <td>
                    <div className="text-center py-1 my-3">
                      {patient.lastName}, {patient.firstName}
                    </div>
                  </td>
                  <td>
                    <div className="text-center py-1 my-3">
                      {/* Access the dentists value from the latest procedure */}
                      {patient.procedure.length > 0 &&
                        patient.procedure[patient.procedure.length - 1]
                          .procedureType}
                    </div>
                  </td>

                  <td>
                    <div className="text-center py-1 my-3">
                      {patient?.procedure?.length > 0
                        ? formatDate(
                            patient.procedure[patient.procedure.length - 1]
                              .procedureDate
                          )
                        : "-"}
                    </div>
                  </td>

                  <td>
                    <div className="d-flex flex-sm-row flex-column justify-content-center align-item-end mt-3">
                      <div>
                        <ProcedureListModal
                          patient={patient}
                          refetch={refetch}
                        />
                      </div>
                      <LinkContainer
                        to={`/patients/createProcedure/${patient._id}`}
                      >
                        <div>
                          <Button
                            variant="primary"
                            className="btn-sm mx-1 d-flex align-items-center"
                          >
                            Procedure
                            <FaPlus />
                          </Button>
                        </div>
                      </LinkContainer>
                    </div>
                  </td>

                  <td className="text-center">
                    {/* Edit and delete buttons */}
                    <div className="justify-content-center d-flex flex-column mx-3">
                      {patient?.dentalChartKids?._id ? (
                        <LinkContainer
                          to={`/patients/dentalChartKids/${patient._id}/update/${patient?.dentalChartKids?._id}`}
                        >
                          <Button variant="primary" className="btn-sm my-1">
                            <FaEdit />
                            Child Chart
                          </Button>
                        </LinkContainer>
                      ) : (
                        <LinkContainer
                          to={`/patients/dentalChartKids/${patient._id}`}
                        >
                          <Button variant="primary" className="btn-sm my-1">
                            <FaPlus />
                            Child Chart
                          </Button>
                        </LinkContainer>
                      )}
                      {patient?.dentalChartAdult?._id ? (
                        <LinkContainer
                          to={`/patients/dentalChartAdult/${patient._id}/update/${patient?.dentalChartAdult?._id}`}
                        >
                          <Button variant="primary" className="btn-sm my-1">
                            <FaEdit />
                            Adult Chart
                          </Button>
                        </LinkContainer>
                      ) : (
                        <LinkContainer
                          to={`/patients/dentalChartAdult/${patient._id}`}
                        >
                          <Button variant="primary" className="btn-sm my-1">
                            <FaPlus />
                            Adult Chart
                          </Button>
                        </LinkContainer>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default PatientList;
