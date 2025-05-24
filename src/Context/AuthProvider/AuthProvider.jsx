import React, { useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    setLoading(false);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const provider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        Swal.fire({
          title: "Success",
          text: "Log Out Successful !",
          icon: "success",
        });
      })
      .catch((error) => {
        toast.warn(error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetch(
          `https://plant-care-tracker-server-black.vercel.app/user/${currentUser.email}`
        )
          .then((res) => res.json())
          .then((data) => {
            setUser(data);
            setLoading(false);
          });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    loading,
    setUser,
    registerUser,
    loginWithGoogle,
    handleLogout,
    userLogin,
    setLoading,
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
