import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const GoogleLogin = () => {
  const { loginWithGoogle, setUser , setErrorMesg } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    loginWithGoogle()
     .then((result) => {
       const user = result.user;
       const displayName = user?.displayName;
       const email = user?.email;
       const phoneNumber = user?.phoneNumber;
       const photoURL = user?.photoURL;
        const creationTime = user?.metadata.creationTime;
        const lastSignInTime = user?.metadata.lastSignInTime;
        const emailVerified = user?.emailVerified;
        const newUser = {
          displayName,
          email,
          phoneNumber,
          photoURL,
          creationTime,
          lastSignInTime,
          emailVerified,
        };
       setUser(newUser);
       Swal.fire({
         title: "Success",
         text: "Account Login Successful !",
         icon: "success",
         confirmButtonColor: "#22702d",
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
                text: "Account Created Successfully !",
                icon: "success",
                confirmButtonColor: "#22702d",
              });
            }
          });
      })
      .catch((error) => {
        setErrorMesg(error.message);
      });  };
  return (
    <button
      onClick={handleGoogleLogin}
      className="btn w-full btn-success hover:bg-[#22777d] border-none shadow-none font-semibold hover:text-white text-base"
    >
      <FcGoogle size={20} />
      Continue With Google
    </button>
  );
};

export default GoogleLogin;
