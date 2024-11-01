import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEquipos } from "../context/EquiposContext";
import { useAuth } from "../context/AuthContext";
import { Filter } from "./Filter";

export const ListaDeEquipos: React.FC = () => {
  
  const { equipos, eliminarEquipo } = useEquipos();
  const { isAuthenticated } = useAuth();
  const [filteredEquipos, setFilteredEquipos] = useState(equipos);
  const navigate = useNavigate();

  const handleFilterChange = (filters: {
    nombre?: string;
    tipo?: string;
    valoracion?: number;
  }) => {
    const { nombre, tipo, valoracion } = filters;

    const equiposFiltrados = equipos.filter((equipo) => {
      const matchesNombre = nombre
        ? equipo.nombre.toLowerCase().includes(nombre.toLowerCase())
        : true;
      const matchesTipo = tipo ? equipo.tipo === tipo : true;
      const matchesValoracion =
        valoracion !== undefined ? equipo.valoracion >= valoracion : true;

      return matchesNombre && matchesTipo && matchesValoracion;
    });

    setFilteredEquipos(equiposFiltrados);
  };

  useEffect(() => {
    setFilteredEquipos(equipos);
  }, [equipos]);

  return (
    <div className="flex flex-col overflow-x-auto sm:overflow-x-visible p-10">
      <Filter onFilterChange={handleFilterChange} />
      <table className="table-fixed border-collapse border border-[#639] my-4">
        <thead className="border-[#639]">
          <tr className="border border-[#639] py-4">
            <th className="border border-[#639] py-4">Id</th>
            <th className="border border-[#639] py-4">Nombre</th>
            <th className="border border-[#639] py-4">Tipo de Juego</th>
            <th className="border border-[#639] py-4">Valoracion</th>
            <th className="border border-[#639] py-4">Jugadores</th>
            <th className="border border-[#639] py-4">Accion</th>
          </tr>
        </thead>
        <tbody>
          {filteredEquipos.map((equipo) => (
            <tr key={equipo.id} className="border-b border-[#639]">
              <td className="border-r border-[#639] text-center">
                {equipo.id}
              </td>
              <th className="font-normal">{equipo.nombre}</th>
              <td className="text-center">{equipo.tipo}</td>
              <td className="text-center">{equipo.valoracion}</td>
              <td className="text-center">
                <ul className="py-4">
                  {equipo.jugadores.map((jugador, index) => (
                    <li key={index}>
                      <b> {jugador.nombre}</b> - {jugador.posicion}:{" "}
                      {jugador.descripcion}
                    </li>
                  ))}
                </ul>
              </td>
              {isAuthenticated && (
                <td>
                  <button
                    type="button"
                    className="btn-standard rounded mr-2 hover:bg-black"
                    onClick={() => navigate(`/form/${equipo.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn-standard rounded hover:bg-black mr-2"
                    onClick={() => eliminarEquipo(equipo.id)}
                  >
                    Eliminar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {isAuthenticated && (
        <div className="flex">
          <button
            type="button"
            className="btn-standard rounded ml-auto hover:bg-black"
            onClick={() => navigate("/form")}
          >
            Agregar Nuevo Equipo
          </button>
        </div>
      )}
    </div>
  );
};
