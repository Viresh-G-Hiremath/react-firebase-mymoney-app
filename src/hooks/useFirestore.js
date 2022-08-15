import { useState } from "react";
import { projectFirestore, timestamp } from "../firebase/Config";

export const useFirestore = (collection) => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const ref = projectFirestore.collection(collection);

  //add data
  const addData = async (doc) => {
    setError(null);
    setIsPending(true);
    try {
      const createdAt = timestamp.fromDate(new Date());
      console.log(createdAt);
      const res = await ref.add({ ...doc, createdAt });
      setIsPending(false);
      setError(null);
      if (!res) {
        throw new Error("Could not added data");
      }
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  //delete data
  const deleteData = async (id) => {
    setError(null);
    setIsPending(true);
    try {
      await ref.doc(id).delete();
      setIsPending(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  //update data
  const updateData = async (id, doc) => {
    setError(null);
    setIsPending(true);
    try {
      const createdAt = timestamp.fromDate(new Date());
      console.log(createdAt);
      await ref.doc(id).update({ ...doc, createdAt });
      setIsPending(false);
      setError(null);
    } catch (err) {
      setError("Could not updated");
      setIsPending(false);
    }
  };

  return { addData, deleteData, updateData, error, isPending };
};
