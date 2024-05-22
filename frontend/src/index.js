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
import ResetPasswordScreen from "./screens/ResetPasswordScreen.js";

///----- old patient
import OldPatientRecords from "./screens/oldPatients/OldPatientRecords.js";
import OldProcedureScreen from "./screens/oldPatients/OldProcedureScreen.js";
import OldProcedureDetails from "./screens/oldPatients/OldProcedureDetails.js";
import UpdateOldPatient from "./screens/oldPatients/UpdateOldPatient.js";
import OldPatientScreen from "./screens/oldPatients/OldPatientScreen.js";

import OldAdultDentalChart from "./screens/oldPatients/OldAdultDentalChart.js";
import UpdateOldAdultDentalChart from "./screens/oldPatients/UpdateOldAdultDentalChart.js";

import OldChildDentalChart from "./screens/oldPatients/OldChildDentalChart.js";
import UpdateOldChildDentalChart from "./screens/oldPatients/UpdateOldChildDentalChart.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/resetPassword" element={<ResetPasswordScreen />} />

      <Route path="" element={<AdminRoute />}>
        <Route path="/changePassword/:id" element={<ChangePasswordScreen />} />
        <Route index={true} path="/" element={<PatientList />} />
        <Route path="/search/:keyword" element={<PatientList />} />
        <Route path="/page/:pageNumber" element={<PatientList />} />
        <Route
          path="/search/:keyword/page/:pageNumber"
          element={<PatientList />}
        />

        <Route path="/onePatient/:id" element={<PatientScreen />} />
        <Route path="/updatePatient/:id" element={<UpdatePatient />} />

        <Route path="/archived" element={<ArchivedPatients />} />
        <Route path="/createProcedure/:id" element={<ProcedureScreen />} />
        <Route
          path="/procedureDetails/:patientId/procedures/:procedureId"
          element={<ProcedureDetails />}
        />
        <Route path="/dentalChartKids/:id" element={<DentalChartScreen />} />
        <Route
          path="/dentalChartKids/:patientId/update/:dentalChartId"
          element={<UpdateDentalChartKids />}
        />
        <Route path="/dentalChartAdult/:id" element={<AdultDentalChart />} />
        <Route
          path="/dentalChartAdult/:patientId/update/:dentalChartId"
          element={<UpdateAdultDentalChart />}
        />

        {/* Old Records */}
        <Route path="/updateOldPatient/:id" element={<UpdateOldPatient />} />
        <Route path="/oldPatient/:id" element={<OldPatientScreen />} />
        <Route path="/oldRecords" element={<OldPatientRecords />} />
        <Route
          path="/createOldProcedure/:id"
          element={<OldProcedureScreen />}
        />
      </Route>
      <Route
        path="/oldProcedureDetails/:patientId/procedures/:procedureId"
        element={<OldProcedureDetails />}
      />

      {/* CHART */}

      <Route path="/oldAdultChart/:id" element={<OldAdultDentalChart />} />
      <Route
        path="/oldAdultChart/:patientId/update/:dentalChartId"
        element={<UpdateOldAdultDentalChart />}
      />

      <Route path="/oldChildChart/:id" element={<OldChildDentalChart />} />
      <Route
        path="/oldChildChart/:patientId/update/:dentalChartId"
        element={<UpdateOldChildDentalChart />}
      />
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
