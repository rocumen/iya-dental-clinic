import React from "react";
import { useState, useEffect, useRef } from "react";
import { Form, Button, Row, Col, Table, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import GoBack from "../components/GoBack.js";
import { toast } from "react-toastify";
import ProcedureSignature from "../components/ProcedureSignature.js";

import {
  useCreateProcedureMutation,
  useGetPatientByIdQuery,
  useUploadRxMutation,
} from "../slices/patientsApiSlice.js";

import dentalImage from "../assets/dentalimage.jpg";

const ProcedureScreen = () => {
  const { id: patientId } = useParams();
  const navigate = useNavigate();

  const {
    data: patient,
    isLoading,
    refetch,
    // error,
  } = useGetPatientByIdQuery(patientId);

  const [createProcedure] = useCreateProcedureMutation();

  const [uploadRx] = useUploadRxMutation();

  const [isSaving, setIsSaving] = useState(false);
  const [procedureType, setProcedureType] = useState("");
  const [procedureDate, setProcedureDate] = useState("");
  const [installment, setInstallment] = useState(false);
  const [installmentProcedure, setInstallmentProcedure] = useState("");
  const [installmentBalance, setInstallmentBalance] = useState(null);

  const [procedureArray, setProcedureArray] = useState([
    { toothNumbers: null, procedureExplanation: "", amountCharged: null },
  ]);

  const [dentists, setDentists] = useState("");

  const [totalAmountCharged, setTotalAmountCharged] = useState(null);
  const [amountPaid, setAmountPaid] = useState(null);
  const [balance, setBalance] = useState(null);
  const [nextAppointment, setNextAppointment] = useState("");
  const [rx, setRx] = useState([{ url: "", id: "" }]);
  const [procedureSignature, setProcedureSignature] = useState({
    url: "",
    id: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const lastBalance =
    patient?.procedure?.length > 0
      ? patient.procedure[patient.procedure.length - 1].balance
      : null;

  useEffect(() => {
    // setProcedureType(patient.procedureType);
    // setProcedureDate(patient.procedureDate);
    // setDentists(patient.dentists);
    // setAmountCharged(patient.amountCharged);
    // setTotalAmountCharged(patient.totalAmountCharged);
    // setAmountPaid(patient.amountPaid);
    // setBalance(patient.balance);
    // setNextAppointment(patient.nextAppointment);
    // setRx(patient.rx);
    // setProcedureSignature(patient.procedureSignature);
    setProcedureArray(procedureArray);
    setProcedureType(procedureType);
    setProcedureDate(procedureDate);
    setDentists(dentists);

    setTotalAmountCharged(totalAmountCharged);
    setAmountPaid(amountPaid);
    setBalance(balance);
    setNextAppointment(nextAppointment);
    setRx(rx);
    setProcedureSignature(procedureSignature);
  }, [
    procedureArray,
    procedureType,
    procedureDate,
    dentists,
    totalAmountCharged,
    amountPaid,
    balance,
    nextAppointment,
    rx,
    procedureSignature,
  ]);

  // const handleFileUpload = async (e) => {
  //   const formData = new FormData();
  //   formData.append("rx", e.target.files[0]);

  //   try {
  //     const { data } = await uploadRx(formData);
  //     toast.success(data.message);
  //     console.log(data.rx);

  //     // Assuming setRx is a function to update the state of your images
  //     setRx(data.rx);
  //     // navigate()
  //   } catch (error) {
  //     toast.error(error?.data?.message || error.error);
  //   }
  // };

  useEffect(() => {
    if (totalAmountCharged !== null && amountPaid !== null) {
      setBalance(totalAmountCharged + lastBalance - amountPaid);
    }
  }, [totalAmountCharged, amountPaid, lastBalance]);

  const handleFileUpload = async (e) => {
    const fileInput = document.getElementById("fileInput");
    const files = fileInput.files;

    if (!files.length) {
      toast.error("Please select at least one file.");
      return;
    }

    if (isSaving) return; // If already saving, return to avoid multiple clicks

    setIsSaving(true); // Set isSaving to true when the button is clicked

    const formData = new FormData();

    // Append each selected file to the FormData object
    // for (let i = 0; i < e.target.files.length; i++) {
    //   formData.append("rx", e.target.files[i]);
    // }
    for (let i = 0; i < files.length; i++) {
      formData.append("rx", files[i]);
    }

    try {
      const { data } = await uploadRx(formData); // Update function name
      toast.success(data.message);
      console.log(data.rxs); // Assuming rxs is the array of prescription objects returned by the backend

      // Assuming setRx is a function to update the state of your prescriptions
      setIsSaving(false);
      setRx(data.rxs);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Assuming toothNumbers and procedureExplanation are pushed into procedureArray
      // const procedureArray = [{ toothNumbers, procedureExplanation }];

      if (isSaving) return; // If already saving, return to avoid multiple clicks

      setIsSaving(true); // Set isSaving to true when the button is clicked

      await createProcedure({
        patientId,
        procedureType,
        procedureDate,
        procedureArray, // Pass the procedureArray containing toothNumbers and procedureExplanation
        dentists,
        totalAmountCharged,
        amountPaid,
        // balance,
        nextAppointment,
        rx,
        procedureSignature,
      }).unwrap();

      setSubmitted(true);
      toast.success("Procedure Saved");
      setIsSaving(false);
      refetch();
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleFieldChange = (e, index, fieldName) => {
    const updatedProcedureArray = [...procedureArray];
    updatedProcedureArray[index][fieldName] = e.target.value;
    setProcedureArray(updatedProcedureArray);
  };

  const handleAddField = () => {
    setProcedureArray([
      ...procedureArray,
      { toothNumbers: null, procedureExplanation: "", amountCharged: null },
    ]);
  };

  useEffect(() => {
    const total = procedureArray.reduce(
      (acc, curr) => acc + (parseFloat(curr.amountCharged) || 0),
      0
    );
    setTotalAmountCharged(total);
  }, [procedureArray]);

  // console.log(procedureArray);

  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && textareaRef.current) {
      e.preventDefault(); // Prevent default behavior (form submission)

      // Get cursor position
      const selectionStart = textareaRef.current.selectionStart; // Updated
      const selectionEnd = textareaRef.current.selectionEnd; // Updated

      // Insert newline character at cursor position
      const newValue =
        textareaRef.current.value.slice(0, selectionStart) +
        "\n" +
        textareaRef.current.value.slice(selectionEnd);

      // Update textarea value
      textareaRef.current.value = newValue;

      // Move cursor to the end of the newly inserted line
      textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
        selectionStart + 1;
    }
  };
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
  const handleProcedureTypeChange = (e) => {
    setProcedureType(e.target.value);
  };

  /*
  useEffect(() => {
    const searchTerm = procedureType;
    for (let i = patient?.procedure.length - 1; i >= 0; i--) {
      if (patient?.procedure[i] === searchTerm) {
        console.log(`Found "${searchTerm}" at index ${i} from the back.`);
        break; // Stop searching once found
      }
    }
    console.log(searchTerm);
  }, [procedureType]);
  */
  return (
    <>
      <Row>
        <Col className="mb-2 d-flex justify-content-center">
          <Image src={dentalImage} alt="image" fluid className="small-image" />
        </Col>
      </Row>
      <GoBack />
      {isLoading && <Loader />}
      <h1>Treatment Record</h1>
      <Form onSubmit={submitHandler}>
        <Row className="justify-content-end">
          <Col md={2}>
            <Form.Group controlId="procedureDate" className="my-2">
              <Form.Label>Date</Form.Label>
              <Form.Control
                required
                type="date"
                value={procedureDate || ""}
                onChange={(e) => setProcedureDate(e.target.value)}
                className={procedureDate ? "" : "is-invalid"}
              />
              {!procedureDate && (
                <div className="invalid-feedback">Date is required</div>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Table>
              <tbody>
                <tr>
                  <td className="d-flex align-items-start">
                    <div className="me-3">
                      <strong>Patient Name:</strong>{" "}
                      {`${patient?.lastName}, ${patient?.firstName}`}
                    </div>
                    <div className="mx-3">
                      <strong>Age:</strong> {patient?.age}
                    </div>
                    <div className="mx-3">
                      <strong>Gender:</strong> {patient?.gender}
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        {/* <Row>
          <Col md={3}>
            <Form.Group controlId="procedureType" className="my-2">
              <Form.Label>Procedure Type:</Form.Label>
              <Form.Control
                type="text"
                value={procedureType || ""}
                placeholder="Enter Procedure Type"
                max="99" //
                onChange={(e) => setProcedureType(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row> */}
        <Row>
          <Col md={3}>
            <Form.Group controlId="procedureType" className="my-2">
              <Form.Label>Procedure Type:</Form.Label>
              <Form.Select
                value={procedureType}
                onChange={handleProcedureTypeChange}
                placeholder="Select procedure type"
              >
                <option value="">Select Procedure Type</option>
                {procedureOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {procedureArray.map((procedure, index) => (
            <React.Fragment key={index}>
              <Col md={3} className="flex-column">
                <Form.Group
                  controlId={`toothNumbers-${index}`}
                  className="my-2"
                >
                  <Form.Label>Tooth Number/s:</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Tooth Number"
                    //max="99"
                    //maxLength={2}
                    onChange={(e) =>
                      handleFieldChange(e, index, "toothNumbers")
                    }
                  />
                </Form.Group>
                <Form.Group
                  controlId={`amountCharged-${index}`}
                  className="my-2"
                >
                  <Form.Label>Amount Charged:</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Amount Charged"
                    value={procedure.amountCharged || ""}
                    onChange={(e) =>
                      handleFieldChange(e, index, "amountCharged")
                    }
                  />
                </Form.Group>
              </Col>
              {/* <Col md={9}>
                <Form.Group
                  controlId={`procedureExplanation-${index}`}
                  className="my-2"
                >
                  <Form.Label>Procedure:</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows={5}
                    placeholder="Enter Procedure"
                    //value={procedure.procedureExplanation || ""}
                    onChange={(e) =>
                      handleFieldChange(e, index, "procedureExplanation")
                    }
                  />
                </Form.Group>
              </Col> */}

              <Col md={9}>
                <Form.Group
                  controlId={`procedureExplanation-${index}`}
                  className="my-2"
                >
                  <Form.Label>Procedure:</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows={5}
                    placeholder="Enter Procedure"
                    //value={procedure.procedureExplanation || ""}
                    onChange={(e) =>
                      handleFieldChange(e, index, "procedureExplanation")
                    }
                    onKeyDown={handleKeyDown}
                  />
                </Form.Group>
              </Col>
            </React.Fragment>
          ))}
        </Row>
        <div className="text-end">
          <Button onClick={handleAddField}>Add new Procedure</Button>
        </div>

        {/* Installment type */}
        {/* Cash = false
        installment = true */}
        {/* <Row>
          <Col md={3} lg={2}>
            <Form.Group controlId="installment" className="my-2">
              <Form.Label>Payment Type:</Form.Label>
              <div className="d-flex gap-3">
                <Form.Check
                  type="radio"
                  id="installmentTrue"
                  label="Installment"
                  checked={installment === true}
                  onChange={() => setInstallment(true)}
                />
                <Form.Check
                  type="radio"
                  id="installmentFalse"
                  label="Cash"
                  checked={installment === false}
                  onChange={() => setInstallment(false)}
                />
              </div>
            </Form.Group>
          </Col>
        </Row> */}
        <Row>
          <Col md={3} lg={2}>
            <Form.Group controlId="dentists" className="my-2">
              <Form.Label>Dentist/s:</Form.Label>
              <Form.Control
                type="text"
                value={dentists || ""}
                placeholder="Enter Dentist/s Name"
                onChange={(e) => setDentists(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col md={4} lg={2}>
            {patient?.procedure?.length > 0 && (
              <Form.Group controlId="balance" className="my-2">
                <Form.Label>
                  <strong>Previous Balance:</strong>
                </Form.Label>
                <Form.Control
                  type="number"
                  value={lastBalance ? lastBalance : 0}
                  readOnly
                />
              </Form.Group>
            )}
          </Col>
        </Row>

        <Row>
          <Col md={2}>
            <Form.Group controlId="amountPaid" className="my-2">
              <Form.Label>Amount Paid:</Form.Label>
              <Form.Control
                type="number"
                value={amountPaid || ""}
                placeholder="Enter Amount"
                onChange={(e) => setAmountPaid(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={4} lg={2}>
            <Form.Group controlId="totalAmountCharged" className="my-2">
              <Form.Label>Total Amount Charged:</Form.Label>
              <Form.Control
                type="number"
                value={totalAmountCharged || ""}
                readOnly
                //onChange={(e) => setTotalAmountCharged(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group controlId="amountPaid" className="my-2">
              <Form.Label>Total Balance:</Form.Label>
              <Form.Control
                type="text" // Change type to text for displaying "Fully paid"
                value={
                  totalAmountCharged + lastBalance - amountPaid === 0
                    ? "Fully paid"
                    : totalAmountCharged + lastBalance - amountPaid
                }
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-start my-2">
          {/* {loadingRx && <Loader />} */}
          <Col md={3}>
            <Form.Group>
              <Form.Control
                id="fileInput"
                type="file"
                label="Choose file"
                multiple // Allow multiple file selection
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Button disabled={isSaving} onClick={handleFileUpload}>
              {isSaving ? "Uploading..." : "Upload"}
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-start">
          <Col md={2}>
            <Form.Group controlId="nextAppointment" className="my-2">
              <Form.Label>Next Appointment:</Form.Label>
              <Form.Control
                type="date"
                value={nextAppointment || ""}
                onChange={(e) => setNextAppointment(e.target.value)}
              />
              {!nextAppointment && (
                <div className="invalid-feedback">Date is required</div>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-start my-1">
          <Col>
            <ProcedureSignature
              className="btn btn-primary btn-lg"
              procedureSignature={procedureSignature}
              setProcedureSignature={setProcedureSignature}
            />
          </Col>
        </Row>

        <Row className="justify-content-center text-center my-4">
          <Col>
            <Button
              type="submit"
              className="btn btn-primary mx-auto"
              disabled={!procedureSignature.url}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ProcedureScreen;
