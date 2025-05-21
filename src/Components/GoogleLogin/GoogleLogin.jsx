import React, { useContext } from 'react';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { useNavigate } from 'react-router';

const GoogleLogin = () => {
    const { loginWithGoogle, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(result => {
                const user = result.user;
                setUser(user);
                navigate("/");
                console.log(user);
            })
            .catch(error => {
            console.log(error.message);
        });
    };
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