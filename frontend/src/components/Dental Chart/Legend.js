import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const Legend = ({ register }) => {
  return (
    <>
      <Row className="mt-4">
        <Col>
          <h4>Legend:</h4>
          <Row className="justify-content-center">
            <Col md={3} className=" ">
              <h6>Condition</h6>
              <div>check - Present Teeth</div>
              <div>D - Decayed (Caries Indicated for Filling)</div>
              <div>M - Missing due to Caries</div>
              <div>MO - Missing due to Other Causes</div>
              <div>Im - Impacted Tooth</div>
              <div>Sp - Supernumerary Tooth</div>
              <div>Rf - Root Fragment</div>
              <div>Un - Unerupted</div>
            </Col>
            <Col md={3}>
              <h6>Restorations & Prosthetics</h6>
              <div>Am - Amaigam Filling</div>
              <div>Co - Composite Filling</div>
              <div>JC- Jacket Crown</div>
              <div>Ab - Abutment</div>
              <div>Att - Attachment</div>
              <div>P - Pontic</div>
              <div>In- inlay</div>
              <div>Imp - Implant</div>
              <div>S - Sealants</div>
              <div>Rm - Removable Denture</div>
            </Col>
            <Col md={3}>
              <h6>Surgery</h6>
              <div>X - Extraction due to Carries</div>
              <div>XO - Extraction due to Other Causes</div>
              <div></div>
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Col md={4} sm={12}>
              <div className="text-center">
                <h6>X-ray Taken:</h6>
              </div>

              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="periapical">
                    <Form.Label>Periapical</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start">
                  <Form.Group controlId="periapical">
                    <Form.Control {...register("periapical")} type="text" />
                  </Form.Group>
                </div>
              </div>

              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="panoramic">
                    <Form.Label>Panoramic</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start">
                  <Form.Group controlId="panoramic">
                    <Form.Control {...register("panoramic")} type="text" />
                  </Form.Group>
                </div>
              </div>

              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="cephalometric">
                    <Form.Label>Cephalometric</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start">
                  <Form.Group controlId="cephalometric">
                    <Form.Control {...register("cephalometric")} type="text" />
                  </Form.Group>
                </div>
              </div>

              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="occlusal">
                    <Form.Label>Occlusal Upper/Lower</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start ">
                  <Form.Group controlId="occlusal">
                    <Form.Control {...register("occlusal")} type="text" />
                  </Form.Group>
                </div>
              </div>
              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="othersXray">
                    <Form.Label>Others</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start">
                  <Form.Group controlId="othersXray">
                    <Form.Control {...register("othersXray")} type="text" />
                  </Form.Group>
                </div>
              </div>
            </Col>

            <Col md={4} sm={12}>
              <div className="text-center">
                <h6>Periodontal Screening</h6>
              </div>
              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="gingivitis">
                    <Form.Label>Gingivitis</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start">
                  <Form.Group controlId="gingivitis">
                    <Form.Control {...register("gingivitis")} type="text" />
                  </Form.Group>
                </div>
              </div>

              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="earlyPeriodontitis">
                    <Form.Label>Early Periodontitis</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start">
                  <Form.Group controlId="earlyPeriodontitis">
                    <Form.Control
                      {...register("earlyPeriodontitis")}
                      type="text"
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="moderatePeriodontitis">
                    <Form.Label>Moderate Periodontitis</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start ">
                  <Form.Group controlId="moderatePeriodontitis">
                    <Form.Control
                      {...register("moderatePeriodontitis")}
                      type="text"
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="advancedPeriodontitis">
                    <Form.Label>Advanced Periodontitis</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start ">
                  <Form.Group controlId="advancedPeriodontitis">
                    <Form.Control
                      {...register("advancedPeriodontitis")}
                      type="text"
                    />
                  </Form.Group>
                </div>
              </div>
            </Col>

            <Col md={4} sm={12}>
              <div className="text-center">
                <h6>Occlusion</h6>
              </div>

              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="class">
                    <Form.Label>Class</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start">
                  <Form.Group controlId="class">
                    <Form.Control {...register("class")} type="text" />
                  </Form.Group>
                </div>
              </div>

              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="overjet">
                    <Form.Label>Overjet</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start">
                  <Form.Group controlId="overjet">
                    <Form.Control {...register("overjet")} type="text" />
                  </Form.Group>
                </div>
              </div>

              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="overbite">
                    <Form.Label>Overbite</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start">
                  <Form.Group controlId="overbite">
                    <Form.Control {...register("overbite")} type="text" />
                  </Form.Group>
                </div>
              </div>

              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="midlineDeviation">
                    <Form.Label>Midline Deviation</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start ">
                  <Form.Group controlId="midlineDeviation">
                    <Form.Control
                      {...register("midlineDeviation")}
                      type="text"
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="crossbite">
                    <Form.Label>Crossbite</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start">
                  <Form.Group controlId="crossbite">
                    <Form.Control {...register("crossbite")} type="text" />
                  </Form.Group>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-start my-3">
            <Col md={4} sm={12}>
              <div className="text-center">
                <h6>Appliances</h6>
              </div>
              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="orthodontic">
                    <Form.Label>Orthodontic</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start">
                  <Form.Group controlId="orthodontic">
                    <Form.Control {...register("orthodontic")} type="text" />
                  </Form.Group>
                </div>
              </div>

              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="stayplate">
                    <Form.Label>Stayplate</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start">
                  <Form.Group controlId="stayplate">
                    <Form.Control {...register("stayplate")} type="text" />
                  </Form.Group>
                </div>
              </div>

              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="othersAppliances">
                    <Form.Label>Others</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start ">
                  <Form.Group controlId="othersAppliances">
                    <Form.Control
                      {...register("othersAppliances")}
                      type="text"
                    />
                  </Form.Group>
                </div>
              </div>
            </Col>

            <Col md={4} sm={12}>
              <div className="text-center">
                <h6>TMD</h6>
              </div>

              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="clenching">
                    <Form.Label>Clenching</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start">
                  <Form.Group controlId="clenching">
                    <Form.Control {...register("clenching")} type="text" />
                  </Form.Group>
                </div>
              </div>

              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="clicking">
                    <Form.Label>Clicking</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start">
                  <Form.Group controlId="clicking">
                    <Form.Control {...register("clicking")} type="text" />
                  </Form.Group>
                </div>
              </div>

              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="trismus">
                    <Form.Label>Trismus</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start">
                  <Form.Group controlId="trismus">
                    <Form.Control {...register("trismus")} type="text" />
                  </Form.Group>
                </div>
              </div>

              <div className="row align-items-center mb-1">
                <div className="col-5 text-center">
                  <Form.Group controlId="muscleSpasm">
                    <Form.Label>Muscle Spasm</Form.Label>
                  </Form.Group>
                </div>
                <div className="col-6 justify-content-start ">
                  <Form.Group controlId="muscleSpasm">
                    <Form.Control {...register("muscleSpasm")} type="text" />
                  </Form.Group>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Legend;
