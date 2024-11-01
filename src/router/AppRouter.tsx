import { Route, Routes } from "react-router-dom";
import { ListaDeEquipos } from "../components/ListaDeEquipos";
import { FormEquipo } from "../components/FormEquipo";
import { FormJugador } from "../components/FormJugador";
import { ScrollToTop } from "../components/ScrollToTop"; 
import { Login } from "../components/Login";

export const AppRouter = () => {
  return (
    <>
        <ScrollToTop /> 
        <Routes>
             <Route path="/" element={<ListaDeEquipos />} /> 
             <Route path="/*" element={<ListaDeEquipos />} /> 
             <Route path="/login" element={<Login />} /> 
             <Route path="/form" element={<FormEquipo />} /> 
             <Route path="/form/:id" element={<FormEquipo />} />
             <Route path="/equipo/:equipoId/jugador/:jugadorId?" element={<FormJugador />} />
        </Routes>
    </>
  )
}
