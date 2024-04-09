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
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [selectedProcedureId, setSelectedProcedureId] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const [changeProcedureStatus] = useChangeProcedureStatusMutation();

  const handleStatusUpdate = async (procedureId, patientId) => {
    setConfirmationModalOpen(false);
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

  const openConfirmationModal = (procedureId, patientId) => {
    setSelectedProcedureId(procedureId);
    setSelectedPatientId(patientId);
    setConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setSelectedProcedureId(null);
    setSelectedPatientId(null);
    setConfirmationModalOpen(false);
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

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

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
                <Button
                  size="sm"
                  style={{
                    backgroundColor: patient.status ? "blue" : "green",
                  }}
                  onClick={() =>
                    openConfirmationModal(
                      patient.procedureId,
                      patient.patientId
                    )
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
      <div className="text-end">
        <Button
          variant="primary"
          className="btn-md mx-1 "
          onClick={() => setModalIsOpen(true)}
        >
          Appointments
        </Button>
      </div>
      <Modal size="lg" show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
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
          <Button onClick={() => setModalIsOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={confirmationModalOpen} onHide={closeConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Status Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to update the status?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeConfirmationModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              handleStatusUpdate(selectedProcedureId, selectedPatientId)
            }
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IncomingAppointments;
