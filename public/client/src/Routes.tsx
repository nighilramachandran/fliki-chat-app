import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./widgets/layout/layout";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import ChatGroup from "./pages/ChatGroup";
import { ROUTES } from "./utils/routes/constants";
import CreateGroup from "./pages/CreateGroup";

const { AUTH, ROOT, GUEST } = ROUTES;

export const PrivateRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROOT} element={<Layout />}>
          <Route index element={<SignIn />}></Route>
          <Route path={GUEST.REGISTER} element={<Register />}></Route>
          <Route path={AUTH.CHAT_GROUP} element={<ChatGroup />}></Route>
          <Route path={AUTH.CREATE_GROUP} element={<CreateGroup />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
