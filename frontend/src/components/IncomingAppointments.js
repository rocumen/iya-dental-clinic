import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Button, Table, Form } from "react-bootstrap";
import {
  useGetAllProceduresQuery,
  useChangeProcedureStatusMutation,
  useGetAllPatientsQuery,
} from "../slices/patientsApiSlice.js";
import { useParams } from "react-router-dom";

const IncomingAppointments = () => {
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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12); // Adjust this value as needed
  const [totalPages, setTotalPages] = useState(
    Math.ceil(
      filteredData?.length
        ? filteredData?.length / itemsPerPage
        : data?.length / itemsPerPage
    )
  );

  // const totalPages = Math.ceil(
  //   filteredData?.length
  //     ? filteredData?.length / itemsPerPage
  //     : data?.length / itemsPerPage
  // );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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

  const renderPagination = () => (
    <ul className="pagination d-flex justify-content-center">
      {pageNumbers.map((number) => (
        <li key={number} className={`page-item`}>
          <button
            onClick={() => paginate(number)}
            className={`page-link ${
              currentPage === number ? "bg-dark text-light" : "bg-light"
            }`}
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );

  const renderTableBody = () => {
    let displayData = filteredData.length ? filteredData : data;
    displayData = displayData?.filter(
      (item) => item.status && item.nextAppointment
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = displayData?.slice(indexOfFirstItem, indexOfLastItem);

    return currentItems;
  };

  return (
    <div>
      <div className="text-end">
        <Button
          variant="primary"
          onClick={() => {
            setModalIsOpen(true);

            let displayData = filteredData.length ? filteredData : data;
            displayData = displayData?.filter((item) => item.status);
            setTotalPages(Math.ceil(displayData?.length / itemsPerPage));
          }}
        >
          Appointments
        </Button>
      </div>
      <Modal
        centered
        size="lg"
        show={modalIsOpen}
        onHide={() => setModalIsOpen(false)}
      >
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
                <th className="col-4">Patient Name</th>
                <th className="col-3">Appointments</th>
                <th className="col-2">Time</th>
                <th className="col-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {renderTableBody()?.map((patient, index) => (
                <React.Fragment key={index}>
                  {patient.nextAppointment && patient.status ? (
                    <tr>
                      <td className="text-center">
                        {patient.patientName || "-"}
                      </td>
                      <td className="text-center">
                        {formatDate(patient.nextAppointment) || "-"}
                      </td>
                      <td className="text-center">
                        {patient.appointmentTime
                          ? patient.appointmentTime
                          : " - "}
                      </td>
                      <td>
                        <div className="text-center">
                          {" "}
                          <Button
                            size="sm"
                            style={{
                              backgroundColor:
                                new Date(patient.nextAppointment) < Date.now()
                                  ? "red"
                                  : patient.status
                                  ? "blue"
                                  : "green",
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
              ))}
            </tbody>
          </Table>
          {renderPagination()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalIsOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        centered
        show={confirmationModalOpen}
        onHide={closeConfirmationModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Status Update</Modal.Title>
        </Modal.Header>
        <Modal.Body backgroundColor="dark">
          Are you sure you want to update the status?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeConfirmationModal}>
            Cancel
          </Button>
          <Button
            className="text-white"
            variant="danger"
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
