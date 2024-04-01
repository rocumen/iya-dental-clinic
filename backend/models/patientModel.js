import mongoose, { mongo } from "mongoose";

// for minors
const parentGuardianSchema = mongoose.Schema({
  parentName: {
    type: String,
  },
  parentOccupation: {
    type: String,
  },
  referral: {
    type: String,
  },
  reasonForDentalConsult: {
    type: String,
  },
});

// Dental History
const dentalHistorySchema = mongoose.Schema({
  previousDentist: {
    type: String,
  },
  lastDentalVisit: {
    type: Date,
  },
});

// Medical history
const medicalHistorySchema = mongoose.Schema({
  physicianName: {
    type: String,
  },
  specialty: {
    type: String,
  },
  officeAddress: {
    type: String,
  },
  officeNumber: {
    type: Number,
  },
  isGoodHealth: {
    type: Boolean,
  },

  // With explanations
  isMedicalTreatment: {
    type: Boolean,
  },
  medicalTreatmentExplanation: {
    type: String,
  },

  isIllnessOrSurgicalOperation: {
    type: Boolean,
  },
  illnessOrSurgicalOperationExplanation: {
    type: String,
  },

  isHospitalized: {
    type: Boolean,
  },
  hospitalizedExplanation: {
    type: String,
  },

  isPrescription: {
    type: Boolean,
  },
  prescriptionExplanation: {
    type: String,
  },

  isTobacco: {
    type: Boolean,
  },
  isAlcoholOrDangerousDrugs: {
    type: Boolean,
  },

  allergies: [
    {
      type: String,
    },
  ],
  otherAllergies: [
    {
      type: String,
    },
  ],

  // if woman

  bleedingTime: {
    type: String,
  },

  isPregnant: {
    type: Boolean,
  },
  isNursing: {
    type: Boolean,
  },
  isTakingPills: {
    type: Boolean,
  },
  //-----

  illnessOrDiseases: [
    {
      type: String, // Name of the illness or disease
    },
  ],
  otherIllnessOrDiseases: [
    {
      type: String,
    },
  ],
});

const procedureSchema = mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  patientName: String,
  procedureType: String,
  procedureDate: Date,

  procedureArray: [
    {
      toothNumbers: Number,
      procedureExplanation: String,
      amountCharged: Number,
    },
  ],
  status: {
    type: Boolean,
    default: true,
  },

  dentists: String,
  amountCharged: Number,
  totalAmountCharged: Number,
  amountPaid: Number,
  balance: Number,
  previousBalance: Number,
  nextAppointment: Date,

  rx: [
    {
      url: {
        type: String,
      },
      id: {
        type: String,
      },
    },
  ],
  procedureSignature: {
    url: String,
    id: String,
  },
});

const dentalChartKidSchema = mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  patientName: String,
  statusTopRight: {
    box1: String,
    box2: String,
    box3: String,
    box4: String,
    box5: String,
    box6: String,
    box7: String,
    box8: String,
    box9: String,
    box10: String,
  },

  statusTopLeft: {
    box1: String,
    box2: String,
    box3: String,
    box4: String,
    box5: String,
    box6: String,
    box7: String,
    box8: String,
    box9: String,
    box10: String,
  },

  statusBottomRight: {
    box1: String,
    box2: String,
    box3: String,
    box4: String,
    box5: String,
    box6: String,
    box7: String,
    box8: String,
    box9: String,
    box10: String,
  },

  statusBottomLeft: {
    box1: String,
    box2: String,
    box3: String,
    box4: String,
    box5: String,
    box6: String,
    box7: String,
    box8: String,
    box9: String,
    box10: String,
  },
  upperRightCircle: {
    one: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    two: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    three: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    four: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    five: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },
  },

  upperLeftCircle: {
    six: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    seven: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    eight: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    nine: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    ten: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },
  },

  lowerRightCircle: {
    eleven: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    twelve: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    thirteen: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    fourteen: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    fifteen: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },
  },

  lowerLeftCircle: {
    sixteen: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    seventeen: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    eighteen: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    nineteen: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    twenty: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },
  },

  xrayTaken: {
    periapical: String,
    panoramic: String,
    cephalometric: String,
    occlusal: String,
    othersXray: String,
  },

  periodontalScreening: {
    gingivitis: String,
    earlyPeriodontitis: String,
    moderatePeriodontitis: String,
    advancedPeriodontitis: String,
  },

  occlusion: {
    class: String,
    overjet: String,
    overbite: String,
    midlineDeviation: String,
    crossbite: String,
  },

  appliances: {
    orthodontic: String,
    stayplate: String,
    othersAppliances: String,
  },

  tmd: {
    clenching: String,
    clicking: String,
    trismus: String,
    muscleSpasm: String,
  },
});

const dentalChartAdultSchema = mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  patientName: String,
  statusTopRight: {
    box1: String,
    box2: String,
    box3: String,
    box4: String,
    box5: String,
    box6: String,
    box7: String,
    box8: String,
    box9: String,
    box10: String,
    box11: String,
    box12: String,
    box13: String,
    box14: String,
    box15: String,
    box16: String,
  },
  //
  statusTopLeft: {
    box1: String,
    box2: String,
    box3: String,
    box4: String,
    box5: String,
    box6: String,
    box7: String,
    box8: String,
    box9: String,
    box10: String,
    box11: String,
    box12: String,
    box13: String,
    box14: String,
    box15: String,
    box16: String,
  },
  //
  statusBottomRight: {
    box1: String,
    box2: String,
    box3: String,
    box4: String,
    box5: String,
    box6: String,
    box7: String,
    box8: String,
    box9: String,
    box10: String,
    box11: String,
    box12: String,
    box13: String,
    box14: String,
    box15: String,
    box16: String,
  },
  //
  statusBottomLeft: {
    box1: String,
    box2: String,
    box3: String,
    box4: String,
    box5: String,
    box6: String,
    box7: String,
    box8: String,
    box9: String,
    box10: String,
    box11: String,
    box12: String,
    box13: String,
    box14: String,
    box15: String,
    box16: String,
  },
  //
  upperRightCircle: {
    one: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    two: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    three: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    four: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    five: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },
    six: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },
    seven: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },
    eight: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },
  },
  //
  upperLeftCircle: {
    nine: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    ten: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    eleven: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    twelve: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    thirteen: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },
    fourteen: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },
    fifteen: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },
    sixteen: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },
  },
  //
  lowerRightCircle: {
    seventeen: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    eighteen: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    nineteen: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    twenty: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    twentyone: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },
    twentytwo: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },
    twentythree: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },
    twentyfour: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },
  },
  //
  lowerLeftCircle: {
    twentyfive: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    twentysix: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    twentyseven: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    twentyeight: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },

    twentynine: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },
    thirty: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },
    thirtyone: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },
    thirtytwo: {
      colorTop: String,
      colorLeft: String,
      colorRight: String,
      colorBottom: String,
      donut_hole: String,
    },
  },
  xrayTaken: {
    periapical: String,
    panoramic: String,
    cephalometric: String,
    occlusal: String,
    othersXray: String,
  },

  periodontalScreening: {
    gingivitis: String,
    earlyPeriodontitis: String,
    moderatePeriodontitis: String,
    advancedPeriodontitis: String,
  },

  occlusion: {
    class: String,
    overjet: String,
    overbite: String,
    midlineDeviation: String,
    crossbite: String,
  },

  appliances: {
    orthodontic: String,
    stayplate: String,
    othersAppliances: String,
  },

  tmd: {
    clenching: String,
    clicking: String,
    trismus: String,
    muscleSpasm: String,
  },
});

const patientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
    },

    nickName: {
      type: String,
    },
    address: {
      type: String,
    },
    occupation: {
      type: String,
    },
    gender: {
      type: String,
    },

    contactNumber: {
      type: Number,
    },

    email: {
      type: String,
    },

    birthday: {
      type: Date,
    },
    age: {
      type: Number,
    },
    bloodType: {
      type: String,
    },
    bloodPressure: {
      type: String,
    },
    religion: {
      type: String,
    },

    dentalInsurance: {
      type: String,
    },
    effectiveDate: {
      type: Date,
    },

    forMinors: [parentGuardianSchema],

    dentalHistory: [dentalHistorySchema],

    medicalHistory: [medicalHistorySchema],

    procedure: [procedureSchema],

    dentalChartKids: dentalChartKidSchema,

    dentalChartAdult: dentalChartAdultSchema,

    // images / signature

    patientPicture: {
      url: String,
      id: String,
    },

    signatureImage: {
      url: {
        type: String,
      },
      id: {
        type: String,
      },
    },

    consentSignature: {
      url: {
        type: String,
      },
      id: {
        type: String,
      },
    },

    dentistSignature: {
      url: {
        type: String,
      },
      id: {
        type: String,
      },
    },

    dataPrivacySignature: {
      url: {
        type: String,
      },
      id: {
        type: String,
      },
    },

    //////////////

    consentDate: Date,

    lastVisit: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
