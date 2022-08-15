import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import "./NavBar.css";

export default function NavBar() {
  const { isPending, logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav>
      <h1>MyMoney</h1>
      {user && (
        <>
          <p>Hello {user.displayName}</p>
          {!isPending && <button onClick={handleLogout}>Logout</button>}
          {isPending && <button disabled>Loading</button>}
        </>
      )}
    </nav>
  );
}
