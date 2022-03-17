import { useState } from "react";
//firebase
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signup = async (email, password, displayName) => {
    setError(null);
    setLoading(true);
    try {
      //sign up the user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential.user);
      if (!userCredential) {
        throw Error("Could not sign up the user");
      }
      //update the user profile
      await updateProfile(auth.currentUser, { displayName });
      setLoading(false);
      setError(null);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return { signup, error, loading };
};
