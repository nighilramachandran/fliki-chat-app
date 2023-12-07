import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./widgets/layout/layout";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";

export const PrivateRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SignIn />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
