import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const AllergiesComponent = (props) => {
  const { medicalHistory, setMedicalHistory, patientId } = props;

  const handleAllergyChange = (allergy, isChecked) => {
    setMedicalHistory((prevMedicalHistory) => {
      if (isChecked) {
        // If the allergy is checked, add it to the allergies array in medicalHistory
        return {
          ...prevMedicalHistory,
          allergies: [...prevMedicalHistory.allergies, allergy],
        };
      } else {
        // If the allergy is unchecked, remove it from the allergies array in medicalHistory
        return {
          ...prevMedicalHistory,
          allergies: prevMedicalHistory.allergies.filter((a) => a !== allergy),
        };
      }
    });
  };

  const handleOtherCondition = (e) => {
    const value = e.target.value;
    setMedicalHistory((prevMedicalHistory) => ({
      ...prevMedicalHistory,
      otherAllergies: value.split(",").map((condition) => condition.trim()),
    }));
  };
  return (
    <Row>
      <Col md={4}>
        <Form.Group controlId="allergies" className="my-2">
          <Form.Label>
            <strong>Do you have allergies to any of the following?</strong>
          </Form.Label>
          <div>
            <Form.Check
              type="checkbox"
              id="localAnesthetic"
              label="Local Anesthetic (e.g., Lidocaine)"
              checked={medicalHistory.allergies.includes("Local Anesthetic")} // Check if the allergy is in the allergies array in medicalHistory
              onChange={(e) =>
                handleAllergyChange("Local Anesthetic", e.target.checked)
              }
            />
            <Form.Check
              type="checkbox"
              id="sulfaDrugs"
              label="Sulfa Drugs"
              checked={medicalHistory.allergies.includes("Sulfa Drugs")} // Check if the allergy is in the allergies array in medicalHistory
              onChange={(e) =>
                handleAllergyChange("Sulfa Drugs", e.target.checked)
              }
            />
            <Form.Check
              type="checkbox"
              id="penicillinAntibiotics"
              label="Penicillin Antibiotics"
              checked={medicalHistory.allergies.includes(
                "Penicillin Antibiotics"
              )} // Check if the allergy is in the allergies array in medicalHistory
              onChange={(e) =>
                handleAllergyChange("Penicillin Antibiotics", e.target.checked)
              }
            />
            <Form.Check
              type="checkbox"
              id="aspirin"
              label="Aspirin"
              checked={medicalHistory.allergies.includes("Aspirin")} // Check if the allergy is in the allergies array in medicalHistory
              onChange={(e) => handleAllergyChange("Aspirin", e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              id="latex"
              label="Latex"
              checked={medicalHistory.allergies.includes("Latex")} // Check if the allergy is in the allergies array in medicalHistory
              onChange={(e) => handleAllergyChange("Latex", e.target.checked)}
            />
          </div>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="others" className="mt-2">
          <Form.Label>Please Specify your allergy.</Form.Label>
          <Form.Control
            type="text"
            placeholder="others.."
            // value={
            //   Array.isArray(medicalHistory.otherAllergies)
            //     ? medicalHistory.otherAllergies.join(",")
            //     : ""
            // }
            // value={medicalHistory.otherAllergies.join(",")}
            onChange={handleOtherCondition}
          />
        </Form.Group>
        <Row>
          <Col>
            {patientId ? (
              <ul style={{ display: "block" }}>
                <li>{medicalHistory.otherAllergies}</li>
              </ul>
            ) : (
              <ul style={{ display: "block" }}>
                <li></li>
              </ul>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AllergiesComponent;
