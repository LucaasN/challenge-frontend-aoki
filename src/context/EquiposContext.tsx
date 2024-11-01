import { createContext, useContext, useEffect, useState } from "react";
import equiposJson from "../data/data.json";

interface Jugador {
  id: number;
  nombre: string;
  posicion: string;
  descripcion: string;
}

interface Equipo {
  id: number;
  nombre: string;
  tipo: string;
  valoracion: number;
  jugadores: Jugador[];
}

interface EquiposContextType {
  equipos: Equipo[];
  agregarEquipo: (equipo: Equipo) => void;
  eliminarEquipo: (id: number) => void;
  actualizarEquipo: (equipoActualizado: Equipo) => void;
  eliminarJugador: (jugadorId: number, equipoId: number) => void;
  agregarJugador: (equipoId: number, jugador: Jugador) => void;
  actualizarJugador: (equipoId: number, jugadorId: number, jugadorActualizado: Jugador) => void;
}

const EquiposContext = createContext<EquiposContextType | undefined>(undefined);

export const EquiposProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);

  const cargarEquipos = async () => {
    const equiposData = localStorage.getItem("equipos");

    if (equiposData) {
      setEquipos(JSON.parse(equiposData));
    } else {
      await actualizarLocalStorage(equiposJson.equipos);
      setEquipos(equiposJson.equipos);
    }
  };

  const actualizarLocalStorage = async (equiposData: Equipo[]) => {
    localStorage.setItem("equipos", JSON.stringify(equiposData));
  };

  const agregarEquipo = (equipo: Equipo) => {
    const equiposActualizados = [...equipos, equipo];
    setEquipos(equiposActualizados);
    localStorage.setItem("equipos", JSON.stringify(equiposActualizados));
  };

  const eliminarEquipo = (id: number) => {
    const equiposActualizados = equipos.filter((equipo) => equipo.id !== id);
    setEquipos(equiposActualizados);
    actualizarLocalStorage(equiposActualizados);
  };

  const actualizarEquipo = (equipoActualizado: Equipo) => {
    const equiposActualizados = equipos.map((equipo) =>
      equipo.id === equipoActualizado.id ? equipoActualizado : equipo
    );
    setEquipos(equiposActualizados);
    actualizarLocalStorage(equiposActualizados);
  };

  const eliminarJugador = (jugadorId: number, equipoId: number) => {
    setEquipos((equiposAnteriores) => {
      const equiposActualizados = equiposAnteriores.map((equipo) => {
        if (equipo.id === equipoId) {
          return {
            ...equipo,
            jugadores: equipo.jugadores.filter(
              (jugador) => jugador.id !== jugadorId
            ),
          };
        }
        return equipo;
      });

      actualizarLocalStorage(equiposActualizados);
      return equiposActualizados;
    });
  };

  const agregarJugador = (equipoId: number, nuevoJugador: Jugador) => {
    setEquipos((equiposAnteriores) => {
      const equiposActualizados = equiposAnteriores.map((equipo) => {
        if (equipo.id === equipoId) {
          return {
            ...equipo,
            jugadores: [
              ...equipo.jugadores,
              { ...nuevoJugador, id: Date.now() }
            ],
          };
        }
        return equipo;
      });
      actualizarLocalStorage(equiposActualizados);
      return equiposActualizados;
    });
  };

  const actualizarJugador = (equipoId: number, jugadorId: number, jugadorActualizado: Jugador) => {
    setEquipos((equiposAnteriores) => {
      const equiposActualizados = equiposAnteriores.map((equipo) => {
        if (equipo.id === equipoId) {
          return {
            ...equipo,
            jugadores: equipo.jugadores.map((jugador) =>
              jugador.id === jugadorId ? { ...jugador, ...jugadorActualizado } : jugador
            ),
          };
        }
        return equipo;
      });
  
      actualizarLocalStorage(equiposActualizados);
      return equiposActualizados;
    });
  };

  useEffect(() => {
    cargarEquipos();
  }, []);

  return (
    <EquiposContext.Provider
      value={{
        equipos,
        agregarEquipo,
        eliminarEquipo,
        actualizarEquipo,
        eliminarJugador,
        agregarJugador,
        actualizarJugador
      }}
    >
      {children}
    </EquiposContext.Provider>
  );
};

export const useEquipos = (): EquiposContextType => {
  const context = useContext(EquiposContext);
  if (!context) {
    throw new Error("useEquipos debe usarse dentro de EquiposProvider");
  }
  return context;
};
