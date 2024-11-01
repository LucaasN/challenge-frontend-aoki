import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { EquiposProvider } from "./context/EquiposContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <AuthProvider>
      <EquiposProvider>
        <div className="font-montserrat">
          <BrowserRouter>
            <Header />
            <AppRouter />
            <Footer />
          </BrowserRouter>
        </div>
      </EquiposProvider>
    </AuthProvider>
  );
}

export default App;
