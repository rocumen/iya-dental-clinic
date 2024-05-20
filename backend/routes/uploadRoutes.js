import express from "express";
import multer from "multer";

import {
  signatureImage,
  consentSignature,
  dentistSignature,
  dataPrivacySignature,
  rx,
  procedureSignature,
  patientImage,
} from "../controller/uploadController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
}); // Use memory storage since Cloudinary requires a buffer or stream

const upload = multer({ storage });

// SIGNATURE IMAGE
// @ /upload/signatureImage
router.post("/signatureImage", upload.single("signatureImage"), signatureImage);

// CONSENT SIGNATURE
// @ /upload/consentSignature
router.post(
  "/consentSignature",
  upload.single("consentSignature"),
  consentSignature
);

//DENTIST SIGNATURE
// @ /upload/dentistSignature
router.post(
  "/dentistSignature",
  upload.single("dentistSignature"),
  dentistSignature
);

// DATA PRIVACY SIGNATURE
// @ /upload/dataPrivacySignature
router.post(
  "/dataPrivacySignature",
  upload.single("dataPrivacySignature"),
  dataPrivacySignature
);

// IMAGE UPLOAD FOR RX
// @ /upload/rx
router.post("/rx", upload.array("rx", 10), rx);

// IMAGE UPLOAD FOR PATIENT IMAGE
// @ /upload/patientImage
router.post("/patientImage", upload.array("patientImage", 10), patientImage);

// PROCEDURE SIGNATURE
// @ /upload/procedureSignature
router.post(
  "/procedureSignature",
  upload.single("procedureSignature"),
  procedureSignature
);

export default router;
