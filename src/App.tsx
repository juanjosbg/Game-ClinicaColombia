import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistroEncargados from "@/pages/RegistroEncargados";
import Home from "@/pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página inicial = Registro */}
        <Route path="/" element={<RegistroEncargados />} />

        <Route path="/home" element={<Home />} />

        <Route path="*" element={<div>404 - Página no encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
