import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

dotenv.config();
import connectDB from "./config/db.js";
// notfound and errorHandler
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

//Routes
import patientRoutes from "./routes/patientRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const port = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: "dyihuedqk",
  api_key: "322759471235434",
  api_secret: "Y3YLlbtQDFJiWTSoBlGixN9WBV0",
});

connectDB(); // Connect to MongoDB

const app = express();
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

//routes
app.use("/api/patients", patientRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}
// const __dirname = path.dirname("");
// const buildPath = path.join(__dirname, "../frontend/build");

// app.use(express.static(buildPath));

// app.get("/*", function (req, res) {
//   res.sendFile(
//     path.join(__dirname, "../frontend/build/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
