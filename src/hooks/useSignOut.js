import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
//firabes
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export const useSignOut = () => {
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
      setLoading(false);
      setError(null);
    } catch (e) {
      setLoading(false);
      setError(e.message);
      console.log(e.message);
    }
  };

  return { logout, error, loading };
};
