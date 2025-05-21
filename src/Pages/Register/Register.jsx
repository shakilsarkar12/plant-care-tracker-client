import React, { useContext, useState } from "react";
import { FiMail } from "react-icons/fi";
import { IoIosLink } from "react-icons/io";
import { IoEye, IoEyeOff, IoKeyOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [errorMesg, setErrorMesg] = useState("");
  const { registerUser, setUser } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;
    const userInfo = { name, photoURL, email, password };

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters, include a number, a lowercase and an uppercase letter."
      );
      return;
    } else {
      setPasswordError("");
    }

    registerUser(email, password)
      .then((result) => { 
        const user = result.user;
        setUser(user)
        navigate("/")
        toast.success("Account Created Successfully !")
      })
      .catch(error => {
        console.log(error.message);
        setErrorMesg(error.message)
    })
  };



  return (
    <div>
      <div className="shadow-[0_0_10px_#22702d] max-w-sm mx-auto rounded-md mt-24 p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name input */}
          <div className="relative">
            <LuUser className="absolute top-3 left-3 z-10" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="input w-full border border-[#22702d] bg-transparent focus:outline-none focus:shadow-[0_0_5px_#22702d] pl-10"
            />
          </div>

          {/* Photo URL input */}
          <div className="relative">
            <IoIosLink className="absolute top-3 left-3 z-10" />
            <input
              type="url"
              name="photoURL"
              placeholder="Photo URL"
              required
              className="input w-full border border-[#22702d] bg-transparent focus:outline-none focus:shadow-[0_0_5px_#22702d] pl-10"
            />
          </div>

          {/* Email input */}
          <div className="relative">
            <FiMail className="absolute top-3 left-3 z-10" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="input w-full border border-[#22702d] bg-transparent focus:outline-none focus:shadow-[0_0_5px_#22702d] pl-10"
            />
          </div>

          {/* Password input */}
          <div className="relative">
            <IoKeyOutline className="absolute top-3 left-3 z-10" />
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="input w-full border border-[#22702d] bg-transparent focus:outline-none focus:shadow-[0_0_5px_#22702d] pl-10"
            />
            <button
              type="button"
              className="absolute top-3 right-4 z-10 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button>
          </div>

          {/* Password error message */}
          {passwordError && (
            <p className="text-red-500 text-sm -mt-2">{passwordError}</p>
          )}
          {errorMesg && (
            <p className="text-red-500 text-sm -mt-2">{errorMesg}</p>
          )}

          <button
            className="btn w-full bg-[#22702d] hover:bg-[#22777d] border-none shadow-none font-semibold text-white text-base"
            type="submit"
          >
            Register
          </button>
        </form>

        <p className="text-center font-semibold">
          Already have an account?{" "}
          <Link className="text-blue-500 hover:underline" to="/login">
            Login
          </Link>
        </p>

        <div className="divider">OR</div>
        <GoogleLogin/>
      </div>
    </div>
  );
};

export default Register;
