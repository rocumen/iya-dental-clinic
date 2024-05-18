import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Table,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const ProcedureListModal = ({
  patient,
  refetch,
  changeProcedureStatus,
  incomingAppointmentsRefetch,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortedProcedures, setSortedProcedures] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [selectedProcedureType, setSelectedProcedureType] = useState(null);

  const procedureOptions = [
    "CONSULTATION",
    "RESTORATION",
    "PITS AND FISSURE SEALANTS",
    "TOOTH EXTRACTION",
    "ORAL PROPHYLAXIS",
    "ROOT CANAL TREATMENT",
    "ORAL SURGERY",
    "TEETH WHITENING",
    "PROSTODONTIC TREATMENT",
    "ORTHODONTICS",
    "COSMETIC DENTISTRY",
    "TMJD TREATMENT",
    "PERIODONTICS",
    "DENTAL IMPLANT",
  ];

  const sortProcedures = (procedures, order) => {
    return procedures.slice().sort((a, b) => {
      const dateA = a.procedureDate ? new Date(a.procedureDate) : null;
      const dateB = b.procedureDate ? new Date(b.procedureDate) : null;
      if (dateA && dateB) {
        return order === "asc" ? dateA - dateB : dateB - dateA;
      } else if (dateA) {
        return -1;
      } else if (dateB) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  useEffect(() => {
    const sorted = sortProcedures(patient.procedure, sortOrder);
    setSortedProcedures(sorted);
    setTotalPages(Math.ceil(sorted.length / itemsPerPage));
    setCurrentPage(1); // Reset to first page on sort order change
  }, [patient.procedure, sortOrder, itemsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleStatusUpdate = async (procedureId) => {
    setLoadingStates((prev) => ({ ...prev, [procedureId]: true }));
    try {
      await changeProcedureStatus({ patientId: patient._id, procedureId });
      await refetch();
      await incomingAppointmentsRefetch();
    } catch (error) {
      console.error("Error updating procedure status:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [procedureId]: false }));
    }
  };

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleFilterChange = (type) => {
    setSelectedProcedureType(type);
  };

  const displayData = sortedProcedures
    .filter((procedure) =>
      selectedProcedureType
        ? procedure.procedureType === selectedProcedureType
        : true
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const renderPagination = () => (
    <ul className="pagination d-flex justify-content-center">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
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

  return (
    <div>
      <Button variant="primary" className="btn-sm" onClick={openModal}>
        History
      </Button>

      <Modal centered show={modalIsOpen} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Procedure History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex gap-3 justify-content-end mb-3">
            <DropdownButton
              id="dropdown-basic-button"
              title={selectedProcedureType || "Filter by Procedure Type"}
              onSelect={handleFilterChange}
              size="sm"
            >
              <Dropdown.Item eventKey={null}>All</Dropdown.Item>
              {procedureOptions.map((type) => (
                <Dropdown.Item key={type} eventKey={type}>
                  {type}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <Button
              className="text-white"
              variant="secondary"
              size="sm"
              onClick={toggleSortOrder}
            >
              Sort by Date {sortOrder === "asc" ? "▲" : "▼"}
            </Button>
          </div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>DATE</th>
                <th>PROCEDURE TYPE</th>
                <th>ATTENDING DENTIST</th>
                <th className="d-none d-sm-table-cell">STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((procedure, index) => (
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
                      <Link
                        to={`/procedureDetails/${patient._id}/procedures/${procedure._id}`}
                      >
                        <Button size="sm">View</Button>
                      </Link>
                    ) : (
                      <Link
                        to={`/oldProcedureDetails/${patient._id}/procedures/${procedure._id}`}
                      >
                        <Button size="sm">View</Button>
                      </Link>
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
