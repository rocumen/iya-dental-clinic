import asyncHandler from "../middleware/asyncHandler.js";
import OldPatient from "../models/oldPatientModel.js";
import cloudinary from "cloudinary";

// @description Create new Patient
// @route POST /api/createPatient
// @access Private Admin

export const createPatientInfo = asyncHandler(async (req, res) => {
  try {
    // Create a new patient instance
    const patient = new OldPatient({
      firstName: "",
      middleName: "",
      lastName: "",
      nickName: "",
      gender: "",
      contactNumber: null,
      email: "",
      birthday: null,
      age: null,
      bloodType: "",
      bloodPressure: "",
      religion: "",
      address: "",
      occupation: "",
      dentalInsurance: "",
      effectiveDate: null,

      forMinors: [
        {
          parentName: "",
          parentOccupation: "",
          referral: "",
          reasonForDentalConsult: "",
        },
      ],

      dentalHistory: [
        {
          previousDentist: "",
          lastDentalVisit: null,
        },
      ],

      medicalHistory: [
        {
          physicianName: "",
          specialty: "",
          officeAddress: "",
          officeNumber: "",
          isGoodHealth: null,
          isMedicalTreatment: null,
          medicalTreatmentExplanation: "",
          isIllnessOrSurgicalOperation: null,
          illnessOrSurgicalOperationExplanation: "",
          isHospitalized: null,
          hospitalizedExplanation: "",
          isPrescription: null,
          prescriptionExplanation: "",
          isTobacco: null,
          isAlcoholOrDangerousDrugs: null,
          allergies: [],
          otherAllergies: [],
          bleedingTime: "",
          isPregnant: null,
          isNursing: null,
          isTakingPills: null,
          illnessOrDiseases: [],
          otherIllnessOrDiseases: [],
        },
      ],

      procedure: [],

      dataPrivacySignature: {
        url: "",
        id: "",
      },

      consentSignature: {
        url: "",
        id: "",
      },

      dentistSignature: {
        url: "",
        id: "",
      },

      consentDate: null,

      signatureImage: {
        url: "",
        id: "",
      },

      rx: {
        url: "",
        id: "",
      },
      procedureSignature: {
        url: "",
        id: "",
      },
    });

    // Save the patient information to the database
    const createdPatient = await patient.save();

    res.json(createdPatient);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error:", error);
  }
});

// @description Update Patient by ID
// @route PUT /api/updatePatient/:id
// @access Private Admin
export const updatePatient = asyncHandler(async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    nickName,
    gender,
    contactNumber,
    email,
    birthday,
    age,
    religion,
    address,
    occupation,
    dentalInsurance,
    effectiveDate,
    bloodType,
    bloodPressure,
    forMinors,
    dentalHistory,
    medicalHistory,
    //
    dataPrivacySignature,
    //
    consentSignature,
    dentistSignature,
    consentDate,
    //
    signatureImage,
  } = req.body;

  const patient = await OldPatient.findById(req.params.id);

  // Capitalize the first letter of each word in the name fields
  const capitalizeFirstLetter = (str) => {
    if (!str) return str; // Return the string as is if it's undefined or null
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  if (patient) {
    patient.firstName = capitalizeFirstLetter(firstName);
    patient.middleName = capitalizeFirstLetter(middleName);
    patient.lastName = capitalizeFirstLetter(lastName);
    patient.nickName = capitalizeFirstLetter(nickName);
    patient.gender = capitalizeFirstLetter(gender);
    patient.contactNumber = contactNumber;
    patient.email = capitalizeFirstLetter(email);
    patient.birthday = birthday;
    patient.age = age;
    patient.religion = capitalizeFirstLetter(religion);
    patient.address = capitalizeFirstLetter(address);
    patient.occupation = capitalizeFirstLetter(occupation);
    patient.dentalInsurance = capitalizeFirstLetter(dentalInsurance);
    patient.effectiveDate = effectiveDate;
    patient.bloodType = bloodType;
    patient.bloodPressure = bloodPressure;
    patient.forMinors = forMinors;
    patient.dentalHistory = dentalHistory;
    patient.medicalHistory = medicalHistory;
    // patient.informedConsent = informedConsent;

    if (patient.dataPrivacySignature) {
      cloudinary.api.delete_resources([patient.dataPrivacySignature.id], {
        type: "upload",
        resource_type: "image",
      });
    }

    patient.dataPrivacySignature = dataPrivacySignature;

    if (patient.consentSignature) {
      cloudinary.api.delete_resources([patient.consentSignature.id], {
        type: "upload",
        resource_type: "image",
      });
    }

    patient.consentSignature = consentSignature;

    if (patient.dentistSignature) {
      cloudinary.api.delete_resources([patient.dentistSignature.id], {
        type: "upload",
        resource_type: "image",
      });
    }

    patient.dentistSignature = dentistSignature;

    patient.consentDate = consentDate;

    if (patient.signatureImage) {
      // Delete from cloudinary
      cloudinary.api.delete_resources([patient.signatureImage.id], {
        type: "upload",
        resource_type: "image",
      });
      // .then(console.log)
      // .catch(console.log);
    }
    patient.signatureImage = signatureImage;

    const updatedPatient = await patient.save();
    res.json(updatedPatient);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @description Fetch all Patients
// @route GET /api/patients
// @access Private Admin
export const getAllPatients = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          { firstName: { $regex: req.query.keyword, $options: "i" } },
          { lastName: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};

  const count = await OldPatient.countDocuments({ ...keyword });
  const patients = await OldPatient.find({ ...keyword })
    .sort({ updatedAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // Reverse the order of procedures for each patient
  patients.forEach((patient) => {
    patient.procedure.reverse();
  });

  res.json({ patients, page, pages: Math.ceil(count / pageSize) });
});

//sort by last name
export const getAllPatientsSortedByLastName = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;
  // PAGINATION_LIMIT=2

  const keyword = req.query.keyword
    ? {
        $or: [
          { firstName: { $regex: req.query.keyword, $options: "i" } },
          { lastName: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};

  const count = await OldPatient.countDocuments({ ...keyword });
  const patients = await OldPatient.find({ ...keyword })
    .sort({ lastName: 1 }) // Sort by last name in ascending order
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ patients, page, pages: Math.ceil(count / pageSize) });
});

//delete patient
export const deletePatient = asyncHandler(async (req, res) => {
  const patient = await OldPatient.findByIdAndDelete(req.params.id);

  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  res.json({ message: "Patient deleted successfully" });
});
