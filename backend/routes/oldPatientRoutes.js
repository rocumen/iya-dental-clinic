import express from "express";

import {
  createPatientInfo,
  updatePatient,
  getAllPatients,
  getAllPatientsSortedByLastName,
  deletePatient,
} from "../controller/oldPatientController.js";

const router = express.Router();

router.get("/", getAllPatients);
router.post("/createPatient", createPatientInfo);
router.put("/updatePatient/:id", updatePatient);

router.get("/sortPatient", getAllPatientsSortedByLastName);
router.delete("/deletePatient/:id", deletePatient);

export default router;
