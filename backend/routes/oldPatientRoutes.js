import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";

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
  getProcedureById,
  createCircleKids,
  updateCircleKids,
  getCircleKids,
  createCircleAdult,
  updateCircleAdult,
  getCircleAdult,
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

router.get(
  "/patientProcedure/:patientId/procedures/:procedureId",
  getProcedureById
);

router.post("/dentalChartKids/:id", protect, admin, createCircleKids);
router.put("/dentalChartKids/update/:id", protect, admin, updateCircleKids);
router.get(
  "/dentalChartKids/:patientId/get/:dentalChartId",
  protect,
  admin,
  getCircleKids
);

router.post("/dentalChartAdult/:id", protect, admin, createCircleAdult);
router.put("/dentalChartAdult/update/:id", protect, admin, updateCircleAdult);
router.get(
  "/dentalChartAdult/:patientId/get/:dentalChartId",
  protect,
  admin,
  getCircleAdult
);

export default router;
