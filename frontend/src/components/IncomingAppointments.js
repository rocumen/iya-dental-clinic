import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Button, Table, Form } from "react-bootstrap";
import {
  useGetAllProceduresQuery,
  useChangeProcedureStatusMutation,
  useGetAllPatientsQuery,
} from "../slices/patientsApiSlice.js";
import { useParams } from "react-router-dom";

const IncomingAppointments = ({ patient }) => {
  const { pageNumber, keyword } = useParams();

  const { data, refetch: incomingAppointmentsRefetch } =
    useGetAllProceduresQuery();
  const { refetch } = useGetAllPatientsQuery({
    pageNumber,
    keyword,
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [changeProcedureStatus] = useChangeProcedureStatusMutation();

  const [loadingStates, setLoadingStates] = useState({});

  const handleStatusUpdate = async (procedureId, patientId) => {
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [procedureId]: true,
    }));

    try {
      await changeProcedureStatus({
        patientId,
        procedureId,
      });

      await incomingAppointmentsRefetch();
      await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      // Set loading state for the clicked procedure back to false after update
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [procedureId]: false,
      }));
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    filterData(event.target.value);
  };

  const filterData = (query) => {
    if (!query) {
      setFilteredData([]);
      return;
    }
    const filtered = data.filter((patient) => {
      const patientName = patient.patientName.toLowerCase();
      const nextAppointment = formatDate(patient.nextAppointment)
        .toLowerCase()
        .includes(query.toLowerCase());
      return patientName.includes(query.toLowerCase()) || nextAppointment;
    });
    setFilteredData(filtered);
  };

  // if done = false
  // if on going = true

  //nextAppointment = true && status === true

  const renderTableBody = () => {
    const displayData = filteredData.length ? filteredData : data;
    return displayData?.map((patient, index) => (
      <React.Fragment key={index}>
        {patient.nextAppointment && patient.status ? (
          <tr>
            <td className="text-center">{patient.patientName || "-"}</td>
            <td className="text-center">
              {formatDate(patient.nextAppointment) || "-"}
            </td>
            <td>
              <div className="text-center">
                {" "}
                {/* <Button
                  size="sm"
                  style={{
                    backgroundColor: patient.status ? "blue" : "green",
                  }}
                  onClick={() =>
                    handleStatusUpdate(patient.procedureId, patient.patientId)
                  }
                >
                  {patient.status ? "On going" : "Done"}
                </Button> */}
                <Button
                  size="sm"
                  style={{
                    backgroundColor: patient.status ? "blue" : "green",
                  }}
                  onClick={() =>
                    handleStatusUpdate(patient.procedureId, patient.patientId)
                  }
                  disabled={loadingStates[patient.procedureId]}
                >
                  {loadingStates[patient.procedureId]
                    ? "Updating"
                    : patient.status
                    ? "On going"
                    : "Done"}
                </Button>
              </div>
            </td>
          </tr>
        ) : null}
      </React.Fragment>
    ));
  };

  return (
    <div>
      {/* {isLoading && <Loader />} */}
      <div className="text-end">
        <Button variant="primary" className="btn-md mx-1 " onClick={openModal}>
          Appointments
        </Button>
      </div>
      <Modal size="lg" show={modalIsOpen} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Incoming Appointments</Modal.Title>
          <Form.Control
            type="text"
            placeholder="Search Patient Name or Appointment Date"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Appointments</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{renderTableBody()}</tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IncomingAppointments;
