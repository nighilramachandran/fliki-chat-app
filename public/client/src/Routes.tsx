import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Layouts from "./widgets/layouts/layouts";
import Register from "./pages/register";
import { ROUTES } from "./utils/routes/contants";
import Login from "./pages/login";
import { useAppSelector } from "./redux/hooks";
import Home from "./pages/home";

const { GUEST, AUTH } = ROUTES;

const PrivateRoutes = () => {
  const { isAuth } = useAppSelector((state) => state.Auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Layouts />}>
          <Route index element={<Login />} />
          <Route path={GUEST.REGISTER} element={<Register />} />
          <Route element={!isAuth ? <Navigate to="/" replace /> : <Outlet />}>
            <Route path={AUTH.HOME} element={<Home />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
