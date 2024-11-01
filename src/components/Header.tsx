import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Header: React.FC = () => {

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  }

  return (
    <header className="header py-5">
      <div className="flex justify-end mr-4">
      {isAuthenticated ? (
            <button
              className="border-red-700 border px-4 py-2 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
        ) : (
          <Link className="border-blue-700 border px-4 py-2 rounded" to="/login"> Login </Link>
        )}
      </div>
      <div className="header-content">
        <h1 className="text-3xl font-bold text-center">
          Challenge Frontend: Buscador de Equipos de Fútbol
        </h1>
      </div>
    </header>
  );
};