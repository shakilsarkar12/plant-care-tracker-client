import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowUp } from "react-icons/fa";
import { HiMiniUser } from "react-icons/hi2";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { generateLetterAvatar, uploadImageToImgbb } from "../../Utils/Utils";
import { updateProfile } from "firebase/auth";
import { Navigate } from "react-router";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import { auth } from "../../Firebase/firebase.init";
import Swal from "sweetalert2";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const { user, setUser, registerUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (user?.email) {
    return <Navigate to="/"></Navigate>;
  }

  const onSubmit = async (data) => {
    setRegLoading(true);
    const { name, email, password } = data;
    const avatarBase64 = generateLetterAvatar(name[0]);
    const photoURL = await uploadImageToImgbb(avatarBase64);

    registerUser(email, password)
      .then((result) => {
        const user = result.user;

        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            const creationTime = user?.metadata.creationTime;
            const lastSignInTime = user?.metadata.lastSignInTime;
            const phoneNumber = user?.phoneNumber;
            const emailVerified = user?.emailVerified;
            const newUser = {
              displayName: name,
              email,
              phoneNumber,
              photoURL,
              creationTime,
              lastSignInTime,
              emailVerified,
            };
            setUser({
              ...user,
              displayName: name,
              photoURL: photoURL,
            });
            navigate("/");
            fetch("https://plant-care-tracker-server-black.vercel.app/user", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(newUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  Swal.fire({
                    title: "Success",
                    text: "Account Created Successful !",
                    icon: "success",
                    confirmButtonColor: "#22702d",
                  });
                  toast.success("Account Created Successfully!");
                  setRegLoading(false);
                }
              });
          })
          .catch((error) => {
            toast.error("Profile Update Error:", error);
            setRegLoading(false);
          });
      })
      .catch((err) => {
        toast.error("User Creation Error:", err);
        toast.error("Account Creation Failed!");
        setRegLoading(false);
      });
  };
  return (
    <div className="flex items-center justify-center bg-white px-4 py-8  font-medium">
      <div className="max-w-sm w-full space-y-6">
        {/* Heading */}
        <div>
          <h2 className="text-3xl font-bold text-black">Create an Account</h2>
          <p className="text-gray-600">Register with Profast</p>
        </div>

        {/* Profile Icon */}
        <div className="relative w-fit p-3 bg-gray-100 rounded-full">
          <HiMiniUser size={40} className="text-gray-400" />
          <div className="absolute bottom-2 p-1 bg-gray-100 rounded-full right-2 text-primary">
            <FaArrowUp />
          </div>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
              className="input w-full focus:outline-none focus:border-primary focus:shadow-none mb-2"
            />
            {errors?.name?.type === "required" && (
              <span className="text-red-400 text-xs">Name is required *</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="input w-full focus:outline-none focus:border-primary focus:shadow-none"
            />
            {errors?.email?.type === "required" && (
              <span className="text-red-400 text-xs">Email is required *</span>
            )}
          </div>

          <div className="relative h-fit">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              {...register("password", {
                required: true,
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                  message:
                    "Password must be at least 8 characters, include uppercase, lowercase, number and special character",
                },
              })}
              placeholder="Password"
              className="input w-full focus:outline-none focus:border-primary focus:shadow-none mb-2"
            />
            <button
              className="absolute right-4 z-10 translate-y-1/2 cursor-pointer"
              type="button"
              onClick={() => setShow(!show)}
            >
              {show ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
            </button>

            {errors?.password?.type === "required" && (
              <span className="text-red-400 text-xs">
                Password is required *
              </span>
            )}
            {errors?.password?.type === "pattern" && (
              <span className="text-red-400 text-xs">
                {errors.password?.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={regLoading}
            className="btn w-full bg-lime-300 text-black hover:bg-lime-400 border-none disabled:bg-gray-700"
          >
            {regLoading ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-gray-700">
          Already have an account?
          <Link
            to="/signin"
            className="text-lime-600 font-medium hover:underline ml-1"
          >
            Login
          </Link>
        </p>

        <GoogleLogin />
      </div>
    </div>
  );
};

export default SignUp;
