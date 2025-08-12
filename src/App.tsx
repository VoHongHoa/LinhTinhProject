import React from "react";
import "./App.css";
import { AppProvider } from "./Context/AppContext";
import { Route, Routes } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import HomePage from "./HomePage/HomePage";
import MTExportData from "./MTExportData/MTExportData";
import GetUserOneHealthInf from "./GetUserOneHealthInf/GetUserOneHealthInf";
import CompareInf from "./CompareInf/CompareInf";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/xuat-du-lieu" element={<MTExportData />} />
          <Route
            path="/get-user-one-health-inf"
            element={<GetUserOneHealthInf />}
          />
          <Route path="/so-sanh-thong-tin" element={<CompareInf />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;
