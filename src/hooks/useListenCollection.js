import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { firestore } from "../firebase/config";

export const useListenCollection = (collectionName, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // use useRef beacause _query is an array (reference type, which means it's diferrent on every re-render)
  // -> infinite loop as _query is needed in the dependecie array of useEffect
  const queryParams = useRef(_query).current;
  const orderByParams = useRef(_orderBy).current;

  useEffect(() => {
    let ref = collection(firestore, collectionName);
    let q;
    if (queryParams && orderByParams) {
      q = query(ref, where(...queryParams), orderBy(...orderByParams));
    }

    const unsub = onSnapshot(
      q,
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

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
  }, [collectionName, queryParams]);

  return { documents, error };
};
