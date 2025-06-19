import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/auth/sign-in/[[...sign-in]]/page";
import SignUp from "../pages/auth/sign-up/[[...sign-up]]/page";
import { GuestRoute } from "../components/shared/private-route";

const AuthRouter = () => {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default AuthRouter;
