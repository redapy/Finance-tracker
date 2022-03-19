import { useEffect, useState } from "react";
//firebase
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

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

      if (!userCredential) {
        throw Error("Could not sign up the user");
      }
      //update the user profile
      await updateProfile(auth.currentUser, { displayName });

      // the user is automatically loged in, change the user state to be the user object from firebase
      dispatch({ type: "LOGIN", user: userCredential.user });

      //update the state only if the component is not unmounted
      if (isCancelled === false) {
        setLoading(false);
        setError(null);
      }
    } catch (e) {
      if (isCancelled === false) {
        setLoading(false);
        setError(e.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, loading };
};
