import express from "express";

import {
  createPatientInfo,
  updatePatient,
  getAllPatients,
  getAllPatientsSortedByLastName,
  deletePatient,
  createProcedure,
  getPatientById,
  getAllPatientsProcedure,
  changeProcedureStatus,
} from "../controller/oldPatientController.js";

const router = express.Router();

router.get("/", getAllPatients);
router.get("/onePatient/:id", getPatientById);
router.post("/createPatient", createPatientInfo);
router.put("/updatePatient/:id", updatePatient);

router.get("/sortPatient", getAllPatientsSortedByLastName);
router.delete("/deletePatient/:id", deletePatient);

router.post("/createProcedure/:id", createProcedure);

router.get("/allProcedures", getAllPatientsProcedure);

router.put(
  "/changeStatus/:patientId/procedure/:procedureId",
  changeProcedureStatus
);
export default router;
