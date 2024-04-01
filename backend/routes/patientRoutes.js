import express from "express";

import {
  createPatientInfo,
  updatePatient,
  getAllPatients,
  getPatientById,
  createProcedure,
  getAllProceduresById,
  getAllPatientsProcedure,
  createCircleKids,
  updateCircleKids,
  getCircleKids,
  createCircleAdult,
  updateCircleAdult,
  getCircleAdult,
  changeProcedureStatus,
} from "../controller/patientController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllPatients);
router.post("/createPatient", protect, admin, createPatientInfo);
router.put("/updatePatient/:id", protect, admin, updatePatient);

// router.get("/all", getAllPatients);
router.get("/onePatient/:id", protect, admin, getPatientById);

router.post("/createProcedure/:id", protect, admin, createProcedure);
router.get(
  "/patientProcedure/:patientId/procedures/:procedureId",
  protect,
  admin,
  getAllProceduresById
);

router.get("/allProcedures", getAllPatientsProcedure);

router.post("/dentalChartKids/:id", createCircleKids);
router.put("/dentalChartKids/update/:id", updateCircleKids);
router.get("/dentalChartKids/:patientId/get/:dentalChartId", getCircleKids);

router.post("/dentalChartAdult/:id", createCircleAdult);
router.put("/dentalChartAdult/update/:id", updateCircleAdult);
router.get("/dentalChartAdult/:patientId/get/:dentalChartId", getCircleAdult);

router.put(
  "/changeStatus/:patientId/procedure/:procedureId",
  changeProcedureStatus
);

export default router;
