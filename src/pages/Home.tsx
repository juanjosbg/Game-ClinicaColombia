"use client";
import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function formatoTiempo(segundos: number) {
  const hrs = String(Math.floor(segundos / 3600)).padStart(2, "0");
  const mins = String(Math.floor((segundos % 3600) / 60)).padStart(2, "0");
  const secs = String(segundos % 60).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
}

export default function Home() {
  const [usuario, setUsuario] = useState<{ nombre: string; area: string } | null>(null);
  const [nivelMaximo, setNivelMaximo] = useState(1);
  const [nivelSeleccionado, setNivelSeleccionado] = useState<number | null>(null);
  const [puntajeNivel1, setPuntajeNivel1] = useState<number | null>(null);
  const [puntajeNivel2, setPuntajeNivel2] = useState<number | null>(null);
  const [puntajeNivel3, setPuntajeNivel3] = useState<number | null>(null);
  const [tiempoGlobal, setTiempoGlobal] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (data) {
      setUsuario(JSON.parse(data));
    }

    const progreso = localStorage.getItem("nivelMaximo");
    if (progreso) {
      setNivelMaximo(Number(progreso));
    }

    const puntaje1 = localStorage.getItem("puntajeNivel1");
    if (puntaje1) setPuntajeNivel1(Number(puntaje1));
    const puntaje2 = localStorage.getItem("puntajeNivel2");
    if (puntaje2) setPuntajeNivel2(Number(puntaje2));
    const puntaje3 = localStorage.getItem("puntajeNivel3");
    if (puntaje3) setPuntajeNivel3(Number(puntaje3));

    const t1 = Number(localStorage.getItem("tiempoNivel1") || "0");
    const t2 = Number(localStorage.getItem("tiempoNivel2") || "0");
    const t3 = Number(localStorage.getItem("tiempoNivel3") || "0");
    setTiempoGlobal(t1 + t2 + t3);
  }, []);

  const seleccionarNivel = (nivel: number) => {
    if (nivel > nivelMaximo) {
      alert(
        "⚠️ ¡Upps! Primero Recuerda haber ganado el nivel anterior para desbloquear este nivel."
      );
      return;
    }
    setNivelSeleccionado(nivel);
  };

  return (
    <div className="bg-wp h-dvh relative">
      <div className="area absolute inset-0 -z-10">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      {/* Contenedor principal */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl mt-20 bg-white rounded-xl shadow-lg">
          {/* Header */}
          <nav className="flex items-center justify-between p-6 mb-10 px-10">
            <div className="text-lg font-bold text-gray-900">
              Clinica Colombia
            </div>
            <div className="flex space-x-8">
              <span className="text-sm font-semibold text-gray-900 uppercase">
                Nombre:{" "}
                <span className="ml-1 font-medium uppercase">
                  {usuario?.nombre || "—"}
                </span>
              </span>
              <span className="text-sm font-semibold text-gray-900 uppercase">
                Área empleado:{" "}
                <span className="ml-1 font-medium uppercase ">
                  {usuario?.area || "—"}
                </span>
              </span>
            </div>
          </nav>

          {/* Contenido */}
          <div className="flex pb-22">
            <aside className="w-50 border-r border-gray-200 p-6 flex flex-col gap-4">
              {[1, 2, 3].map((nivel) => {
                let verde = false;
                let puntaje = null;
                if (nivel === 1 && puntajeNivel1) {
                  verde = true;
                  puntaje = puntajeNivel1;
                }
                if (nivel === 2 && puntajeNivel2) {
                  verde = true;
                  puntaje = puntajeNivel2;
                }
                if (nivel === 3 && puntajeNivel3) {
                  verde = true;
                  puntaje = puntajeNivel3;
                }
                return (
                  <button
                    key={nivel}
                    onClick={() => seleccionarNivel(nivel)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg font-semibold transition
                      ${nivelSeleccionado === nivel
                        ? "bg-blue-500 text-white"
                        : verde
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"}
                      ${nivel > nivelMaximo ? "cursor-not-allowed opacity-60" : ""}`}
                  >
                    Nivel {nivel}
                    {/* {verde && (
                      <span className="ml-2 text-xs font-bold">
                        Puntaje: {puntaje}
                      </span>
                    )} */}
                    {nivel > nivelMaximo && (
                      <Lock className="w-4 h-4 ml-2 text-gray-500" />
                    )}
                  </button>
                );
              })}
            </aside>

            {/* Columna derecha: contenido */}
            <main className="flex-1 p-10 text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 uppercase">
                Civi Quiz
              </h1>
              <p className="mt-2 text-gray-600">
                {nivelSeleccionado
                  ? `Woow! ${usuario?.nombre || "—"} vas volando, me gusta tu actitud.. Sigue así.`
                  : `Woow.. quien diria que llegarías tan lejos ${
                      usuario?.nombre || "—"
                    }, si que eres una persona brillante, animo que ya falta poco.`}
              </p>

              {/* Botón jugar (solo si hay nivel seleccionado) */}
              {nivelSeleccionado && (
                <div id="start-screen" className="mt-6">
                  <button
                    onClick={() => navigate(`/juego/nivel${nivelSeleccionado}`)}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-500 transition uppercase font-semibold"
                  >
                    Iniciar Partida
                  </button>
                </div>
              )}
            </main>
          </div>
          <div className="">
            <div className="flex space-x-5 ml-5 pb-2">
              <span className="text-sm text-gray-400">
                Tiempo global:{" "}
                <span className="ml-1 text-sm">
                  {formatoTiempo(tiempoGlobal)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}