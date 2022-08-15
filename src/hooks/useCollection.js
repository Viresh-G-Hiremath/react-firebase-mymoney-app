import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/Config";

export const useCollection = (collection, _query, _orderBy) => {
  const [transactionList, setTransactionList] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    setError(null);
    setIsPending(true);
    let ref = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    const unSub = ref.onSnapshot(
      (snapshot) => {
        let result = [];
        snapshot.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
        setTransactionList(result);
        setError(null);
        setIsPending(false);
      },
      (err) => {
        console.log(err.message);
        setError("Data could not fetch");
        setIsPending(false);
      }
    );
    return () => unSub();
  }, [collection, query, orderBy]);

  return { transactionList, error, isPending };
};
