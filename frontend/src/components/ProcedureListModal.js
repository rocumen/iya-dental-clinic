import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProcedureListModal = ({
  patient,
  refetch,
  changeProcedureStatus,
  incomingAppointmentsRefetch,
}) => {
  const sortedProcedures = patient.procedure.slice().sort((a, b) => {
    if (a.nextAppointment && b.nextAppointment) {
      return new Date(b.nextAppointment) - new Date(a.nextAppointment);
    } else {
      return 0;
    }
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(sortedProcedures.length / itemsPerPage)
  );

  useEffect(() => {
    setTotalPages(Math.ceil(sortedProcedures.length / itemsPerPage));
  }, [sortedProcedures, itemsPerPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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

  const handleOpenModal = () => {
    setModalIsOpen(true);
    setTotalPages(Math.ceil(sortedProcedures.length / itemsPerPage));
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
  const displayData = sortedProcedures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div>
        <Button variant="primary" className="btn-sm" onClick={handleOpenModal}>
          History
        </Button>
      </div>

      <Modal centered show={modalIsOpen} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Procedure History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>DATE</th>
                <th>PROCEDURE TYPE</th>
                <th>ATTENDING DENTIST</th>
                {/* <th className="d-none d-sm-table-cell">NEXT APPOINTMENT</th> */}
                <th className="d-none d-sm-table-cell">STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {displayData?.map((procedure, index) => (
                <tr key={index}>
                  <td className="text-center">
                    {procedure.procedureDate
                      ? formatDate(procedure.procedureDate)
                      : "-"}
                  </td>
                  <td className="text-center">
                    {procedure.procedureType ? procedure.procedureType : "-"}
                  </td>
                  <td className="text-center">
                    {procedure.dentists ? procedure.dentists : "-"}
                  </td>

                  {/* <td className="text-center d-none d-sm-table-cell">
                    {procedure.nextAppointment
                      ? formatDate(procedure.nextAppointment)
                      : "-"}
                  </td> */}

                  <td className="text-center d-none d-sm-table-cell">
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
                    {procedure?.collection === "New" ||
                    procedure?.collection === "" ? (
                      <>
                        <Link
                          to={`/procedureDetails/${patient._id}/procedures/${procedure._id}`}
                        >
                          <Button size="sm">View</Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to={`/oldProcedureDetails/${patient._id}/procedures/${procedure._id}`}
                        >
                          <Button size="sm">View</Button>
                        </Link>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {totalPages > 1 && renderPagination()}
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
