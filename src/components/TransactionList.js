import { useCollection } from "../hooks/useCollection";
import { useFirestore } from "../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import "./TransactionList.css";

export default function TransactionList({ uid }) {
  const {
    transactionList: transactions,
    error,
    isPending,
  } = useCollection("transactions", ["uid", "==", uid], ["createdAt", "desc"]);

  const { deleteData, isPending: x } = useFirestore("transactions");
  const Navigate = useNavigate();

  const handleUpdate = (e, id) => {
    Navigate(`/?q=${id}`);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteData(id);
  };

  return (
    <div className="transaction-list">
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="transaction"
          onClick={(e) => handleUpdate(e, transaction.id)}
        >
          <p>{transaction.name}</p>
          <p>RS: {transaction.amount}</p>
          {!x && (
            <button onClick={(e) => handleDelete(e, transaction.id)}>X</button>
          )}
          {x && <button disabled>--</button>}
        </div>
      ))}
    </div>
  );
}
