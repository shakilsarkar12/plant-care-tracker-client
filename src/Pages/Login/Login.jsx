import React, { useContext, useEffect, useState } from "react";
import { FiMail } from "react-icons/fi";
import { IoEye, IoEyeOff, IoKeyOutline } from "react-icons/io5";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const location = useLocation();
  const [showPAss, setShowPass] = useState(false);
  const [errorMesg, setErrorMesg] = useState("");
  const { user, setUser, userLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login Your Account - Plant Care Tracker";
  }, []);

  if (user) {
  return <Navigate to="/"/>
}

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setErrorMesg("");
    userLogin(email, password)
      .then((result) => {
        navigate(`${location.state ? location.state : "/"}`);

        fetch(
          `https://plant-care-tracker-server-black.vercel.app/user/${result.user?.email}`
        )
        .then((res) => res.json())
        .then((data) => {
          Swal.fire({
            title: "Success",
            text: "Log In Successful !",
            icon: "success",
            confirmButtonColor: "#22702d",
          });
          setUser(data);
          });
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/invalid-credential).") {
          setErrorMesg("Invalid Email and Password");
        }
      });
  };

  return (
    <div>
      <div className="shadow-[0_0_10px_#22702d] max-w-sm mx-auto rounded-md mt-24 p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Log In</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* email input */}
          <div className="relative">
            <FiMail className="absolute top-3 left-3 z-10 text-green-700" />
            <input
              type="email"
              name="email"
              placeholder="Your Name"
              className="input w-full border border-[#22702d] bg-transparent
            focus:outline-none focus:shadow-[0_0_5px_#22702d] pl-10"
            />
          </div>

          {/* password input */}
          <div className="relative">
            <IoKeyOutline className="absolute top-3 left-3 z-10 text-green-700" />
            <input
              type={showPAss ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input w-full border border-[#22702d] bg-transparent
            focus:outline-none focus:shadow-[0_0_5px_#22702d] pl-10"
            />
            <button
              className="absolute top-3 right-4 z-10 text-green-700 cursor-pointer"
              type="button"
            >
              {showPAss ? (
                <IoEyeOff onClick={() => setShowPass(!showPAss)} size={20} />
              ) : (
                <IoEye onClick={() => setShowPass(!showPAss)} size={20} />
              )}
            </button>
          </div>

          {errorMesg && (
            <p className="text-red-500 text-sm -mt-2">{errorMesg}</p>
          )}
          <button
            className="btn w-full bg-[#22702d] hover:bg-[#22777d] border-none shadow-none font-semibold text-white text-base"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-center font-semibold">
          Don't have an account?{" "}
          <Link className="text-blue-500 hover:underline " to="/register">
            Register
          </Link>
        </p>
        <div className="divider">OR</div>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Login;
