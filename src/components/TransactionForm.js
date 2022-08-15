import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { useFirestore } from "../hooks/useFirestore";
import "./TransactionForm.css";

export default function TransactionForm({ uid }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [idx, setIdx] = useState(null);
  const { addData, updateData, error, isPending } =
    useFirestore("transactions");
  const { transactionList } = useCollection("transactions", ["uid", "==", uid]);

  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const id = queryParams.get("q");
  const Navigate = useNavigate();

  useEffect(() => {
    if (id && transactionList) {
      const results = transactionList.find((transaction) => {
        return transaction.id === id;
      });
      setName(results.name);
      setAmount(results.amount);
      setIdx(id);
    }
    Navigate(`/`);
  }, [id, transactionList, Navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idx && transactionList) {
      const results = transactionList.find((transaction) => {
        return transaction.id === idx;
      });
      updateData(idx, { ...results, name, amount, uid });
      setName("");
      setAmount("");
      setIdx(null);
    } else {
      addData({ name, amount, uid });
      setName("");
      setAmount("");
    }
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      <hr />
      <label>
        <span>Transaction Name:</span>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <label>
        <span>Transaction Amount:</span>
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
      </label>

      {!isPending && !idx && <button>Add</button>}
      {idx && <button>Update</button>}
      {isPending && <button disabled>Loading</button>}
      {error && <p>{error}</p>}
    </form>
  );
}
