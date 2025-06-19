// src/routes/Guards.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useIsAuthenticated } from "../../hooks/use-is-authenticated";

export const GuestRoute = () => {
  const isAuth = useIsAuthenticated();
  return isAuth ? <Navigate to="/" replace /> : <Outlet />;
};

export const ProtectedRoute = () => {
  const isAuth = useIsAuthenticated();
  const location = useLocation();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/sign-in" state={{ from: location }} replace />
  );
};
