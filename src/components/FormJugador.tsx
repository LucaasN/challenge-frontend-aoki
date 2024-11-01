import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useEquipos } from "../context/EquiposContext";

export const FormJugador = () => {
  const { equipoId, jugadorId } = useParams();
  const navigate = useNavigate();
  const { equipos, agregarJugador, actualizarJugador } = useEquipos();

  const [nombre, setNombre] = useState("");
  const [posicion, setPosicion] = useState("Arquero");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (equipoId && jugadorId) {
      const equipo = equipos.find((eq) => eq.id === parseInt(equipoId));
      const jugador = equipo?.jugadores.find((jug) => jug.id === parseInt(jugadorId));
      if (jugador) {
        setNombre(jugador.nombre);
        setPosicion(jugador.posicion);
        setDescripcion(jugador.descripcion);
      }
    }
  }, [equipoId, jugadorId, equipos]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedEquipoId = equipoId ? parseInt(equipoId) : undefined;
    const parsedJugadorId = jugadorId ? parseInt(jugadorId) : undefined;

    if (parsedJugadorId !== undefined) {
      actualizarJugador(parsedEquipoId as number, parsedJugadorId, { id: parsedJugadorId, nombre, posicion, descripcion });
    } else if (parsedEquipoId !== undefined) {
      agregarJugador(parsedEquipoId as number, { id: Date.now(), nombre, posicion, descripcion });
    }

    navigate(`/form/${equipoId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-[#639] rounded">
      <div>
        <label>Nombre del Jugador</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border border-gray-300 rounded w-full p-2 bg-transparent"
          required
        />
      </div>
      <div>
          <label>Posicion</label>
          <select
            value={posicion}
            onChange={(e) => setPosicion(e.target.value)}
            className="border border-gray-300 rounded w-full p-2 bg-transparent"
            required
          >
            <option value="Arquero">
             Arquero
            </option>
            <option value="Defensor">
             Defensor
            </option>
            <option value="Mediocampista">
             Mediocampista
            </option>
            <option value="Delantero">
             Delantero
            </option>
          </select>
      </div>
      <div>
        <label>Descripcion</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="border border-gray-300 rounded w-full p-2 bg-transparent resize-none"
          required
        />
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={() => navigate(`/form/${equipoId}`)} className="btn-standard rounded hover:bg-black">
          Volver
        </button>
        <button type="submit" className="btn-standard rounded py-2 px-4 hover:bg-black">
          {jugadorId ? "Guardar Cambios" : "Agregar Jugador"}
        </button>
      </div>
    </form>
  );
};
