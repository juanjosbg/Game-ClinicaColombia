import { Routes, Route } from "react-router-dom";
import RegistroEncargados from "@/pages/RegistroEncargados";
import Home from "@/pages/Home";
import Level1 from "@/pages/play/Level1";
import Level2 from "@/pages/play/Level2";
import Level3 from "@/pages/play/Level3";
import Inf from "@/pages/information/Inf";
import NotFound from "@/pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RegistroEncargados />} />
      <Route path="/home" element={<Home />} />
      <Route path="/juego/nivel1" element={<Level1 />} />
      <Route path="/juego/nivel2" element={<Level2 />} />
      <Route path="/juego/nivel3" element={<Level3 />} />
      <Route path="/informacion/inf" element={<Inf />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}