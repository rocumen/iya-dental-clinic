import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  useChangeProcedureStatusMutation,
  useGetAllProceduresQuery,
} from "../slices/patientsApiSlice.js";

const ProcedureListModal = ({ patient, refetch }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { refetch: incomingAppointmentsRefetch } = useGetAllProceduresQuery();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [changeProcedureStatus, { isLoading }] =
    useChangeProcedureStatusMutation();

  // const handleStatusUpdate = async (procedureId) => {
  //   const patientId = patient._id;
  //   try {
  //     await changeProcedureStatus({
  //       patientId,
  //       procedureId,
  //     });
  //     refetch();
  //     incomingAppointmentsRefetch();
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //   }
  // };
  const [loadingStates, setLoadingStates] = useState({});

  const handleStatusUpdate = async (procedureId) => {
    // Set loading state for the clicked procedure to true
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [procedureId]: true,
    }));

    try {
      // Perform the status update
      await changeProcedureStatus({
        patientId: patient._id,
        procedureId,
      });

      // Optionally, you can refetch data here if needed
      await refetch();
      await incomingAppointmentsRefetch();
    } catch (error) {
      console.error("Error updating procedure status:", error);
    } finally {
      // Set loading state for the clicked procedure back to false after update
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [procedureId]: false,
      }));
    }
  };

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <div>
        <Button variant="primary" className="btn-sm mx-1" onClick={openModal}>
          History
        </Button>
      </div>

      <Modal show={modalIsOpen} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Procedure History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>DATE</th>
                <th>PROCEDURE TYPE</th>
                {/* <th>DENTIST/S</th> */}
                <th>NEXT APPOINTMENT</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {patient.procedure.map((procedure, index) => (
                <tr key={index}>
                  <td className="text-center">
                    {procedure.procedureDate
                      ? formatDate(procedure.procedureDate)
                      : "-"}
                  </td>
                  <td className="text-center">
                    {procedure.procedureType ? procedure.procedureType : "-"}
                  </td>
                  {/* <td className="text-center">
                    {procedure.dentists ? procedure.dentists : "-"}
                  </td> */}
                  <td className="text-center">
                    {procedure.nextAppointment
                      ? formatDate(procedure.nextAppointment)
                      : "-"}
                  </td>
                  <td className="text-center">
                    <Button
                      size="sm"
                      style={{
                        backgroundColor: procedure.status ? "blue" : "green",
                      }}
                      onClick={() => handleStatusUpdate(procedure._id)}
                      disabled={loadingStates[procedure._id]}
                    >
                      {loadingStates[procedure._id]
                        ? "Updating"
                        : procedure.status
                        ? "On going"
                        : "Done"}
                    </Button>
                  </td>
                  <td className="text-center">
                    <Link
                      to={`/patients/procedureDetails/${patient._id}/procedures/${procedure._id}`}
                    >
                      <Button size="sm">View</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProcedureListModal;
