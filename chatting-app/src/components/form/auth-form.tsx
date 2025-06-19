import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import SubmitButton from "../buttons/submit-button";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../redux/api/user-api-slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/feature/user-feature";

interface AuthFormProps {
  type: "login" | "register";
}

const AuthForm = ({ type }: AuthFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [register, { isLoading: registerLoading }] = useRegisterMutation();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (type === "login") {
        const response = await login({
          email,
          password,
        }).unwrap();

        dispatch(
          setCredentials({
            accessToken: response.access_token,
            user: response.data,
          }),
        );
        navigate("/");
      } else if (type === "register") {
        const response = await register({
          username,
          email,
          password,
        }).unwrap();

        dispatch(
          setCredentials({
            ...response,
          }),
        );
        navigate("/auth/sign-in");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error?.data?.message || "Authentication failed");
      console.log("authentication error", error);
    }
  };

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="w-full">
        <div className="flex flex-col gap-5 text-sm">
          {type === "register" && (
            <label className="block text-gray-700">
              Username
              <input
                type="text"
                placeholder="John Doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={
                  "w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-sm outline-0"
                }
              />
            </label>
          )}

          <label className="block text-gray-700">
            Email
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={
                "w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-sm outline-0"
              }
            />
          </label>

          <label className="block text-gray-700">
            Password
            <div className="flex w-full items-center rounded-lg border border-gray-300 px-4 py-2">
              <input
                type={isShowPassword ? "text" : "password"}
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-0"
              />

              <button
                type="button"
                onClick={handleShowPassword}
                className="flex cursor-pointer items-center justify-center pl-2"
              >
                {isShowPassword ? (
                  <Eye size={20} color="#9ca3af" />
                ) : (
                  <EyeOff size={20} color="#9ca3af" />
                )}
              </button>
            </div>
            {errorMessage && (
              <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
            )}
          </label>

          <SubmitButton
            type="submit"
            disabled={loginLoading || registerLoading}
          >
            {type === "register"
              ? registerLoading
                ? "Loading..."
                : "Sign‑up"
              : loginLoading
                ? "Loading..."
                : "Sign‑in"}
          </SubmitButton>
        </div>
      </form>
    </>
  );
};

export default AuthForm;
