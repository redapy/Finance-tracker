import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
//firabes
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export const useSignOut = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setLoading(true);

    //sign out the user
    try {
      await signOut(auth);
      // dispatch a logout action to set user state to be null
      dispatch({ type: "LOGOUT" });
      //update the state only if the component is not unmounted
      if (isCancelled === false) {
        setError(null);
        setLoading(false);
      }
    } catch (e) {
      if (isCancelled === false) {
        setError(e.message);
        setLoading(false);
        console.log(e.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, loading };
};
