import { Link } from "react-router-dom";
import AuthForm from "../../../../components/form/auth-form";

const SignUp = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-md flex-col items-center rounded-md px-8 py-10 shadow-md">
        <p className="pb-4 text-center text-2xl font-extrabold">SIGN UP</p>

        <AuthForm type="register" />

        <span className="my-4 cursor-pointer text-xs text-gray-500">
          Already have an account?
          <Link to={"/auth/sign-in"} className="ml-1 text-blue-500">
            Sign-in
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUp;
