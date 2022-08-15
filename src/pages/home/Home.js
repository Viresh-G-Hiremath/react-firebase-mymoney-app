import TransactionForm from "../../components/TransactionForm";
import TransactionList from "../../components/TransactionList";
import { useAuthContext } from "../../hooks/useAuthContext";

import "./Home.css";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <div className="home">
      <TransactionList uid={user.uid} />
      <TransactionForm uid={user.uid} />
    </div>
  );
}
