import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
//firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      //Login the user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // update the user state to be the current loged in user
      dispatch({ type: "LOGIN", user: userCredential.user });

      //update the state only if the component is not unmounted
      if (isCancelled === false) {
        setError(null);
        setLoading(false);
      }
    } catch (e) {
      if (isCancelled === false) {
        setError(e.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { login, loading, error };
};
