"use client";
import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [usuario, setUsuario] = useState<{ nombre: string; area: string } | null>(null);
  const [nivelMaximo, setNivelMaximo] = useState(1);
  const [nivelSeleccionado, setNivelSeleccionado] = useState<number | null>(null);

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
  }, []);

  const seleccionarNivel = (nivel: number) => {
    if (nivel > nivelMaximo) {
      alert("⚠️ Primero pasa por el nivel anterior");
      return;
    }
    setNivelSeleccionado(nivel);
  };

  return (
    <div className="bg-wp h-dvh relative">
      <div className="area absolute inset-0 -z-10">
        <ul className="circles">
          <li></li><li></li><li></li><li></li><li></li>
          <li></li><li></li><li></li><li></li><li></li>
        </ul>
      </div>

      {/* Contenedor principal */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl mt-20 bg-white rounded-xl shadow-lg">
          
          {/* Header */}
          <nav className="flex items-center justify-between p-6 mb-10 px-10">
            <div className="text-lg font-bold text-gray-900">Clinica Colombia</div>
            <div className="flex space-x-8">
              <span className="text-sm font-semibold text-gray-900 uppercase">
                Nombre:{" "}
                <span className="ml-1 font-medium lowercase">{usuario?.nombre || "—"}</span>
              </span>
              <span className="text-sm font-semibold text-gray-900 uppercase">
                Área empleado:{" "}
                <span className="ml-1 font-medium lowercase">{usuario?.area || "—"}</span>
              </span>
            </div>
          </nav>

          {/* Contenido */}
          <div className="flex pb-22">
            <aside className="w-50 border-r border-gray-200 p-6 flex flex-col gap-4">
              {[1, 2, 3].map((nivel) => (
                <button
                  key={nivel}
                  onClick={() => seleccionarNivel(nivel)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg font-semibold transition ${
                    nivelSeleccionado === nivel
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  } ${nivel > nivelMaximo ? "cursor-not-allowed opacity-60" : ""}`}
                >
                  Nivel {nivel}
                  {nivel > nivelMaximo && (
                    <Lock className="w-4 h-4 ml-2 text-gray-500" />
                  )}
                </button>
              ))}
            </aside>

            {/* Columna derecha: contenido */}
            <main className="flex-1 p-10 text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 uppercase">
                CiviQuiz
              </h1>
              <p className="mt-2 text-gray-600">
                {nivelSeleccionado
                  ? `Has seleccionado el Nivel ${nivelSeleccionado}`
                  : `${usuario?.nombre || "—"}, selecciona un nivel para comenzar`}
              </p>

              {/* Botón jugar (solo si hay nivel seleccionado) */}
              {nivelSeleccionado && (
                <div id="start-screen" className="mt-6">
                  <button
                    onClick={() => navigate("/juego")}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-500 transition"
                  >
                    Iniciar Partida
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
