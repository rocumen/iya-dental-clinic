import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";
import App from "./App";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Redux Provider
import { Provider } from "react-redux";
import store from "./store.js";

import AdminRoute from "./components/AdminRoute.js";

// Screens
import RegisterScreen from "./screens/RegisterScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import PatientScreen from "./screens/PatientScreen.js";
// import CreatePatient from "./screens/CreatePatient.js";
import PatientList from "./screens/PatientList.js";
import UpdatePatient from "./screens/UpdatePatient.js";
import ArchivedPatients from "./screens/ArchivedPatients.js";

import ProcedureScreen from "./screens/ProcedureScreen.js";
import ProcedureDetails from "./screens/ProcedureDetails.js";
import DentalChartScreen from "./screens/DentalChartScreen.js";
import UpdateDentalChartKids from "./screens/UpdateDentalChartKids.js";

import AdultDentalChart from "./screens/AdultDentalChart.js";
import UpdateAdultDentalChart from "./screens/UpdateAdultDentalChart.js";

import ChangePasswordScreen from "./screens/ChangePasswordScreen.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="" element={<AdminRoute />}>
        <Route path="/changePassword/:id" element={<ChangePasswordScreen />} />
        <Route index={true} path="/" element={<PatientList />} />
        <Route path="/search/:keyword" element={<PatientList />} />
        <Route path="/page/:pageNumber" element={<PatientList />} />
        <Route
          path="/search/:keyword/page/:pageNumber"
          element={<PatientList />}
        />

        <Route path="/patients/onePatient/:id" element={<PatientScreen />} />
        <Route path="/patients/updatePatient/:id" element={<UpdatePatient />} />

        <Route path="/patients/archived" element={<ArchivedPatients />} />
        <Route
          path="/patients/createProcedure/:id"
          element={<ProcedureScreen />}
        />
        <Route
          path="/patients/procedureDetails/:patientId/procedures/:procedureId"
          element={<ProcedureDetails />}
        />
        <Route
          path="/patients/dentalChartKids/:id"
          element={<DentalChartScreen />}
        />
        <Route
          path="/patients/dentalChartKids/:patientId/update/:dentalChartId"
          element={<UpdateDentalChartKids />}
        />
        <Route
          path="/patients/dentalChartAdult/:id"
          element={<AdultDentalChart />}
        />
        <Route
          path="/patients/dentalChartAdult/:patientId/update/:dentalChartId"
          element={<UpdateAdultDentalChart />}
        />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
