import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const token = Cookies.get("access_token");
  return token ? <Outlet /> : <Navigate to="/auth/sign-in" replace />;
}
