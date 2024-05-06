import asyncHandler from "../middleware/asyncHandler.js";
import Patient from "../models/patientModel.js";
import cloudinary from "cloudinary";

// @description Create new Patient
// @route POST /api/createPatient
// @access Private Admin

const createPatientInfo = asyncHandler(async (req, res) => {
  try {
    // Create a new patient instance
    const patient = new Patient({
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
const updatePatient = asyncHandler(async (req, res) => {
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

  const patient = await Patient.findById(req.params.id);

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

// @description Update Patient Procedure
// @route PUT /api/createProcedure/:id
// @access Private Admin
const createProcedure = asyncHandler(async (req, res) => {
  const {
    procedureType,
    procedureDate,
    procedureArray,
    dentists,
    totalAmountCharged,
    amountPaid,
    nextAppointment,
    rx,
    procedureSignature,
    previousBalance,
    appointmentTime,
    procedureStart,
    procedureEnd,
  } = req.body;

  const patient = await Patient.findById(req.params.id);

  if (patient) {
    // Calculate balance for the new procedure
    const balance = previousBalance + totalAmountCharged - amountPaid;

    const newProcedure = {
      patient: patient._id,
      patientName: `${patient.lastName}, ${patient.firstName} `,
      procedureType,
      procedureDate,
      procedureArray,
      dentists,
      totalAmountCharged,
      amountPaid,
      balance,
      previousBalance,
      nextAppointment,
      rx,
      procedureSignature,
      appointmentTime,
      procedureStart,
      procedureEnd,
    };

    patient.procedure.push(newProcedure);

    await patient.save();
    res.status(201).json({ message: "Procedure Added" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

const getAllProceduresById = asyncHandler(async (req, res) => {
  const { patientId, procedureId } = req.params;

  const patient = await Patient.findById(patientId);

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  console.log(patientId, procedureId);

  // const procedureId = req.query.procedureId; // Assuming you pass the procedure ID as a query parameter

  let procedures;

  if (procedureId) {
    // If procedureId is provided, filter procedures array to match the specified procedureId
    procedures = patient.procedure.filter(
      (procedure) => procedure._id.toString() === procedureId
    );
  } else {
    // If procedureId is not provided, return all procedures
    procedures = patient.procedure;
  }

  res.json(procedures);
});

const getAllPatientsProcedure = asyncHandler(async (req, res) => {
  try {
    // Find all patients
    const patients = await Patient.find();

    // Extract nextAppointment and patientName from all patients' procedures
    const appointments = patients.reduce((allAppointments, patient) => {
      patient.procedure.forEach((procedure) => {
        console.log(procedure);
        allAppointments.push({
          nextAppointment: procedure.nextAppointment,
          appointmentTime: procedure.appointmentTime,
          patientName: `${patient.lastName}, ${patient.firstName}`,
          status: procedure.status,
          procedureId: procedure._id,
          patientId: patient._id,
        });
      });
      return allAppointments;
    }, []);

    // Sort appointments by descending order of nextAppointment dates
    appointments.sort(
      (a, b) => new Date(a.nextAppointment) - new Date(b.nextAppointment)
    );

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @description Fetch all Patients
// @route GET /api/patients
// @access Private Admin
const getAllPatients = asyncHandler(async (req, res) => {
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

  const count = await Patient.countDocuments({ ...keyword });
  const patients = await Patient.find({ ...keyword })
    .sort({ updatedAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // Reverse the order of procedures for each patient
  patients.forEach((patient) => {
    patient.procedure.reverse();
  });

  res.json({ patients, page, pages: Math.ceil(count / pageSize) });
});

const getAllPatientsSortedByLastName = asyncHandler(async (req, res) => {
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

  const count = await Patient.countDocuments({ ...keyword });
  const patients = await Patient.find({ ...keyword })
    .sort({ lastName: 1 }) // Sort by last name in ascending order
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ patients, page, pages: Math.ceil(count / pageSize) });
});

// @description Fetch Patient by ID
// @route GET /api/patients/onePatient/:id
// @access Private Admin
const getPatientById = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (patient) {
    return res.json(patient);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

const createCircleKids = asyncHandler(async (req, res) => {
  const {
    upperRightCircle,
    upperLeftCircle,
    lowerLeftCircle,
    lowerRightCircle,
    statusTopRight,
    statusTopLeft,
    statusBottomRight,
    statusBottomLeft,
    xrayTaken,
    periodontalScreening,
    occlusion,
    appliances,
    tmd,
  } = req.body;

  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  // Create a new dental chart object
  const circleAndStatus = {
    patient: patient._id,
    patientName: `${patient.lastName}, ${patient.firstName}`,
    upperRightCircle,
    upperLeftCircle,
    lowerLeftCircle,
    lowerRightCircle,
    statusTopRight,
    statusTopLeft,
    statusBottomRight,
    statusBottomLeft,
    xrayTaken,
    periodontalScreening,
    occlusion,
    appliances,
    tmd,
  };

  // Overwrite the existing dental chart data
  patient.dentalChartKids = circleAndStatus;

  try {
    // Save the updated patient object
    await patient.save();
    //res.status(201).json({ message: "Dental Chart Saved" });
    res.json(patient);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to save dental chart");
  }
});

const updateCircleKids = asyncHandler(async (req, res) => {
  const {
    upperRightCircle,
    upperLeftCircle,
    lowerLeftCircle,
    lowerRightCircle,
    statusTopRight,
    statusTopLeft,
    statusBottomRight,
    statusBottomLeft,
    xrayTaken,
    periodontalScreening,
    occlusion,
    appliances,
    tmd,
  } = req.body;

  console.log(xrayTaken);

  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  const circleProperties = [
    "upperRightCircle",
    "upperLeftCircle",
    "lowerLeftCircle",
    "lowerRightCircle",
  ];

  const colors = [
    "colorTop",
    "colorBottom",
    "colorLeft",
    "colorRight",
    "donut_hole",
  ];

  for (const circle of circleProperties) {
    const circleData = req.body[circle];
    if (!circleData) continue;

    for (const prop of Object.keys(circleData)) {
      const colorData = circleData[prop];
      if (!colorData) continue;

      for (const color of colors) {
        if (colorData[color]) {
          patient.dentalChartKids[circle][prop][color] = colorData[color];
        }
      }
    }
  }

  if (statusTopRight) {
    patient.dentalChartKids.statusTopRight = statusTopRight;
  }

  if (statusTopLeft) {
    patient.dentalChartKids.statusTopLeft = statusTopLeft;
  }

  if (statusBottomRight) {
    patient.dentalChartKids.statusBottomRight = statusBottomRight;
  }

  if (statusBottomLeft) {
    patient.dentalChartKids.statusBottomLeft = statusBottomLeft;
  }

  if (xrayTaken) {
    patient.dentalChartKids.xrayTaken = xrayTaken;
  }

  if (periodontalScreening) {
    patient.dentalChartKids.periodontalScreening = periodontalScreening;
  }

  if (occlusion) {
    patient.dentalChartKids.occlusion = occlusion;
  }

  if (appliances) {
    patient.dentalChartKids.appliances = appliances;
  }

  if (tmd) {
    patient.dentalChartKids.tmd = tmd;
  }

  try {
    // Save the updated patient object
    await patient.save();
    res.json(patient.dentalChartKids); // Return the updated dental chart
  } catch (error) {
    res.status(500);
    throw new Error("Failed to update dental chart");
  }
});

const getCircleKids = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  // console.log(patientId);
  const patient = await Patient.findById(patientId);

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  res.json(patient.dentalChartKids);
});

const createCircleAdult = asyncHandler(async (req, res) => {
  const {
    upperRightCircle,
    upperLeftCircle,
    lowerLeftCircle,
    lowerRightCircle,
    statusTopRight,
    statusTopLeft,
    statusBottomRight,
    statusBottomLeft,
    xrayTaken,
    periodontalScreening,
    occlusion,
    appliances,
    tmd,
  } = req.body;

  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  // Create a new dental chart object
  const circleAndStatus = {
    patient: patient._id,
    patientName: `${patient.lastName}, ${patient.firstName}`,
    upperRightCircle,
    upperLeftCircle,
    lowerLeftCircle,
    lowerRightCircle,
    statusTopRight,
    statusTopLeft,
    statusBottomRight,
    statusBottomLeft,
    xrayTaken,
    periodontalScreening,
    occlusion,
    appliances,
    tmd,
  };

  // Overwrite the existing dental chart data
  patient.dentalChartAdult = circleAndStatus;

  try {
    // Save the updated patient object
    await patient.save();
    //res.status(201).json({ message: "Dental Chart Saved" });
    res.json(patient);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to save dental chart");
  }
});

const updateCircleAdult = asyncHandler(async (req, res) => {
  const {
    upperRightCircle,
    upperLeftCircle,
    lowerLeftCircle,
    lowerRightCircle,
    statusTopRight,
    statusTopLeft,
    statusBottomRight,
    statusBottomLeft,
    xrayTaken,
    periodontalScreening,
    occlusion,
    appliances,
    tmd,
  } = req.body;

  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  const circleProperties = [
    "upperRightCircle",
    "upperLeftCircle",
    "lowerLeftCircle",
    "lowerRightCircle",
  ];

  const colors = [
    "colorTop",
    "colorBottom",
    "colorLeft",
    "colorRight",
    "donut_hole",
  ];

  for (const circle of circleProperties) {
    const circleData = req.body[circle];
    if (!circleData) continue;

    for (const prop of Object.keys(circleData)) {
      const colorData = circleData[prop];
      if (!colorData) continue;

      for (const color of colors) {
        if (colorData[color]) {
          patient.dentalChartAdult[circle][prop][color] = colorData[color];
        }
      }
    }
  }

  if (statusTopRight) {
    patient.dentalChartAdult.statusTopRight = statusTopRight;
  }

  if (statusTopLeft) {
    patient.dentalChartAdult.statusTopLeft = statusTopLeft;
  }

  if (statusBottomRight) {
    patient.dentalChartAdult.statusBottomRight = statusBottomRight;
  }

  if (statusBottomLeft) {
    patient.dentalChartAdult.statusBottomLeft = statusBottomLeft;
  }

  if (xrayTaken) {
    patient.dentalChartAdult.xrayTaken = xrayTaken;
  }

  if (periodontalScreening) {
    patient.dentalChartAdult.periodontalScreening = periodontalScreening;
  }

  if (occlusion) {
    patient.dentalChartAdult.occlusion = occlusion;
  }

  if (appliances) {
    patient.dentalChartAdult.appliances = appliances;
  }

  if (tmd) {
    patient.dentalChartAdult.tmd = tmd;
  }

  try {
    // Save the updated patient object
    await patient.save();
    res.json(patient.dentalChartAdult); // Return the updated dental chart
  } catch (error) {
    res.status(500);
    throw new Error("Failed to update dental chart");
  }
});

const getCircleAdult = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  const patient = await Patient.findById(patientId);

  if (!patient) {
    res.status(404);
    throw new Error("Patient not Found");
  }

  res.json(patient.dentalChartAdult);
});

const changeProcedureStatus = asyncHandler(async (req, res) => {
  const { patientId, procedureId } = req.body;

  console.log(patientId, procedureId);

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      res.status(404);
      throw new Error("Patient not Found");
    }

    const procedureIndexToUpdate = patient.procedure.findIndex(
      (procedure) => procedure._id.toString() === procedureId
    );

    // console.log(procedureIndexToUpdate);

    if (procedureIndexToUpdate === -1) {
      res.status(404);
      throw new Error("Procedure not found for the given ID");
    }

    // Create a new patient object with updated procedure status
    // const updatedPatient = await Patient.findByIdAndUpdate(
    //   patientId,
    //   { $set: { [`procedure.${procedureIndexToUpdate}.status`]: true } },
    //   { new: true }
    // );

    console.log(patient.procedure[0].status);

    // console.log(patient.procedure[procedureIndexToUpdate].status);

    // const updated = patient.procedure[procedureIndexToUpdate].status = !patient.procedure[procedureIndexToUpdate].status;
    patient.procedure[procedureIndexToUpdate].status =
      !patient.procedure[procedureIndexToUpdate].status;
    await patient.save();

    // if (!updatedPatient) {
    //   res.status(404);
    //   throw new Error("Failed to update procedure status");
    // }

    res.json({
      message: "hi",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findByIdAndDelete(req.params.id);

  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  res.json({ message: "Patient deleted successfully" });
});

export {
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
};
