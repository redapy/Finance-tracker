import { useEffect, useReducer, useState } from "react";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { firestore } from "../firebase/config";

const initialState = {
  document: null,
  isPending: false,
  error: null,
  succes: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { document: null, isPending: true, error: null, succes: null };
    case "DOCUMENT_ADDED":
      return {
        document: action.document,
        isPending: false,
        error: null,
        succes: true,
      };
    case "DOCUMENT_DELETED":
      return { isPending: false, document: null, error: null, success: true };
    case "ERROR":
      return {
        document: null,
        isPending: false,
        error: action.error,
        succes: false,
      };
    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  //collection ref and Timestamp
  const documentRef = collection(firestore, collectionName);
  const createdAt = Timestamp.fromDate(new Date());
  // helper to make sure the state get updated only if the compoenet is not unmounted
  const dispatchIfNotCancelled = (action) => {
    if (isCancelled === false) {
      dispatch(action);
    }
  };

  //add a document function
  const addDocument = async (document) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const addedDocument = await addDoc(documentRef, {
        ...document,
        createdAt,
      });
      dispatchIfNotCancelled({
        type: "DOCUMENT_ADDED",
        document: addedDocument,
      });
    } catch (e) {
      dispatchIfNotCancelled({ type: "ERROR", error: e.message });
    }
  };

  //delete a document function
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    //get the doc ref
    const docRef = doc(firestore, collectionName, id);
    try {
      await deleteDoc(docRef);
      dispatch({ type: "DOCUMENT_DELETED" });
    } catch (e) {
      dispatchIfNotCancelled({
        type: "ERROR",
        error: "could not delete the document",
      });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
