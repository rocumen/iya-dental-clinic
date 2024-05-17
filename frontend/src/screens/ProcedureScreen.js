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
  const [customProcedureType, setCustomProcedureType] = useState("");
  const [procedureDate, setProcedureDate] = useState("");
  const [installment, setInstallment] = useState(false);

  const [procedureArray, setProcedureArray] = useState([
    { toothNumbers: null, procedureExplanation: "", amountCharged: null },
  ]);

  const [dentists, setDentists] = useState("");

  const [totalAmountCharged, setTotalAmountCharged] = useState(null);
  const [amountPaid, setAmountPaid] = useState(null);
  const [balance, setBalance] = useState(null);
  const [previousBalance, setPreviousBalance] = useState(null);
  const [nextAppointment, setNextAppointment] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  // const [rx, setRx] = useState([{ url: "", id: "" }]);
  const [rx, setRx] = useState([]);
  const [procedureSignature, setProcedureSignature] = useState({
    url: "",
    id: "",
  });
  const [procedureStart, setProcedureStart] = useState("");
  const [procedureEnd, setProcedureEnd] = useState("");
  const [antibiotic, setAntibiotic] = useState(null);
  const [painReliever, setPainReliever] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setProcedureArray(procedureArray);
    setProcedureType(procedureType);
    setCustomProcedureType(customProcedureType);
    setProcedureDate(procedureDate);
    setDentists(dentists);

    setTotalAmountCharged(totalAmountCharged);
    setAmountPaid(amountPaid);
    setBalance(balance);
    setPreviousBalance(previousBalance);
    setNextAppointment(nextAppointment);
    setAppointmentTime(appointmentTime);
    setRx(rx);
    setProcedureSignature(procedureSignature);
    setProcedureStart(procedureStart);
    setProcedureEnd(procedureEnd);
    setAntibiotic(antibiotic);
    setPainReliever(painReliever);
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
    previousBalance,
    appointmentTime,
    procedureStart,
    procedureEnd,
    painReliever,
    antibiotic,
    customProcedureType,
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

  // Find the first procedure with the matching type
  const matchingProcedure = patient?.procedure
    ?.slice()
    .reverse()
    .find((p) => p.procedureType === procedureType);

  // Extract the balance of the matching procedure, or return null if no matching procedure is found
  const pp = matchingProcedure ? matchingProcedure.balance : null;

  useEffect(() => {
    setPreviousBalance(pp);
  }, [pp]); // This will update the state whenever pp changes

  const handleTotalBalance =
    totalAmountCharged + pp - amountPaid === 0
      ? "Fully paid"
      : (totalAmountCharged + pp - amountPaid).toString();

  useEffect(() => {
    if (totalAmountCharged !== null && amountPaid !== null) {
      setBalance(totalAmountCharged + pp - amountPaid);
    }
  }, [totalAmountCharged, amountPaid, pp]);

  const handleFileUpload = async (e) => {
    const fileInput = document.getElementById("fileInput");
    const files = fileInput.files;

    if (!files.length) {
      toast.error("Please select at least one file.");
      return;
    }

    if (files.length > 3) {
      toast.error("You can only upload 3 Images per Procedure");
      return;
    }

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];

    for (const file of files) {
      if (!allowedMimeTypes.includes(file.type)) {
        toast.error("Only images (JPEG, PNG, GIF) are allowed to upload");
        return;
      }
    }

    if (isSaving) return; // If already saving, return to avoid multiple clicks

    setIsSaving(true); // Set isSaving to true when the button is clicked

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("rx", files[i]);
    }

    try {
      const { data } = await uploadRx(formData); // Update function name
      toast.success(data.message);

      setIsSaving(false);
      setRx(data.rxs);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isSaving) return; // If already saving, return to avoid multiple clicks

      setIsSaving(true); // Set isSaving to true when the button is clicked

      // Determine the procedure type based on whether a custom type is provided or not
      const selectedProcedureType =
        procedureType === "" ? customProcedureType : procedureType;

      await createProcedure({
        patientId,
        procedureType: selectedProcedureType, // Use the selected procedure type
        procedureDate,
        procedureArray, // Pass the procedureArray containing toothNumbers and procedureExplanation
        dentists,
        totalAmountCharged,
        amountPaid,
        // balance,
        nextAppointment,
        rx,
        procedureSignature,
        installment,
        previousBalance,
        appointmentTime,
        procedureStart,
        procedureEnd,
        antibiotic,
        painReliever,
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
  const handleCustomProcedureTypeChange = (event) => {
    setCustomProcedureType(event.target.value);
  };

  const rxPainRelievers = [
    {
      name: "Paracetamol 500mg",
      quantity: "#16tab",
      instructions: "Sig: Take 1tab every 4hrs or as needed for pain",
    },
    {
      name: "Mefenamic Acid 500mg",
      quantity: "#12caps",
      instructions: "Sig: Take 1cap every 6hrs or as needed for pain",
    },
    {
      name: "Ibuprofen 200mg",
      quantity: "#12tabs",
      instructions: "Sig: Take 1tab every 6hrs or as needed for pain",
    },
    {
      name: "Naproxen Sodium 550mg",
      quantity: "#6tabs",
      instructions: "Sig: Take 1tab every 12hrs or as needed for pain",
    },
    {
      name: "Etoricoxib 120mg",
      quantity: "#5tabs",
      instructions: "Sig: Take 1tab once daily or as needed for pain",
    },
    {
      name: "Celecoxib 200mg",
      quantity: "#6caps",
      instructions: "Sig: Take 1cap every 12hrs or as needed for pain",
    },
    {
      name: "Tramadol/Paracetamol 37.5mg/325",
      quantity: "#6tabs",
      instructions: "Sig: Take 1tab every 6hrs or as needed for pain",
    },
  ];

  const handlePainRelieverChange = (e) => {
    const selectedPainReliever = JSON.parse(e.target.value);
    setPainReliever(selectedPainReliever);
  };

  const rxAntibiotics = [
    {
      name: "Amoxicillin 250mg",
      quantity: "#21caps",
      instructions: "Sig: Take 1cap every 8hrs for 7days",
    },
    {
      name: "Amoxicillin 500mg",
      quantity: "#21caps",
      instructions: "Sig: Take 1cap every 8hrs for 7days",
    },
    {
      name: "Clindamycin 300mg",
      quantity: "#28caps",
      instructions: "Sig: Take 1cap every 6hrs for 7days",
    },
    {
      name: "Cefalexin 500mg",
      quantity: "#21caps",
      instructions: "Sig: Take 1cap every 8hrs for 7days",
    },
    {
      name: "Azithromycin 500mg",
      quantity: "#3tab",
      instructions: "Sig: Take once daily for 3days",
    },
    {
      name: "Co-Amoxiclav 500mg/125mg",
      quantity: "#21caps",
      instructions: "Sig: Take 1caps every 8hrs for 7days",
    },
  ];
  const handleAntibioticChange = (e) => {
    const selectedAntibiotic = JSON.parse(e.target.value);
    setAntibiotic(selectedAntibiotic);
  };

  const handleTimeChange = (e) => {
    // Splitting the time string to separate hours and minutes
    const [hours, minutes] = e.target.value.split(":");

    // Checking if the selected time is in the afternoon
    const isPM = parseInt(hours) >= 12;

    // Converting hours to 12-hour format
    const twelveHourFormat = parseInt(hours) % 12 || 12;

    // Combining hours, minutes, and AM/PM
    const formattedTime = `${twelveHourFormat}:${minutes} ${
      isPM ? "PM" : "AM"
    }`;

    // Setting the formatted time to state
    setAppointmentTime(formattedTime);
  };

  const handleTimeStart = (e) => {
    // Splitting the time string to separate hours and minutes
    const [hours, minutes] = e.target.value.split(":");

    // Checking if the selected time is in the afternoon
    const isPM = parseInt(hours) >= 12;

    // Converting hours to 12-hour format
    const twelveHourFormat = parseInt(hours) % 12 || 12;

    // Combining hours, minutes, and AM/PM
    const formattedTime = `${twelveHourFormat}:${minutes} ${
      isPM ? "PM" : "AM"
    }`;

    // Setting the formatted time to state
    setProcedureStart(formattedTime);
  };

  const handleTimeEnd = (e) => {
    // Splitting the time string to separate hours and minutes
    const [hours, minutes] = e.target.value.split(":");

    // Checking if the selected time is in the afternoon
    const isPM = parseInt(hours) >= 12;

    // Converting hours to 12-hour format
    const twelveHourFormat = parseInt(hours) % 12 || 12;

    // Combining hours, minutes, and AM/PM
    const formattedTime = `${twelveHourFormat}:${minutes} ${
      isPM ? "PM" : "AM"
    }`;

    // Setting the formatted time to state
    setProcedureEnd(formattedTime);
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
      <div className="text-center">
        <h1>Treatment Record</h1>
      </div>
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
          <Col md={5}>
            <Form.Group controlId="procedureType" className="my-2">
              <Form.Label>Procedure Type:</Form.Label>
              <div className="d-flex">
                <Form.Select
                  value={procedureType}
                  onChange={handleProcedureTypeChange}
                  placeholder="Select procedure type"
                  style={{ flex: 1, marginRight: 10 }} // Adjust styles as needed
                >
                  <option value="">Select Procedure Type</option>
                  {procedureOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control
                  type="text"
                  value={customProcedureType} // State variable for custom input
                  onChange={handleCustomProcedureTypeChange} // Handler for custom input
                  placeholder="Other (specify)"
                  disabled={procedureType !== ""} // Disable if a selection is made
                  style={{ flex: 1 }} // Adjust styles as needed
                />
              </div>
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
        <Row>
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
        </Row>
        <Row>
          <Col md={4}>
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

          <Col md={4}>
            {patient?.procedure?.length > 0 && (
              <Form.Group controlId="balance" className="my-2">
                <Form.Label>
                  <strong>Previous Balance:</strong>
                </Form.Label>
                <Form.Control type="number" value={pp ? pp : 0} readOnly />
              </Form.Group>
            )}
          </Col>
        </Row>

        <Row>
          <Col md={3}>
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
          <Col md={4}>
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

          <Col md={3}>
            <Form.Group controlId="amountPaid" className="my-2">
              <Form.Label>Total Balance:</Form.Label>
              <Form.Control
                type="text" // Change type to text for displaying
                value={handleTotalBalance}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-start my-2">
          {/* {loadingRx && <Loader />} */}
          <Col md={3}>
            <p className="text-danger">Maximum of 3 Images</p>
            <Form.Group>
              <Form.Control
                id="fileInput"
                type="file"
                label="Choose file"
                multiple // Allow multiple file selection
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="my-2">
          <Col md={6}>
            <div className="row">
              <div className="col-12 my-1">
                <Button
                  disabled={isSaving || rx.length > 0}
                  onClick={handleFileUpload}
                >
                  {isSaving ? "Uploading..." : "Upload"}
                </Button>
              </div>
              <div className="col-6 mb-2">
                <Form.Group controlId="procedureStart">
                  <Form.Label>Time Start:</Form.Label>
                  <Form.Control
                    type="time"
                    onChange={handleTimeStart}
                  ></Form.Control>
                </Form.Group>
              </div>
              <div className="col-6 mb-2">
                <Form.Group controlId="procedureEnd">
                  <Form.Label>Time End:</Form.Label>
                  <Form.Control
                    type="time"
                    onChange={handleTimeEnd}
                  ></Form.Control>
                </Form.Group>
              </div>
              <div className="col-6 mb-2">
                <Form.Group controlId="nextAppointment">
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
              </div>
              <div className="col-6 mb-2">
                <Form.Group controlId="appointmentTime">
                  <Form.Label>Time of Appointment:</Form.Label>
                  <Form.Control
                    type="time"
                    onChange={handleTimeChange}
                  ></Form.Control>
                </Form.Group>
              </div>
            </div>
          </Col>

          <Col md={4} className="mx-auto my-2">
            <div className="mb-2">
              <Form.Group controlId="antibiotic">
                <Form.Label>
                  <h4>Rx</h4>
                  <span>Antibiotics:</span>
                </Form.Label>
                <Form.Select onChange={handleAntibioticChange}>
                  <option value="">Select Antibiotic</option>
                  {rxAntibiotics.map((antibiotic, index) => (
                    <option key={index} value={JSON.stringify(antibiotic)}>
                      {antibiotic.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="mb-2">
              <Form.Group controlId="painReliever">
                <Form.Label>
                  <span>Pain Reliever:</span>
                </Form.Label>
                <Form.Select onChange={handlePainRelieverChange}>
                  <option value="">Select Pain Reliever</option>
                  {rxPainRelievers.map((painReliever, index) => (
                    <option key={index} value={JSON.stringify(painReliever)}>
                      {painReliever.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
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
