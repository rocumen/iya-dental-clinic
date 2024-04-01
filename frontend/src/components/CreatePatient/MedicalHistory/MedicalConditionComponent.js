import React from "react";
// import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

const MedicalConditionComponent = (props) => {
  const {
    medicalHistory,
    setMedicalHistory,
    illnessOrDiseases,
    // otherIllnessOrDiseases,
  } = props;

  const handleMedicalConditionChange = (condition, isChecked) => {
    setMedicalHistory((prevMedicalHistory) => {
      if (isChecked) {
        // If the condition is checked, add it to the illnessOrDiseases array in medicalHistory
        return {
          ...prevMedicalHistory,
          illnessOrDiseases: [
            ...prevMedicalHistory.illnessOrDiseases,
            condition,
          ],
        };
      } else {
        // If the condition is unchecked, remove it from the illnessOrDiseases array in medicalHistory
        return {
          ...prevMedicalHistory,
          illnessOrDiseases: prevMedicalHistory.illnessOrDiseases.filter(
            (c) => c !== condition
          ),
        };
      }
    });
  };

  const handleOtherCondition = (e) => {
    const value = e.target.value;
    setMedicalHistory((prevMedicalHistory) => ({
      ...prevMedicalHistory,
      otherIllnessOrDiseases: value
        .split(",")
        .map((condition) => condition.trim()),
    }));
  };
  return (
    <Row>
      <Col md={12}>
        <Form.Group controlId="medicalConditions" className="my-2">
          <Form.Label>
            <strong>
              Do you have any of the following medical conditions?
            </strong>
          </Form.Label>
          <Row>
            <Col md={3}>
              <Form.Check
                type="checkbox"
                id="highBloodPressure"
                label="High Blood Pressure"
                checked={illnessOrDiseases.includes("High Blood Pressure")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "High Blood Pressure",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="lowBloodPressure"
                label="Low Blood Pressure"
                checked={illnessOrDiseases.includes("Low Blood Pressure")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Low Blood Pressure",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="epilepsy/Convulsion"
                label="Epilepsy/Convulsions"
                checked={illnessOrDiseases.includes("Epilepsy/Convulsions")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Epilepsy/Convulsions",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="aidsOrHivInfection"
                label="AIDS or HIV infection"
                checked={illnessOrDiseases.includes("AIDS or HIV infection")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "AIDS or HIV infection",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="sexuallyTransmittedDisease"
                label="Sexually Transmitted Disease"
                checked={illnessOrDiseases.includes(
                  "Sexually Transmitted Disease"
                )}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Sexually Transmitted Disease",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="stomachTroublesUlcers"
                label="Stomach Troubles/Ulcers"
                checked={illnessOrDiseases.includes("Stomach Troubles/Ulcers")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Stomach Troubles/Ulcers",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="faintingSeizure"
                label="Fainting Seizure"
                checked={illnessOrDiseases.includes("Fainting Seizure")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Fainting Seizure",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="rapidWeightLoss"
                label="Rapid Weight Loss"
                checked={illnessOrDiseases.includes("Rapid Weight Loss")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Rapid Weight Loss",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="radiationTherapy"
                label="Radiation Therapy"
                checked={illnessOrDiseases.includes("Radiation Therapy")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Radiation Therapy",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="jointReplacementImplant"
                label="Joint Replacement/Implant"
                checked={illnessOrDiseases.includes(
                  "Joint Replacement/Implant"
                )}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Joint Replacement/Implant",
                    e.target.checked
                  )
                }
              />
            </Col>

            <Col md={3}>
              <Form.Check
                type="checkbox"
                id="heartSurgery"
                label="Heart Surgery"
                checked={illnessOrDiseases.includes("Heart Surgery")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Heart Surgery",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="heartAttack"
                label="Heart Attack"
                checked={illnessOrDiseases.includes("Heart Attack")}
                onChange={(e) =>
                  handleMedicalConditionChange("Heart Attack", e.target.checked)
                }
              />

              <Form.Check
                type="checkbox"
                id="thyroidProblem"
                label="Thyroid Problem"
                checked={illnessOrDiseases.includes("Thyroid Problem")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Thyroid Problem",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="heartDisease"
                label="Heart Disease"
                checked={illnessOrDiseases.includes("Heart Disease")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Heart Disease",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="heartMurmur"
                label="Heart Murmur"
                checked={illnessOrDiseases.includes("Heart Murmur")}
                onChange={(e) =>
                  handleMedicalConditionChange("Heart Murmur", e.target.checked)
                }
              />

              <Form.Check
                type="checkbox"
                id="hepatitisLiverDisease"
                label="Hepatitis/Liver Disease"
                checked={illnessOrDiseases.includes("Hepatitis/Liver Disease")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Hepatitis/Liver Disease",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="rheumaticFever"
                label="Rheumatic Fever"
                checked={illnessOrDiseases.includes("Rheumatic Fever")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Rheumatic Fever",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="hayFeverAllergies"
                label="Hay fever/ Allergies"
                checked={illnessOrDiseases.includes("Hay fever/ Allergies")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Hay fever/ Allergies",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="respiratoryProblems"
                label="Respiratory Problems"
                checked={illnessOrDiseases.includes("Respiratory Problems")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Respiratory Problems",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="hepatitisJaundice"
                label="Hepatitis/Jaundice"
                checked={illnessOrDiseases.includes("Hepatitis/Jaundice")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Hepatitis/Jaundice",
                    e.target.checked
                  )
                }
              />
            </Col>

            <Col md={3}>
              <Form.Check
                type="checkbox"
                id="swollenAnkles"
                label="Swollen Ankles"
                checked={illnessOrDiseases.includes("Swollen Ankles")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Swollen Ankles",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="kidneyDisease"
                label="Kidney Disease"
                checked={illnessOrDiseases.includes("Kidney Disease")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Kidney Disease",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="diabetes"
                label="Diabetes"
                checked={illnessOrDiseases.includes("Diabetes")}
                onChange={(e) =>
                  handleMedicalConditionChange("Diabetes", e.target.checked)
                }
              />

              <Form.Check
                type="checkbox"
                id="chestPain"
                label="Chest Pain"
                checked={illnessOrDiseases.includes("Chest Pain")}
                onChange={(e) =>
                  handleMedicalConditionChange("Chest Pain", e.target.checked)
                }
              />

              <Form.Check
                type="checkbox"
                id="stroke"
                label="Stroke"
                checked={illnessOrDiseases.includes("Stroke")}
                onChange={(e) =>
                  handleMedicalConditionChange("Stroke", e.target.checked)
                }
              />

              <Form.Check
                type="checkbox"
                id="cancerTumors"
                label="Cancer/Tumors"
                checked={illnessOrDiseases.includes("Cancer/Tumors")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Cancer/Tumors",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="anemia"
                label="Anemia"
                checked={illnessOrDiseases.includes("Anemia")}
                onChange={(e) =>
                  handleMedicalConditionChange("Anemia", e.target.checked)
                }
              />

              <Form.Check
                type="checkbox"
                id="angina"
                label="Angina"
                checked={illnessOrDiseases.includes("Angina")}
                onChange={(e) =>
                  handleMedicalConditionChange("Angina", e.target.checked)
                }
              />

              <Form.Check
                type="checkbox"
                id="asthma"
                label="Asthma"
                checked={illnessOrDiseases.includes("Asthma")}
                onChange={(e) =>
                  handleMedicalConditionChange("Asthma", e.target.checked)
                }
              />

              <Form.Check
                type="checkbox"
                id="emphysema"
                label="Emphysema"
                checked={illnessOrDiseases.includes("Emphysema")}
                onChange={(e) =>
                  handleMedicalConditionChange("Emphysema", e.target.checked)
                }
              />
            </Col>

            <Col md={3}>
              <Form.Check
                type="checkbox"
                id="bleedingProblems"
                label="Bleeding Problems"
                checked={illnessOrDiseases.includes("Bleeding Problems")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Bleeding Problems",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="bloodDiseases"
                label="Blood Diseases"
                checked={illnessOrDiseases.includes("Blood Diseases")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Blood Diseases",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="headInjuries"
                label="Head Injuries"
                checked={illnessOrDiseases.includes("Head Injuries")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Head Injuries",
                    e.target.checked
                  )
                }
              />

              <Form.Check
                type="checkbox"
                id="arthritisRheumatism"
                label="Arthritis/Rheumatism"
                checked={illnessOrDiseases.includes("Arthritis/Rheumatism")}
                onChange={(e) =>
                  handleMedicalConditionChange(
                    "Arthritis/Rheumatism",
                    e.target.checked
                  )
                }
              />

              <Form.Group controlId="illnessOrDiseases" className="my-2">
                <Form.Label>Others</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please specify your condition"
                  value={medicalHistory.otherIllnessOrDiseases.join(",")}
                  onChange={handleOtherCondition}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default MedicalConditionComponent;
