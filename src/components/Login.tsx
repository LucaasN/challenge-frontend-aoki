import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("test1234");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (login(username, password)) {
        navigate("/"); 
    } else {
        setError("Usuario y/o password incorrectos!");
    }

  };

  return (
    <div className="flex justify-center items-center">
      <div className="space-y-4 p-4 border border-[#639] rounded min-w-24 my-10">
        <h2 className="text-center">Iniciar Sesion</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="border border-gray-300 rounded w-full p-2 bg-transparent"
              required
            />
          </div>
          <div className="mt-4">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded w-full p-2 bg-transparent"
              required
            />
          </div>
          <div className="flex justify-between">
          <button
            type="button"
            className="btn-standard rounded py-2 px-4 hover:bg-black mt-4"
            onClick={ () => navigate("/") }
          >
            Volver
          </button>
          <button
            type="submit"
            className="btn-standard rounded py-2 px-4 hover:bg-black mt-4"
          >
            Iniciar Sesion
          </button>
          </div>
          
          {error && <p className="text-red-700 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};
