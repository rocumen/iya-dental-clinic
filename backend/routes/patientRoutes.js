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
  deletePatient,
  getAllPatientsSortedByLastName,
} from "../controller/patientController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, admin, getAllPatients);
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

router.get("/allProcedures", protect, admin, getAllPatientsProcedure);

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

router.put(
  "/changeStatus/:patientId/procedure/:procedureId",
  protect,
  admin,
  changeProcedureStatus
);

router.get("/sortPatient", protect, admin, getAllPatientsSortedByLastName);

router.delete("/deletePatient/:id", protect, admin, deletePatient);

export default router;
