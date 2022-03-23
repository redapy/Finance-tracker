import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/config";

export const useListenCollection = (collectionName) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = collection(firestore, collectionName);
    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        console.log(results);

        //update the state
        setDocuments(results);
        setError(null);
      },
      (e) => {
        setError("Could not fetch the data");
        console.log(e);
      }
    );

    return () => unsub();
  }, [collectionName]);

  return { documents, error };
};
