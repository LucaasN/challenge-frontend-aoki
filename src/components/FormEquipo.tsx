import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEquipos } from "../context/EquiposContext";

interface FormEquipoProps {
  equipoParaEditar?: any;
}

interface Jugador {
    id: number;
    nombre: string;
    posicion: string;
    descripcion: string;
  }

export const FormEquipo: React.FC<FormEquipoProps> = ({ equipoParaEditar }) => {
  const { equipos, agregarEquipo, actualizarEquipo, eliminarJugador } = useEquipos();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  equipoParaEditar = equipos.find((equipo) => equipo.id === parseInt(id || ""));

  const [nombre, setNombre] = useState(equipoParaEditar?.nombre || "");
  const [tipo, setTipo] = useState(equipoParaEditar?.tipo || "F5");
  const [valoracion, setValoracion] = useState(
    equipoParaEditar?.valoracion || 0
  );

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const equipoData = {
      id: equipoParaEditar ? equipoParaEditar.id : Date.now(),
      nombre,
      tipo,
      valoracion,
      jugadores: equipoParaEditar?.jugadores || [],
    };

    if (equipoParaEditar) {
      actualizarEquipo(equipoData);
    } else {
      if (
        equipos.some(
          (equipo) => equipo.nombre.toLowerCase() === nombre.toLowerCase()
        )
      ) {
        setError("Ya hay un equipo creado con ese nombre!");
        return;
      }
      agregarEquipo(equipoData);
    }
    navigate("/");
  };

  return (
    <div className="m-5">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 border border-[#639] rounded mt-5"
      >
        {error && <p className="text-red-700">{error}</p>}

        <div>
          <label>Nombre del equipo</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border border-gray-300 rounded w-full p-2 bg-transparent"
            required
          />
        </div>

        <div>
          <label>Tipo de Juego</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="border border-gray-300 rounded w-full p-2 bg-transparent"
            required
          >
            <option value="F5">
              Futbol 5
            </option>
            <option value="F7" >
              Futbol 7
            </option>
            <option value="F11" >
              Futbol 11
            </option>
          </select>
        </div>

        <div>
          <label>Valoracion</label>
          <input
            type="number"
            value={valoracion}
            onChange={(e) => setValoracion(parseFloat(e.target.value))}
            min="0"
            max="5"
            step="0.1"
            className="border border-gray-300 rounded w-full p-2 bg-transparent"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-standard rounded py-2 px-4 hover:bg-black"
          >
            {equipoParaEditar ? "Guardar Cambios" : "Agregar Equipo"}
          </button>
        </div>
      </form>

      {equipoParaEditar && (
        <div className="space-y-4 p-4 border border-[#639] rounded mt-5">
          <h5 className="text-lg font-semibold mb-2">
            Plantel de {equipoParaEditar.nombre}
          </h5>
          <ul className="list-disc list-inside space-y-1">
            {equipoParaEditar.jugadores.map((jugador: Jugador) => (
              <li key={jugador.id} className="text-gray-300">
                <strong>{jugador.nombre}</strong> - {jugador.posicion}:{" "}
                {jugador.descripcion} -
                <button
                  type="button"
                  className="text-green-700 ml-2"
                  onClick={() =>
                    navigate(
                      `/equipo/${equipoParaEditar.id}/jugador/${jugador.id}`
                    )
                  }
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="text-red-700 ml-2"
                  onClick={() =>
                    eliminarJugador(jugador.id, equipoParaEditar.id)
                  }
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn-standard rounded py-2 px-4 hover:bg-black"
              onClick={() => navigate(`/equipo/${equipoParaEditar.id}/jugador`)}
            >
              Agregar nuevo jugador
            </button>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="btn-standard rounded hover:bg-black mt-5"
      >
        Volver al listado de equipos
      </button>
    </div>
  );
};
