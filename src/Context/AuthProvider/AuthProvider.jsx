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

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  console.log(user);

  const registerUser = (email, password) => {
    setLoading(false)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    setLoading(false)
    return signInWithEmailAndPassword(auth, email, password);
  };

  const provider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // const email = currentUser?.email;
        // fetch(`http://localhost:3000/user/${email}`)
        //   .then(res => res.json())
        //   .then(data => {
        //     setUser(data);
        // }) 
        setLoading(false)
        setUser(currentUser)
      } else {
        setUser(null);
      }
      return unsubscribe();
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        toast.success("Log-out successful.");
      })
      .catch((error) => {
        toast.warn(error.message);
      });
  };

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
