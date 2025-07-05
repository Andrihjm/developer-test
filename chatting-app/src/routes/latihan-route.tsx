import { Route, Routes } from "react-router-dom";
import Crud from "../pages/root/latihan/crud";

const LatihanRoute = () => {
  return (
    <Routes>
      <Route path="/crud" element={<Crud type="PUT" />} />
    </Routes>
  );
};

export default LatihanRoute;
