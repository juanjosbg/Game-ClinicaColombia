import { useEffect, useState } from "react";

function formatoTiempo(segundos: number) {
  const hrs = String(Math.floor(segundos / 3600)).padStart(2, "0");
  const mins = String(Math.floor((segundos % 3600) / 60)).padStart(2, "0");
  const secs = String(segundos % 60).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
}

export default function Inf() {
  const [usuario, setUsuario] = useState<{
    nombre: string;
    area: string;
  } | null>(null);
  const [tiempoNivel1, setTiempoNivel1] = useState<number>(0);
  const [tiempoNivel2, setTiempoNivel2] = useState<number>(0);
  const [tiempoNivel3, setTiempoNivel3] = useState<number>(0);
  const [tiempoGlobal, setTiempoGlobal] = useState<number>(0);

  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (data) setUsuario(JSON.parse(data));

    setTiempoNivel1(Number(localStorage.getItem("tiempoNivel1") || "0"));
    setTiempoNivel2(Number(localStorage.getItem("tiempoNivel2") || "0"));
    setTiempoNivel3(Number(localStorage.getItem("tiempoNivel3") || "0"));
  }, []);

  useEffect(() => {
    setTiempoGlobal(tiempoNivel1 + tiempoNivel2 + tiempoNivel3);
  }, [tiempoNivel1, tiempoNivel2, tiempoNivel3]);

  return (
    <div className="bg-wp h-dvh relative flex items-center justify-center">
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
      <form className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Resumen de tu juego
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Nombre completo:
          </label>
          <input
            type="text"
            value={usuario?.nombre || ""}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Área:
          </label>
          <input
            type="text"
            value={usuario?.area || ""}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Tiempo Nivel 1:
          </label>
          <input
            type="text"
            value={formatoTiempo(tiempoNivel1)}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Tiempo Nivel 2:
          </label>
          <input
            type="text"
            value={formatoTiempo(tiempoNivel2)}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Tiempo Nivel 3:
          </label>
          <input
            type="text"
            value={formatoTiempo(tiempoNivel3)}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-1">
            Tiempo total:
          </label>
          <input
            type="text"
            value={formatoTiempo(tiempoGlobal)}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm/6 font-semibold text-white">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Enviar 
          </button>
        </div>
      </form>
    </div>
  );
}
