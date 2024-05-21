import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Row, Col, Modal, Image, Form } from "react-bootstrap";
import { FaPlus, FaEdit } from "react-icons/fa";

import Message from "../../components/Message.js";

import Loader from "../../components/Loader.js";
import { toast } from "react-toastify";

import Paginate from "../../components/Paginate.js";

import IncomingAppointments from "../../components/IncomingAppointments.js";

import {
  useGetAllOldPatientsQuery,
  useSortAllOldPatientsByLastNameQuery,
  useDeleteOldPatientMutation,
  useCreateOldPatientMutation,
  useGetAllOldProceduresQuery,
  useChangeOldProcedureStatusMutation,
} from "../../slices/patientsApiSlice.js";

import ProcedureListModal from "../../components/ProcedureListModal.js";
import SearchBox from "../../components/SearchBox.js";

import dentalImage from "../../assets/dentalimage.jpg";

const OldPatientRecords = () => {
  const navigate = useNavigate();
  const { pageNumber, keyword } = useParams();

  const [changeProcedureStatus] = useChangeOldProcedureStatusMutation();

  const { data: proceduresQuery, refetch: incomingAppointmentsRefetch } =
    useGetAllOldProceduresQuery();

  const { data, isLoading, error, refetch } = useGetAllOldPatientsQuery({
    pageNumber,
    keyword,
  });

  console.log(data);

  const { data: sortedByLastName } = useSortAllOldPatientsByLastNameQuery({
    pageNumber,
    keyword,
  });

  const [deletePatient] = useDeleteOldPatientMutation();
  const [createPatient] = useCreateOldPatientMutation();

  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState("lastUpdate");

  const handleSortChange = (e) => {
    const selectedSortOption = e.target.value;
    setSortBy(selectedSortOption);
    if (selectedSortOption === "lastUpdate") {
      // Trigger the existing query for sorting by last update
      refetch();
    } else if (selectedSortOption === "lastName") {
      // Trigger the new query for sorting by last name
      refetch({ sortBy: "lastName" });
    }
  };

  const createPatientHandler = async () => {
    setShowModal(false);

    try {
      const response = await createPatient();
      const { _id } = response.data;
      toast.success("Patient Created");
      setTimeout(() => {
        navigate(`/updateOldPatient/${_id}`);
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

  const deleteHandler = async (patientId) => {
    try {
      await deletePatient({
        patientId,
      });
      refetch();
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  // function is60DaysPassed(createdAt) {
  //   const creationDate = new Date(createdAt);
  //   const today = new Date();
  //   const differenceInDays = Math.floor(
  //     (today - creationDate) / (1000 * 60 * 60 * 24)
  //   );
  //   return differenceInDays >= 60;
  // }

  const updateHandler = (id) => {
    navigate(`/updateOldPatient/${id}`);
  };

  function is60DaysPassed(date) {
    const targetDate = new Date(date);
    const today = new Date();
    const differenceInDays = Math.floor(
      (today - targetDate) / (1000 * 60 * 60 * 24)
    );
    return differenceInDays >= 60;
  }

  function shouldShowEditButton(patient) {
    // Determine the most recent date to check (either createdAt or updatedAt)
    const mostRecentDate = patient.updatedAt
      ? patient.updatedAt
      : patient.createdAt;
    return is60DaysPassed(mostRecentDate);
  }

  return (
    <>
      <Row>
        <Col className="mb-2 d-flex justify-content-center">
          <Image src={dentalImage} alt="image" fluid className="small-image" />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Old Patient Record</h2>
        </Col>
      </Row>
      <Row className="my-2">
        <Col md={5} sm={4} lg={2} xs={5}>
          <Form.Group as={Col} controlId="formSortBy">
            <Form.Label>Sort By:</Form.Label>
            <Form.Control
              as="select"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="">Select Sorting Option</option>
              <option value="lastUpdate">Sort by Last Update</option>
              <option value="lastName">Sort by Last Name</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="align-items-center mb-3">
        <Col className="ms-auto">
          <SearchBox />
        </Col>

        <Col className="d-flex justify-content-end gap-1">
          {/* Modal incoming Appointment */}
          <IncomingAppointments
            patient={data?.patients}
            proceduresQuery={proceduresQuery}
            incomingAppointmentsRefetch={incomingAppointmentsRefetch}
            changeProcedureStatus={changeProcedureStatus}
          />
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <strong>+</strong>New Patient
          </Button>

          <Modal show={showModal} onHide={handleCancel} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center align-items-center">
              Are you sure you want to create a new Patient?
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
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
                <th className="col-2 d-none d-sm-table-cell">PROCEDURE DONE</th>
                <th className="col-2 d-none d-sm-table-cell">LAST VISIT</th>
                <th className="col-2">PROCEDURE HISTORY</th>
                <th className="col-2"></th>
                <th className="col-1"></th>
              </tr>
            </thead>
            <tbody>
              {sortBy === "lastUpdate" ? (
                <>
                  {data?.patients?.map((patient) => {
                    const canEdit = shouldShowEditButton(patient);
                    return (
                      <tr key={patient._id}>
                        <td className="justify-content-center align-item-center">
                          <LinkContainer to={`/oldPatient/${patient._id}`}>
                            <div className="text-center my-3">
                              <Button
                                variant="light"
                                className="btn-sm mx-1 border"
                              >
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
                        <td className="d-none d-sm-table-cell">
                          <div className="text-center py-1 my-3">
                            {patient.procedure.length > 0 &&
                              patient.procedure[patient.procedure.length - 1]
                                .procedureType}
                          </div>
                        </td>
                        <td className="d-none d-sm-table-cell">
                          <div className="text-center py-1 my-3">
                            {patient?.procedure?.length > 0
                              ? formatDate(
                                  patient.procedure[
                                    patient.procedure.length - 1
                                  ].procedureDate
                                )
                              : "-"}
                          </div>
                        </td>
                        <td>
                          <div className="d-block d-sm-flex flex-lg-row flex-md-column flex-sm-column justify-content-center align-items-center my-3 gap-2 text-center">
                            <div className="mb-1">
                              <ProcedureListModal
                                patient={patient}
                                refetch={refetch}
                                changeProcedureStatus={changeProcedureStatus}
                                incomingAppointmentsRefetch={
                                  incomingAppointmentsRefetch
                                }
                              />
                            </div>
                            <LinkContainer
                              to={`/createOldProcedure/${patient._id}`}
                            >
                              <div className="mb-1">
                                <Button variant="primary" size="sm">
                                  <strong>+</strong>Procedure
                                </Button>
                              </div>
                            </LinkContainer>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="d-flex md-flex-row justify-content-center align-items-center my-3 gap-2">
                            {patient?.dentalChartKids?._id ? (
                              <LinkContainer
                                to={`/dentalChartKids/${patient._id}/update/${patient?.dentalChartKids?._id}`}
                              >
                                <Button size="sm" variant="primary">
                                  <FaEdit />
                                  Child Chart
                                </Button>
                              </LinkContainer>
                            ) : (
                              <LinkContainer
                                to={`/dentalChartKids/${patient._id}`}
                              >
                                <Button size="sm" variant="primary">
                                  <FaPlus />
                                  Child Chart
                                </Button>
                              </LinkContainer>
                            )}
                            {patient?.dentalChartAdult?._id ? (
                              <LinkContainer
                                to={`/dentalChartAdult/${patient._id}/update/${patient?.dentalChartAdult?._id}`}
                              >
                                <Button size="sm" variant="primary">
                                  <FaEdit />
                                  Adult Chart
                                </Button>
                              </LinkContainer>
                            ) : (
                              <LinkContainer
                                to={`/dentalChartAdult/${patient._id}`}
                              >
                                <Button size="sm" variant="primary">
                                  <FaPlus />
                                  Adult Chart
                                </Button>
                              </LinkContainer>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex md-flex-row justify-content-center align-items-center my-3 gap-2">
                            {canEdit && (
                              <Button
                                size="sm"
                                onClick={() => updateHandler(patient._id)}
                              >
                                Edit
                              </Button>
                            )}
                            {!patient?.firstName && !patient?.lastName && (
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => deleteHandler(patient?._id)}
                              >
                                Delete
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  {sortedByLastName?.patients?.map((patient) => {
                    const canEdit = shouldShowEditButton(patient);
                    return (
                      <tr key={patient._id}>
                        <td className="justify-content-center align-item-center">
                          <LinkContainer to={`/oldPatient/${patient._id}`}>
                            <div className="text-center my-3">
                              <Button
                                variant="light"
                                className="btn-sm mx-1 border"
                              >
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
                        <td className="d-none d-sm-table-cell">
                          <div className="text-center py-1 my-3">
                            {patient.procedure.length > 0 &&
                              patient.procedure[patient.procedure.length - 1]
                                .procedureType}
                          </div>
                        </td>
                        <td className="d-none d-sm-table-cell">
                          <div className="text-center py-1 my-3">
                            {patient?.procedure?.length > 0
                              ? formatDate(
                                  patient.procedure[
                                    patient.procedure.length - 1
                                  ].procedureDate
                                )
                              : "-"}
                          </div>
                        </td>
                        <td>
                          <div className="d-block d-sm-flex flex-lg-row flex-md-column flex-sm-column justify-content-center align-items-center my-3 gap-2 text-center">
                            <div className="mb-1">
                              <ProcedureListModal
                                patient={patient}
                                refetch={refetch}
                                changeProcedureStatus={changeProcedureStatus}
                                incomingAppointmentsRefetch={
                                  incomingAppointmentsRefetch
                                }
                              />
                            </div>
                            <LinkContainer
                              to={`/createProcedure/${patient._id}`}
                            >
                              <div className="mb-1">
                                <Button variant="primary" size="sm">
                                  <strong>+</strong>Procedure
                                </Button>
                              </div>
                            </LinkContainer>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="d-flex md-flex-row justify-content-center align-items-center my-3 gap-2">
                            {patient?.dentalChartKids?._id ? (
                              <LinkContainer
                                to={`/dentalChartKids/${patient._id}/update/${patient?.dentalChartKids?._id}`}
                              >
                                <Button size="sm" variant="primary">
                                  <FaEdit />
                                  Child Chart
                                </Button>
                              </LinkContainer>
                            ) : (
                              <LinkContainer
                                to={`/dentalChartKids/${patient._id}`}
                              >
                                <Button size="sm" variant="primary">
                                  <FaPlus />
                                  Child Chart
                                </Button>
                              </LinkContainer>
                            )}
                            {patient?.dentalChartAdult?._id ? (
                              <LinkContainer
                                to={`/dentalChartAdult/${patient._id}/update/${patient?.dentalChartAdult?._id}`}
                              >
                                <Button size="sm" variant="primary">
                                  <FaEdit />
                                  Adult Chart
                                </Button>
                              </LinkContainer>
                            ) : (
                              <LinkContainer
                                to={`/dentalChartAdult/${patient._id}`}
                              >
                                <Button size="sm" variant="primary">
                                  <FaPlus />
                                  Adult Chart
                                </Button>
                              </LinkContainer>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex md-flex-row justify-content-center align-items-center my-3 gap-2">
                            {canEdit && (
                              <Button
                                size="sm"
                                onClick={() => updateHandler(patient._id)}
                              >
                                Edit
                              </Button>
                            )}
                            {!patient?.firstName && !patient?.lastName && (
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => deleteHandler(patient?._id)}
                              >
                                Delete
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
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

export default OldPatientRecords;
