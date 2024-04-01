import cloudinary from "cloudinary";
import asyncHandler from "../middleware/asyncHandler.js";
// import { v2 as cloudinary } from "cloudinary";
import Patient from "../models/patientModel.js";

// SIGNATURE IMAGE
// @ /upload/signatureImage
const signatureImage = asyncHandler(async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    const signature = await cloudinary.v2.uploader.upload(file.path, {
      resource_type: "image",
    });

    const signatureImage = {
      url: signature.url,
      id: signature.public_id,
    };

    res.status(200).send({
      message: "Image uploaded successfully",
      signatureImage,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// CONSENT SIGNATURE
// @ /upload/consentSignature
const consentSignature = asyncHandler(async (req, res) => {
  try {
    const file = req.file;

    // const imageBuffer = Buffer.from(req.body.signatureImage, "base64");

    if (!file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    const signature = await cloudinary.v2.uploader.upload(
      file.path,
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          return res
            .status(500)
            .send({ message: "Error uploading image to Cloudinary" });
        }

        return result;
      }
    );

    const consentSignature = {
      url: signature.url,
      id: signature.public_id,
    };

    res.status(200).send({
      message: "Image uploaded successfully",
      consentSignature,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//DENTIST SIGNATURE
// @ /upload/dentistSignature
const dentistSignature = asyncHandler(async (req, res) => {
  try {
    const file = req.file;

    // const imageBuffer = Buffer.from(req.body.signatureImage, "base64");

    if (!file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    const signature = await cloudinary.v2.uploader.upload(
      file.path,
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          return res
            .status(500)
            .send({ message: "Error uploading image to Cloudinary" });
        }

        return result;
      }
    );

    const dentistSignature = {
      url: signature.url,
      id: signature.public_id,
    };

    res.status(200).send({
      message: "Image uploaded successfully",
      dentistSignature,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// DATA PRIVACY SIGNATURE
// @ /upload/dataPrivacySignature
const dataPrivacySignature = asyncHandler(async (req, res) => {
  try {
    const file = req.file;

    // const imageBuffer = Buffer.from(req.body.signatureImage, "base64");

    if (!file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    const signature = await cloudinary.v2.uploader.upload(
      file.path,
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          return res
            .status(500)
            .send({ message: "Error uploading image to Cloudinary" });
        }

        return result;
      }
    );

    const dataPrivacySignature = {
      url: signature.url,
      id: signature.public_id,
    };

    res.status(200).send({
      message: "Image uploaded successfully",
      dataPrivacySignature,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const rx = async (req, res) => {
  try {
    const files = req.files; // Use req.files to get an array of uploaded files

    if (!files || files.length === 0) {
      return res.status(400).send({ message: "No files uploaded" });
    }

    const rxs = [];

    for (const file of files) {
      const sig = await cloudinary.v2.uploader.upload(file.path, {
        resource_type: "image",
      });

      const rx = {
        url: sig.url,
        id: sig.public_id,
      };

      rxs.push(rx);
    }

    res.status(200).send({
      message: "Images uploaded successfully",
      rxs: rxs,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// DATA PRIVACY SIGNATURE
// @ /upload/dataPrivacySignature
const procedureSignature = asyncHandler(async (req, res) => {
  try {
    const file = req.file;

    // const imageBuffer = Buffer.from(req.body.signatureImage, "base64");

    if (!file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    const signature = await cloudinary.v2.uploader.upload(
      file.path,
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          return res
            .status(500)
            .send({ message: "Error uploading image to Cloudinary" });
        }

        return result;
      }
    );

    const procedureSignature = {
      url: signature.url,
      id: signature.public_id,
    };

    res.status(200).send({
      message: "Image uploaded successfully",
      procedureSignature,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export {
  signatureImage,
  consentSignature,
  dentistSignature,
  dataPrivacySignature,
  rx,
  procedureSignature,
};
