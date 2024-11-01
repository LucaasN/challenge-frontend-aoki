import { useState } from "react";

interface FilterProps {
  onFilterChange: (filters: {
    nombre?: string;
    tipo?: string;
    valoracion?: number;
  }) => void;
}

export const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [valoracion, setValoracion] = useState<number | undefined>(undefined);

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNombre(value);
    onFilterChange({ nombre: value, tipo, valoracion });
  };

  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setTipo(value);
    onFilterChange({ nombre, tipo: value, valoracion });
  };

  const handleValoracionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? undefined : parseFloat(e.target.value);
    setValoracion(value);
    onFilterChange({ nombre, tipo, valoracion: value });
  };

  const clearFilters = () => {
    setNombre("");
    setTipo("");
    setValoracion(undefined);
    onFilterChange({ nombre: "", tipo: "", valoracion: undefined });
  };

  return (
    <div className="flex gap-3">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={nombre}
          onChange={handleNombreChange}
          className="border border-[#639] rounded w-full p-2 bg-transparent"
        />
        <select
          value={tipo}
          onChange={handleTipoChange}
          className="border border-[#639] rounded w-full p-2 bg-transparent"
        >
          <option value="">Tipo de Juego</option>
          <option value="F5">F5</option>
          <option value="F7">F7</option>
          <option value="F11">F11</option>
        </select>
        <input
          type="number"
          placeholder="Valoracion minima"
          value={valoracion !== undefined ? valoracion : ""}
          onChange={handleValoracionChange}
          min="0"
          max="5"
          step="0.1"
          className="border border-[#639] rounded w-full p-2 bg-transparent"
        />
        <button
          type="button"
          onClick={clearFilters}
          className="btn-standard rounded px-4 hover:bg-black"
        >
          Limpiar Filtros
        </button>
      </div>
  );
};
