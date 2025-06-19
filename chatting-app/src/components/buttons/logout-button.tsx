import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/feature/user-feature";
import { apiSlice } from "../../redux/api/api-slice";
import Button from "../ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(apiSlice.util.resetApiState());
    localStorage.removeItem("userInfo");
    navigate("/auth/sign-in", { replace: true });
  };

  return (
    <Button onClick={handleLogout}>
      <LogOut size={20} />
    </Button>
  );
};

export default LogoutButton;
